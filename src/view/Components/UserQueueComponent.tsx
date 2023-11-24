import { Queue } from "../../model/Queue";
import { useEffect, useState } from "react";
import { GetTenantById, Tenant } from "../../model/Tenant";
import { STATUS_FINISHED, STATUS_PENDING } from "../../lib/config/constant";

export default function UserQueueComponent({
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

    console.log(queue);

    fetchTenantById();
  }, []);

  return (
    <>
      <div className="collapse collapse-plus bg-base-200">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title text-xl font-medium">
          <div className="flex items-center">
            <h2 className="flex items-center gap-2">
              {tenant?.name}
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

            </h2>
            <p className="ml-auto">Queue #{i}</p>
          </div>
        </div>
        <div className="collapse-content">
          {queue.productQty.map((item, j) => {
            return <p key={j}>{item.product.name} [{item.qty}x] </p>
          })}
        </div>
      </div>
    </>
  );
}
