import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../lib/config/firebase";

export async function UploadImage(file : any){
    const productImageRef = ref(storage, `products/${Date.now()}`)
    await uploadBytes(productImageRef, file)
    const URL = await getDownloadURL(productImageRef)
    return URL
}