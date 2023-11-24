import { toastError, toastSuccess } from "../lib/config/toast";
import { AuthLogin, AuthRegister } from "../model/Auth";

export async function AuthLoginController(email : string, password : string){
    if(email != "" && password != "" && email.endsWith("@gmail.com")){
        return await AuthLogin(email, password);
    }

    return null;
}

export async function AuthRegisterController(email : string, password : string, confirmPassword : string){
    if(email == "" && password == "" && confirmPassword == ""){
        toastError("All fields must be filled !");
        return null
    }else if(email.endsWith("@gmail.com")){
        toastError("Email must ends with '@gmail.com'");
        return null;
    }else if(password != confirmPassword){
        toastError("Password and confirm password must be the same !");
        return null;
    }

    const userCreds = await AuthRegister(email, password);
    if(userCreds == null){
        toastError("Error while creating an account !");
    }else{
        toastSuccess("Succesfully registered user !");
    }
    return userCreds;
}