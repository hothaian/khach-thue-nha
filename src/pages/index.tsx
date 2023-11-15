import React, { useEffect, useState } from "react";
import { List, Page, Icon, useNavigate, Text, Box } from "zmp-ui";
import { useRecoilValue } from "recoil";
import { userState } from "../state";

import UserCard from "../components/user-card";
import UserInfo from "../components/user-info";
import { User } from "../interface/User";
import { firestore } from "../firebase";
import { query, collection, orderBy, onSnapshot } from "@firebase/firestore";

const HomePage: React.FunctionComponent = () => {
  const [users, setUsers] = useState<User[]>([]);
  const usersCollection = collection(firestore, "user-info");
  const { Item } = List;
  

  useEffect(() => {
    // Retrieve data from Firestore and listen for updates
    const q = query(usersCollection, orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const userData: User[] = [];
      querySnapshot.forEach((doc) => {
        userData.push({
          id: doc.id,
          idNumber: doc.data().idNumber,
          phoneNumber: doc.data().phoneNumber,
          roomNumber: doc.data().roomNumber,
          userName: doc.data().userName,
          birthdate: doc.data().birthdate,
          birthplace: doc.data().birthplace,
          houseName: doc.data().houseName,
          idProvideDate: doc.data().idProvideDate,
        });
      });
      setUsers(userData);
    });
    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const user = useRecoilValue(userState);
  const navigate = useNavigate();
  return (
    <Page className="page">
      <div className="section-container">
        <List>
          <List.Item
            onClick={() => navigate("/form")}
            suffix={<Icon icon="zi-arrow-right" />}
          >
            <div>Add User</div>

          </List.Item>
        </List>
      </div>

      <div className="section-container">
        <UserCard user={user.userInfo} />
      </div>


      <div className="section-container">
      <Text.Title size="large">User List</Text.Title>

        {users.map((user) => (
          <List divider={true}>
            <Item
              prefix={<Icon icon="zi-user" />}
              suffix={<Icon icon="zi-chevron-right" />}
            >
              <UserInfo key={user.id} user={user} />
            </Item>
          </List>
        ))}
      </div>
    </Page>
  );
};

export default HomePage;
