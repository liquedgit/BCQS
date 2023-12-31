import { DocumentData, QueryDocumentSnapshot, SnapshotOptions, addDoc, collection,  deleteDoc,  doc,  getDoc,  getDocs, orderBy, query, setDoc } from "firebase/firestore";
import { db } from "../lib/config/firebase";

export class Product{
    id : string;
    name : string;
    imageUrl : string | undefined;
    price :number;

    constructor(id : string, name : string, imageUrl : string | undefined, price : number){
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl
        this.price = price;
    }
}

export const ProductConverter = {
    toFirestore : (product : Product) : DocumentData=>{
        if(product.imageUrl){
            return{
                name : product.name,
                imageUrl : product.imageUrl,
                price : product.price
            }
        }
        return{
            name : product.name,
            price : product.price
        }
        
    },
    fromFirestore: (snapshot : QueryDocumentSnapshot, options : SnapshotOptions): Product =>{
        const data = snapshot.data(options)
        return new Product(snapshot.id, data.name, data.imageUrl, data.price)
    }
}

export async function GetAllProductFromTenants(tenantId : string){

    const tenantRef = doc(db, "tenants", tenantId)
    const tenantDoc = await getDoc(tenantRef)
    if(!tenantDoc.exists()){
        return null;
    }
    const q = query(collection(tenantRef, "products"), orderBy("price"))
    const documents = await getDocs(q.withConverter(ProductConverter))

    return documents.docs.map(doc=>doc.data())
}

export async function DeleteProductFromTenants(product : Product, tenantId : string){
    try{
        await deleteDoc(doc(db, "tenants", tenantId, "products", product.id))
    }catch(e){
        return false;
    }

    return true
}

export async function UpdateProductFromTenants(product : Product, tenantId : string){
    try{
        await setDoc(doc(db,"tenants", tenantId, "products", product.id).withConverter(ProductConverter), product)
    }catch(e){
        return false
    }
    return true
}

export async function AddProductFromTenants(product : Product, tenantId : string){
    try{
        await addDoc(collection(db, "tenants", tenantId, "products").withConverter(ProductConverter), product)
    }catch(e){
        console.error(e)
        return false
    }
    return true
}