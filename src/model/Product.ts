import { DocumentData, QueryDocumentSnapshot, SnapshotOptions, collection,  getDocs, orderBy, query } from "firebase/firestore";
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

const ProductConverter = {
    toFirestore : (product : Product) : DocumentData=>{
        return{
            name : product.name,
            imageUrl : product.imageUrl,
            price : product.price
        }
    },
    fromFirestore: (snapshot : QueryDocumentSnapshot, options : SnapshotOptions): Product =>{
        const data = snapshot.data(options)
        return new Product(snapshot.id, data.name, data.imageUrl, data.price)
    }
}

export async function GetAllProductFromTenants(tenantId : string){
    const q = query(collection(db, "tenants", tenantId, "products"), orderBy("price"))
    const documents = await getDocs(q.withConverter(ProductConverter))
    return documents.docs.map(doc=>doc.data())
}