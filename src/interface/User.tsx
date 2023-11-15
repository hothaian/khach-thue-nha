import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";

export interface User {
  id: string;
  roomNumber: number;
  userName: string;
  phoneNumber: number;
  idNumber: number;
  birthdate: Timestamp;
  birthplace: string;
  houseName: string;
  idProvideDate: Timestamp;
}
