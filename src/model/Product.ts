import { DocumentData, QueryDocumentSnapshot, SnapshotOptions, collection,  doc,  getDoc,  getDocs, orderBy, query } from "firebase/firestore";
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

