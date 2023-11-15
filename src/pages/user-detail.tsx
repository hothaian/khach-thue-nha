// // UserDetail.js

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { collection, doc, getDoc } from "firebase/firestore";
// import { firestore } from "../firebase";
// import User from "../interface/User";
// const UserDetail = () => {
//   const { userId } = useParams();
//   const [user, setUser] = useState(new UserDetail()); // Provide an initial value of null

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const userRef = doc(collection(firestore, "user-info"), userId);
//         const userDoc = await getDoc(userRef);

//         if (userDoc.exists()) {
//           setUser(userDoc.data());
//         } else {
//           console.log("User not found");
//         }
//       } catch (error) {
//         console.error("Error fetching user data", error);
//       }
//     };

//     fetchUserData();
//   }, [userId]);

//   if (user === null) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h2>User Details</h2>
//       <p>Name: {user.name}</p>
//       <p>Email: {user.email}</p>
//       {/* Display other user details */}
//     </div>
//   );
// };

// export default UserDetail;
