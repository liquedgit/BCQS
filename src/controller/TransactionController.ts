import { toastError } from "../lib/config/toast"

export async function CreateTransactionController(tenantId: string, quantities : {[productId : string] : number}){
    for (const [productId, quantity] of Object.entries(quantities)) {
        if (quantity < 0) {
            toastError("All order must be greater or equals to 0")
            return;
        }
    }


    // return await CreateTransaction()

}