import { collection, doc, getDoc, setDoc } from "firebase/firestore"
import { auth, db } from "../lib/config/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { USER_ROLE } from "../lib/config/constant";

const userCollection = collection(db, "users");

export interface UserDBO{

}

export const GetUserRole = async(uid : string)=>{
    const userData = await getDoc(doc(userCollection, uid))
    return userData
}

export async function AuthLogin(email : string, password : string){
    try{
        const user = await signInWithEmailAndPassword(auth, email,password)
        return user;
        
    }catch(e){
        return null;
    }

}

export async function AuthRegister(email : string, password : string){
    try{
        const newUser = await createUserWithEmailAndPassword(auth, email,password);
        console.log(newUser);
        
        await setDoc(doc(userCollection, newUser.user.uid), {
            role: USER_ROLE  
        });
        await signOut(auth)
        return newUser
    }catch(e){
        console.log(e);
        
        return null;
    }
}