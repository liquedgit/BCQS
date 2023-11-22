import React from "react";
import Navbar from "./Components/NavbarComponent";

export default function HomePage() {
  // Example tenant data array
  const tenantData = [
    {
      id: 1,
      name: "Tenant 1",
      imageSrc: "/src/assets/Tenant1.jpg",
    },
    {
      id: 2,
      name: "Tenant 2",
      imageSrc: "/src/assets/Tenant1.jpg",
    },
    {
      id: 3,
      name: "Tenant 3",
      imageSrc: "/src/assets/Tenant1.jpg",
    },
    {
      id: 4,
      name: "Tenant 4",
      imageSrc: "/src/assets/Tenant1.jpg",
    },
    {
      id: 5,
      name: "Tenant 5",
      imageSrc: "/src/assets/Tenant1.jpg",
    },
    {
      id: 6,
      name: "Tenant 6",
      imageSrc: "/src/assets/Tenant1.jpg",
    },
  ];

  return (
    <>
      <div className="h-min-screen">
        <Navbar />
        <hr className="h-px my-1 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        <h1 className="main-title mx-7 my-5 text-3xl">Tenant List</h1>
      </div>
      <div className="list-cont mx-2 sm:mx-4 md:mx-6 lg:mx-8 xl:mx-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-12">
        {tenantData.map((tenant) => (
          <a
            key={tenant.id}
            href="#"
            className="max-w-sm w-full rounded overflow-hidden shadow-lg bg-white hover:bg-gray-100"
          >
            <img
              className="w-full h-40 object-cover"
              src={tenant.imageSrc}
              alt={`Image for ${tenant.name}`}
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2 text-center">
                {tenant.name}
              </div>
            </div>
          </a>
        ))}
      </div>
    </>
  );
}
