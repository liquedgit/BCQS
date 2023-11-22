import { DocumentData, QueryDocumentSnapshot, SnapshotOptions, collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../lib/config/firebase";

export class Tenant{
    name : string;
    imageUrl : string | undefined;
    id : string;
    constructor(id : string, name : string, imageUrl : string | undefined){
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
    }
    

}
const TenantConverter = {
    toFirestore: (tenant : Tenant) : DocumentData => {
        return {
            name: tenant.name,
            imageUrl: tenant.imageUrl
        };
    },
    fromFirestore: (snapshot : QueryDocumentSnapshot, options : SnapshotOptions) : Tenant => {
        const data = snapshot.data(options);
        return new Tenant(snapshot.id, data.name, data.imageUrl);
    }
}

export async function GetAllTenants(){
    const q = query(collection(db, "tenants"), orderBy("name"))
    const documents = await getDocs(q.withConverter(TenantConverter))
    return documents.docs.map(doc=>doc.data())
}