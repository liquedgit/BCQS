import { DocumentData, QueryDocumentSnapshot, SnapshotOptions, addDoc, collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { Product, ProductConverter } from "./Product";
import { db } from "../lib/config/firebase";

export class Queue{
    id : string;
    userid : string;
    createdAt : Date;
    productQty : ProductQty[];
    tenantId : string;
    status : string;
    constructor(id : string, userid : string,createdAt : Date, productQty : ProductQty[], tenantId :string , status : string){
        this.id = id
        this.userid = userid
        this.createdAt = createdAt
        this.productQty = productQty
        this.tenantId = tenantId
        this.status = status
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
        
        return{
            userid: queue.userid,
            createdAt : queue.createdAt,
            tenantId : queue.tenantId,
            order : product,
            status : queue.status
        }
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot, options : SnapshotOptions) : Queue=>{

        const data = snapshot.data(options);
        const createdAtDate = data.createdAt.toDate();
        const productQtyArray = data.order.map((orderData : any) => {
            const product = new Product(orderData.productId, orderData.name, orderData.imageUrl, orderData.price);
            return new ProductQty(product, orderData.qty);
        });

        return new Queue(snapshot.id, data.userid, createdAtDate, productQtyArray, data.tenantId, data.status);
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

export async function CreateUserQueue(tenantId : string, customerId : string,  qtyProducts : ProductQty[], status = "Pending" ){
    const queue = new Queue("", customerId, new Date(), qtyProducts, tenantId, status )
    const serializedQueue = QueueConverter.toFirestore(queue)
    await addDoc(collection(db, "queues"),serializedQueue)
    
}


export function GetTenantsQueueRealtime(tenantId : string, callback : (queue: Queue[])=>void ){
    const queueRef = collection(db, "queues")
    const q = query(queueRef, where("tenantId", "==", tenantId), orderBy("createdAt"))

    const unsub = onSnapshot(q.withConverter(QueueConverter), (querySnapshot)=>{
        const queue = querySnapshot.docs.map(doc=>doc.data())
        callback(queue)
    })

    return unsub
}