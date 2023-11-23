import { DocumentData, QueryDocumentSnapshot, SnapshotOptions, addDoc, collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { Product, ProductConverter } from "./Product";
import { db } from "../lib/config/firebase";

export class Queue{
    id : string;
    userid : string;
    createdAt : Date;
    productQty : ProductQty[];
    tenantId : string;
    constructor(id : string, userid : string,createdAt : Date, productQty : ProductQty[], tenantId :string ){
        this.id = id
        this.userid = userid
        this.createdAt = createdAt
        this.productQty = productQty
        this.tenantId = tenantId
    }
}

export class ProductQty{
    product : Product;
    qty : number
    constructor(product : Product, qty: number){
        this.product = product
        this.qty = qty
    }
}

const ProductQtyConverter = {
    toFirestore : (productQty : ProductQty) : DocumentData=>{
        const product = ProductConverter.toFirestore(productQty.product)
        return{
            productId : productQty.product.id,
            qty : productQty.qty,
            ...product
        }
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): ProductQty => {
        const data = snapshot.data(options);

        const productData = data.productData;
        const product = new Product(data.productId, productData.name, productData.imageUrl, productData.price);

        return new ProductQty(product, data.qty);
    }
}

const QueueConverter ={
    toFirestore : (queue : Queue)=>{
        const product = queue.productQty.map((product)=>ProductQtyConverter.toFirestore(product))
        console.log(product)
        
        return{
            userid: queue.userid,
            createdAt : queue.createdAt,
            tenantId : queue.tenantId,
            order : product
        }
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot, options : SnapshotOptions) : Queue=>{

        const data = snapshot.data(options);
        const createdAtDate = data.createdAt.toDate();
        console.log(data)
        const productQtyArray = data.order.map((orderData : any) => {
            const product = new Product(orderData.productId, orderData.name, orderData.imageUrl, orderData.price);
            return new ProductQty(product, orderData.qty);
        });

        return new Queue(snapshot.id, data.userid, createdAtDate, productQtyArray, data.tenantId);
    }
}

export function GetUserQueueRealtime(userId : string, callback : (queue: Queue[])=>void){
    const queueRef = collection(db, "queues")
    const q = query(queueRef, where("userid", "==", userId), orderBy("createdAt"))

    const unsub = onSnapshot(q.withConverter(QueueConverter), (querySnapshot)=>{
        const queue = querySnapshot.docs.map(doc=>doc.data())
        callback(queue)
    })

    return unsub
}

export async function CreateUserQueue(tenantId : string, customerId : string,  qtyProducts : ProductQty[] ){
    const queue = new Queue("", customerId, new Date(), qtyProducts, tenantId )
    const serializedQueue = QueueConverter.toFirestore(queue)
    await addDoc(collection(db, "queues"),serializedQueue)
    
}

export async function GetTenantsQueue(tenantId : string){

}