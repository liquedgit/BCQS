import { STATUS_FINISHED } from "../lib/config/constant";
import { db } from "../lib/config/firebase";
import { toastError } from "../lib/config/toast";
import { GetAllProductFromTenants } from "../model/Product";
import { CreateUserQueue, ProductQty } from "../model/Queue";
import { doc, setDoc } from "firebase/firestore";


export async function CreateQueueController(tenantId : string, customerId : string, quantities : {[productId : string] : number}){

    const productQty : ProductQty[] = []
    const products = await GetAllProductFromTenants(tenantId)

    if(products != null){
        for (const [productId, quantity] of Object.entries(quantities)) {
            if (quantity < 0) {
                toastError("All order must be greater or equals to 0")
                return;
            }
            const productExists = products.some(product => product.id === productId);

            if( productExists && quantity > 0 ){
                const product = products.find(product=>product.id === productId)
                productQty.push(new ProductQty(product!, quantity))   
            }
        }

        if(productQty.length > 0){
            await CreateUserQueue(tenantId, customerId, productQty)
            return true;
        }
    }else{
        toastError("Error has occured")
        return;
    }
    
}

export async function UpdateQueueStatus(queueId : string) {
    try {
        await setDoc(doc(db, "queues", queueId), {
            status: STATUS_FINISHED
        }, { merge: true });

        return true; // Success
    } catch (error) {
        console.error("Error updating document: ", error);
        return false; // Failure
    }
    
}