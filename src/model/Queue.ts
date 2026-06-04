import { localDB } from "../lib/store/db";
import { Product } from "./Product";

export class ProductQty {
  product: Product;
  qty: number;

  constructor(product: Product, qty: number) {
    this.product = product;
    this.qty = qty;
  }
}

export class Queue {
  id: string;
  userid: string;
  createdAt: Date;
  productQty: ProductQty[];
  tenantId: string;
  status: string;

  constructor(id: string, userid: string, createdAt: Date, productQty: ProductQty[], tenantId: string, status: string) {
    this.id = id;
    this.userid = userid;
    this.createdAt = createdAt;
    this.productQty = productQty;
    this.tenantId = tenantId;
    this.status = status;
  }
}

function toQueue(dbQueue: (typeof localDB.queues)[0]): Queue {
  const productQty = dbQueue.order.map(
    (item) => new ProductQty(new Product(item.productId, item.name, item.imageUrl, item.price), item.qty)
  );
  return new Queue(dbQueue.id, dbQueue.userid, new Date(dbQueue.createdAt), productQty, dbQueue.tenantId, dbQueue.status);
}

export function GetUserQueueRealtime(userId: string, callback: (queue: Queue[]) => void): () => void {
  return localDB.subscribeUserQueue(userId, (dbQueues) => callback(dbQueues.map(toQueue)));
}

export function GetTenantsQueueRealtime(tenantId: string, callback: (queue: Queue[]) => void): () => void {
  return localDB.subscribeTenantQueue(tenantId, (dbQueues) => callback(dbQueues.map(toQueue)));
}

export async function CreateUserQueue(tenantId: string, customerId: string, qtyProducts: ProductQty[], status = "Pending"): Promise<void> {
  const order = qtyProducts.map((pq) => ({
    productId: pq.product.id,
    name: pq.product.name,
    imageUrl: pq.product.imageUrl,
    price: pq.product.price,
    qty: pq.qty,
  }));

  localDB.queues.push({
    id: localDB.generateId(),
    userid: customerId,
    tenantId,
    order,
    status,
    createdAt: new Date().toISOString(),
  });

  localDB.saveQueues();
}
