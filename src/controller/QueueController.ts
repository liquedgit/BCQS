import { STATUS_FINISHED } from "../lib/config/constant";
import { localDB } from "../lib/store/db";
import { toastError } from "../lib/config/toast";
import { GetAllProductFromTenants } from "../model/Product";
import { CreateUserQueue, ProductQty } from "../model/Queue";

export async function CreateQueueController(tenantId: string, customerId: string, quantities: { [productId: string]: number }) {
  const productQty: ProductQty[] = [];
  const products = await GetAllProductFromTenants(tenantId);

  if (products != null) {
    for (const [productId, quantity] of Object.entries(quantities)) {
      if (quantity < 0) {
        toastError("All order must be greater or equals to 0");
        return;
      }
      const product = products.find((p) => p.id === productId);
      if (product && quantity > 0) {
        productQty.push(new ProductQty(product, quantity));
      }
    }

    if (productQty.length > 0) {
      await CreateUserQueue(tenantId, customerId, productQty);
      return true;
    }
  } else {
    toastError("Error has occured");
  }
}

export async function UpdateQueueStatus(queueId: string): Promise<boolean> {
  const queue = localDB.queues.find((q) => q.id === queueId);
  if (!queue) return false;
  queue.status = STATUS_FINISHED;
  localDB.saveQueues();
  return true;
}
