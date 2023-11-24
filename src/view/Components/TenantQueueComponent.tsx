import { Queue } from "../../model/Queue";
import { useEffect, useState } from "react";
import { GetTenantById, Tenant } from "../../model/Tenant";
import { STATUS_FINISHED, STATUS_PENDING } from "../../lib/config/constant";

export default function TenantQueueComponent({
    queue,
    i,
}: {
    queue: Queue;
    i: number;
}) {

    const [tenant, setTenant] = useState<Tenant>();

    useEffect(() => {
        const fetchTenantById = async () => {
            const document = await GetTenantById(queue.tenantId);
            if (document) {
                setTenant(document);
            }
        };

        fetchTenantById();
    }, []);

    const finishOrderHandler = async () => {
        //TODO Update queue status to finished

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

                        <button className="ml-auto btn btn-neutral" onClick={
                            finishOrderHandler
                        }>
                            Finish Order
                        </button>

                    </div>
                </div>

                {queue.productQty.map((item, j) => {
                    return <p key={j}>{item.product.name} [{item.qty}x] </p>
                })}

            </div>
        </>
    );
}
