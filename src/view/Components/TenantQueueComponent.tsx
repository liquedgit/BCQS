import { Queue } from "../../model/Queue";
import { STATUS_FINISHED, STATUS_PENDING } from "../../lib/config/constant";
import { UpdateQueueStatus } from "../../controller/QueueController";
import { toastError, toastSuccess } from "../../lib/config/toast";

export default function TenantQueueComponent({
    queue,
    i,
}: {
    queue: Queue;
    i: number;
}) {

    const finishOrderHandler = async (queueId: string) => {
        try {
            const isSuccess = await UpdateQueueStatus(queueId);

            if (isSuccess) {
                toastSuccess("Order finished");
            } else {
                toastError("Failed to finish order");
            }
        } catch (error) {
            console.error("An error occurred:", error);
            alert("An error occurred while updating the order status.");
        }
    }


    return (
        <>
            <div className="bg-base-200 p-10 rounded-xl">
                <div className="text-xl font-medium">
                    <div className="flex items-center gap-2">
                        <p className="">Order #{i}</p>
                        {queue.status == STATUS_FINISHED &&
                            <span
                                className="badge badge-success"
                            >Finished</span>
                        }
                        {queue.status == STATUS_PENDING &&
                            <span
                                className="badge badge-warning"
                            >Pending</span>
                        }

                        {queue.status == STATUS_FINISHED &&
                            <button className="ml-auto btn btn-neutral btn-disabled">
                                Finish Order
                            </button>
                        }

                        {queue.status == STATUS_PENDING &&
                            <button className="ml-auto btn btn-neutral " onClick={() => { finishOrderHandler(queue.id) }}>
                                Finish Order
                            </button>
                        }


                    </div>
                </div>

                {queue.productQty.map((item, j) => {
                    return <p key={j}>{item.product.name} [{item.qty}x] </p>
                })}

            </div >
        </>
    );
}
