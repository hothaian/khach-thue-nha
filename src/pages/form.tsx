import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  Box,
  Page,
  useSnackbar,
  Text,
  Select,
  DatePicker,
} from "zmp-ui";
import { useRecoilState } from "recoil";
import { displayNameState, displayPhoneState } from "../state";
import { useNavigate } from "react-router";
import { firestore } from "../firebase";
import { User } from "../interface/User";

import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";

const usersCollection = collection(firestore, "user-info"); // Replace "users" with your collection name
const { OtpGroup, Option } = Select;

const FormPage: React.FunctionComponent = () => {
  const { OtpGroup, Option } = Select;
  const snackbar = useSnackbar();
  const navigate = useNavigate();
  const [roomNumber, setRoomNumber] = useState<number>(0);
  const [phoneNumber, setPhoneNumber] = useRecoilState(displayPhoneState);
  const [idNumber, setIdNumber] = useState<number>(0);
  const [userName, setUserName] = useState<string>("");
  const [birthdate, setBirthdate] = useState(new Date());
  const [birthplace, setBirthplace] = useState<string>("");
  const [houseName, setHouseName] = useState<string>("Binh An 1");
  const [users, setUsers] = useState<User[]>([]);
  const [formValid, setFormValid] = useState(true); // Track form validation status
  const [idProvideDate, setIdProvideDate] = useState(new Date()); //Ngay Cap CMND
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

  const handleRoomNumberChange = (event) => {
    setRoomNumber(event.target.value);
  };

  const handleIdNumberChange = (event) => {
    setIdNumber(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleBirthdateChange = (event) => {
    setBirthdate(event.target.value);
  };

  const handleBirthplaceChange = (event) => {
    setBirthplace(event.target.value);
  };

  const handleHouseNameChange = (event) => {
    // setHouseName(event.target.value);
  };

  const handleIdProvideNumber = (event) => {
    setIdProvideDate(event.target.value);
  };

  const validateForm = () => {
    // Check if both phone and idNumber fields are filled
    const isFormValid = phoneNumber !== null && idNumber !== null;
    setFormValid(isFormValid);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formValid) {
      try {
        const docRef = await addDoc(usersCollection, {
          roomNumber: roomNumber,
          idNumber: idNumber,
          phoneNumber: phoneNumber,
          userName: userName,
          birthdate: birthdate,
          birthplace: birthplace,
          nameOption: houseName,
          idProvideDate: idProvideDate,
          timestamp: new Date(),
        });
        console.log("Document written with ID: ", docRef.id);

        // Clear the input fields after submission
        setRoomNumber(0);
        setPhoneNumber(0);
        setIdNumber(0);
        setUserName("Name");
        setBirthdate(new Date());
        setBirthplace("");
        setHouseName("");
        setIdProvideDate(new Date());

        snackbar.openSnackbar({
          duration: 3000,
          text: "Display name updated!",
          type: "success",
        });
        navigate("/");
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    } else {
      alert("Còn Thiếu Thông Tin!");
    }
  };

  return (
    <Page className="page">
      <Text>Điền Thông Tin Cá Nhân</Text>
      <div className="section-container">
        <Box mt={2}>
          <Select
            label="Chọn Nhà Trọ"
            placeholder="Bình An 1"
            defaultValue={[]}
            onChange={handleHouseNameChange}
          >
            <Option value="ba1" title="Bình An 1" />
            <Option value="ba2" title="Bình An 2" />
          </Select>
          <Input
            label="Số Phòng:"
            type="number"
            placeholder="Số Phòng"
            defaultValue={0}
            onChange={handleRoomNumberChange}
          />

          <Input
            value={userName}
            type="text"
            label="Họ và tên"
            placeholder="Nguyễn Văn A"
            onChange={handleUserNameChange}
          />
          <Input
            value={phoneNumber}
            type="number"
            label="Số Điện Thoại"
            placeholder="123456789"
            onChange={handlePhoneNumberChange}
          />
          <DatePicker
            onChange={(e) => setBirthdate(new Date(e))}
            label="Ngày Sinh"
            placeholder="12/01/2000"
            mask
            maskClosable
            dateFormat="dd/mm/yyyy"
          />
        </Box>
      </div>
      <div className="section-container">
        <Box mt={2}>
          <Input
            value={idNumber}
            type="number"
            label="Số CMND"
            placeholder="123456789"
            onChange={handleIdNumberChange}
          />
          <DatePicker
            label="Ngày Cấp CMND"
            placeholder="31/12/2000"
            mask
            maskClosable
            dateFormat="dd/mm/yyyy"
          />

          <Input
            label="Nơi Cấp"
            type="text"
            placeholder="Hồ Chí Minh"
            value={birthplace}
            onChange={handleBirthplaceChange}
          />
        </Box>
      </div>
      <div>
        <Box mt={4}>
          <Button onClick={handleSubmit} type="highlight" fullWidth>
            Hoàn Tất
          </Button>
        </Box>
      </div>

      <div>
        <h2>Registered Users:</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <p>----------------------</p>
              <p>House: {user.houseName}</p>
              <p>Room Number: {user.roomNumber}</p>
              <p>User Name: {user.userName}</p>
              <p>Phone Number: {user.phoneNumber}</p>
              <p>Id Number: {user.idNumber}</p>
              <p>Birthplace: {user.birthplace}</p>
            </li>
          ))}
        </ul>
      </div>
    </Page>
  );
};

export default FormPage;
