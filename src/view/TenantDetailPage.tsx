import { Navigate, useNavigate, useParams } from "react-router-dom";
import Navbar from "./Components/NavbarComponent";
import { useState, useEffect } from "react";
import { GetAllProductFromTenants, Product } from "../model/Product";
import ProductCard from "./Components/ProductCard";
import { toastError, toastSuccess } from "../lib/config/toast";
import { CreateQueueController } from "../controller/QueueController";
import { useAuth } from "../hooks/AuthContext";

export default function TenantDetailsPage() {
  const { id } = useParams();
  const [products, setProducts] = useState<Product[] | null>([]);
  const { user } = useAuth();
  const nav = useNavigate();

  const [quantities, setQuantities] = useState<{ [productId: string]: number }>(
    {}
  );

  const [totalPrice, setTotalPrice] = useState(0);

  const calculateTotalPrice = (
    products: Product[],
    quantities: { [productId: string]: number }
  ) => {
    return products.reduce((total, product) => {
      const quantity = quantities[product.id] || 0;
      return total + quantity * product.price;
    }, 0);
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    setQuantities((prevQuantities) => {
      const updatedQty = { ...prevQuantities, [productId]: newQuantity };
      if (products != null) {
        const newTotalPrice = calculateTotalPrice(products, updatedQty);
        setTotalPrice(newTotalPrice);
      }
      return updatedQty;
    });
  };

  useEffect(() => {
    const GetProducts = async () => {
      if (id) {
        const products = await GetAllProductFromTenants(id);
        setProducts(products);
      }
    };
    GetProducts();
  }, [id]);

  const checkoutBtnOnClick = async () => {
    const res = await CreateQueueController(id!, user!.uid, quantities);
    if (res) {
      toastSuccess("Successfully queued your order...");
      nav("/queue", { replace: true });
    }
  };

  if (!id || products == null) {
    toastError("Invalid tenant id");
    return <Navigate to={"/"} replace />;
  }

  return (
    <>
      <Navbar />
      <div className="p-10">
        <div className="flex">
          <h1 className="text-2xl font-semibold">Product List</h1>
          <div className="ml-auto flex items-center justify-between">
            <h2 className="text-xl mr-6">Total Price : Rp. {totalPrice}</h2>
            <button
              onClick={checkoutBtnOnClick}
              className="btn btn-error text-white"
            >
              Checkout
            </button>
          </div>
        </div>
        <div className="grid s:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10 py-6">
          {products &&
            products.length > 0 &&
            products.map((product) => {
              return (
                <>
                  <ProductCard
                    product={product}
                    updateQuantity={updateQuantity}
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
