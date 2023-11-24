import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../hooks/AuthContext";
import { GetAllProductFromTenants, Product } from "../model/Product";
import ProductCard from "./Components/ProductCard";

export default function TenantHomePage() {

    const [products, setProducts] = useState<Product[] | null>([]);
    const { user } = useAuth();


    useEffect(() => {
        const GetProducts = async () => {
            const userId = user?.uid
            const products = await GetAllProductFromTenants(userId!);
            setProducts(products);
        };

        GetProducts();
    }, []);


    return (
        <>
            <div className="p-10">
                <div className="bg-stone-950 rounded-3xl p-8 flex flex-row items-center justify-between">
                    <h1 className="text-2xl font-semibold text-white">
                        Start Addding Your Products
                    </h1>
                    <Link to={"/products"}>
                        <div className="p-4 bg-stone-700 rounded-xl">
                            <FaArrowRight className="text-white w-7 h-7" />
                        </div>
                    </Link>

                </div>
                <h1 className="text-2xl font-semibold py-6">
                    Your Products
                </h1>

                <div className="grid s:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10 py-6">
                    {products &&
                        products.length > 0 &&
                        products.map((product) => {
                            return (
                                <>
                                    <ProductCard
                                        product={product}
                                        updateQuantity={() => { }}
                                    />
                                </>
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
                </div>
            </div>
        </>
    );
}
