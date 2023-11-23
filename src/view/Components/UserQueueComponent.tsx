import { Queue } from "../../model/Queue";
import { useEffect, useState } from "react";
import { GetTenantById, Tenant } from "../../model/Tenant";

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

    fetchTenantById();
  }, []);

  return (
    <>
      <div className="collapse collapse-plus bg-base-200">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title text-xl font-medium">
          <div className="flex">
            <h2>{tenant?.name}</h2>
            <p className="ml-auto">Queue #{i}</p>
          </div>
        </div>
        <div className="collapse-content">
          <p>hello</p>
        </div>
      </div>
    </>
  );
}
