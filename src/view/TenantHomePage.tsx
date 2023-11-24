import { FaArrowRight, FaPlus } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useAuth } from "../hooks/AuthContext";
import { GetAllProductFromTenants, Product } from "../model/Product";
import { HashLink as Link } from "react-router-hash-link";
import ProductCard from "./Components/ProductCard";

export default function TenantHomePage() {
  const [products, setProducts] = useState<Product[] | null>([]);
  const { user } = useAuth();

  useEffect(() => {
    const GetProducts = async () => {
      const userId = user?.uid;
      const products = await GetAllProductFromTenants(userId!);
      setProducts(products);
    };

    GetProducts();
  }, []);

  const addProductHandler = () => {
    //Todo add product
  };

  return (
    <>
      <div className="p-10 -z-40">
        <div className="bg-primary rounded-3xl p-8 flex flex-row items-center justify-between">
          <h1 className="text-2xl font-semibold text-white">
            Start Addding Your Products
          </h1>
          <Link to={"#addproduct"} smooth>
            <div className="p-4 rounded-xl">
              <FaArrowRight className="text-white w-7 h-7" />
            </div>
          </Link>
        </div>
        <h1 className="text-2xl font-semibold py-6">Your Products</h1>

        <div className="grid s:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10 py-6">
          {products &&
            products.length > 0 &&
            products.map((product) => {
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  updateQuantity={() => {}}
                  tenant={true}
                />
              );
            })}
          {products?.length == 0 && (
            <>
              <div className="flex justify-center items-center">
                <h1 className="text-xl font-medium">
                  There is nothing here...
                </h1>
              </div>
            </>
          )}
          <div
            className="card card-compact w-full bg-neutral shadow-xl hover:scale-sm text-white shadow-2xl cursor-pointer min-h-20 transition duration-300 ease-in-out"
            id="addproduct"
            onClick={addProductHandler}
          >
            <div className="card-body items-center justify-center">
              <FaPlus className="text-6xl" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
