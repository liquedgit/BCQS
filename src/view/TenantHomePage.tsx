import { FaArrowRight, FaPlus } from "react-icons/fa";
import { useState, useEffect, useRef, LegacyRef } from "react";
import { useAuth } from "../hooks/AuthContext";
import {
  AddProductFromTenants,
  GetAllProductFromTenants,
  Product,
} from "../model/Product";
import { HashLink as Link } from "react-router-hash-link";
import ProductCard from "./Components/ProductCard";
import { UploadImage } from "../model/Upload";
import { toastError, toastSuccess } from "../lib/config/toast";

export default function TenantHomePage() {
  const [products, setProducts] = useState<Product[] | null>([]);
  const { user } = useAuth();

  const GetProducts = async () => {
    const userId = user?.uid;
    const products = await GetAllProductFromTenants(userId!);
    setProducts(products);
  };

  useEffect(() => {
    GetProducts();
  }, []);

  const createModal: LegacyRef<HTMLDialogElement> | undefined = useRef(null);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productImage, setProductImage] = useState();

  const addProductHandler = async () => {
    //Todo add product

    if (productPrice <= 0) {
      toastError("Price cannot be less or equals to zero");
      return;
    }

    let url = undefined;
    if (productImage) {
      url = await UploadImage(productImage);
    }

    const res = await AddProductFromTenants(
      new Product("", productName, url, productPrice),
      user!.uid
    );
    if (res) {
      toastSuccess("Successfully added new products");
      GetProducts();
    } else {
      toastError("Error occured");
    }
  };

  return (
    <>
      <div className="p-10">
        <div className="bg-primary rounded-3xl p-5 flex flex-row items-center justify-between">
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
        <div className="flex justify-center">
          <div className="grid s:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 py-6">
            {products &&
              products.length > 0 &&
              products.map((product) => {
                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    updateQuantity={() => {}}
                    tenant={true}
                    refetch={GetProducts}
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
            <div className="w-full flex justify-center">
              <div
                className="card card-compact w-3/4 bg-neutral hover:scale-sm text-white shadow-2xl cursor-pointer min-h-20 transition duration-300 ease-in-out"
                id="addproduct"
                onClick={() => {
                  createModal.current!.showModal();
                }}
              >
                <div className="card-body items-center justify-center">
                  <FaPlus className="text-6xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <dialog ref={createModal} className="modal">
        <div className="modal-box w-11/12 max-w-2xl">
          <h3 className="font-bold text-lg">Create Products</h3>
          <div className="mt-6">
            <div className="flex items-center">
              <h2 className="w-20">Name :</h2>
              <input
                onChange={(e) => setProductName(e.target.value)}
                type="text"
                className="input input-bordered"
                value={productName}
              />
            </div>
            <div className="flex items-center mt-5">
              <h2 className="w-20">Price :</h2>
              <input
                onChange={(e) => setProductPrice(parseInt(e.target.value))}
                type="number"
                className="input input-bordered"
                value={productPrice}
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Product Image</span>
              </label>
              <input
                onChange={(e: any) => {
                  setProductImage(e.target.files[0]);
                }}
                type="file"
                className="file-input file-input-bordered w-full max-w-xs"
              />
            </div>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn btn-neutral text-white">Close</button>
              </form>
              <form method="dialog">
                <button
                  onClick={async () => await addProductHandler()}
                  className="btn btn-success text-white"
                >
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
