import { collection, doc, getDoc } from "firebase/firestore"
import { db } from "../lib/config/firebase";

const userCollection = collection(db, "users");

export const GetUserRole = async(uid : string)=>{
    const userData = await getDoc(doc(userCollection, uid))
    return userData
}