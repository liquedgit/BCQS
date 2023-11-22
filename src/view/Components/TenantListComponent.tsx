import { useState, useEffect } from "react";
import { GetAllTenants, Tenant } from "../../model/Tenant";
import defaultImage from "../../assets/Tenant1.jpg";
import { Link } from "react-router-dom";
export default function TenantListComponent() {
  useEffect(() => {
    const getTenants = async () => {
      const tenants = await GetAllTenants();
      setTenants(tenants);
    };

    getTenants();
  }, []);

  const [tenants, setTenants] = useState<Tenant[] | null>(null);

  return (
    <>
      <div className="p-10">
        <h1 className="text-2xl font-semibold">Tenant List</h1>
        <div className="grid s:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-12 py-6">
          {tenants &&
            tenants.map((tenant) => {
              return (
                <>
                  <Link to={`/tenant/${tenant.id}`}>
                    <div
                      key={tenant.id}
                      className="card w-full bg-base-100 shadow-xl image-full"
                    >
                      <figure>
                        <img
                          src={
                            tenant.imageUrl === undefined
                              ? defaultImage
                              : tenant.imageUrl
                          }
                        />
                      </figure>
                      <div className="card-body flex justify-center items-center">
                        <h2 className="font-semibold text-3xl text-white">
                          {tenant.name}
                        </h2>
                      </div>
                    </div>
                  </Link>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
}
