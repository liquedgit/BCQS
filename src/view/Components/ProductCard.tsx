import { FaEdit, FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import {
  DeleteProductFromTenants,
  Product,
  UpdateProductFromTenants,
} from "../../model/Product";
import { useState, useEffect, useRef, LegacyRef } from "react";
import defaultImage from "../../assets/Tenant1.jpg";
import { useAuth } from "../../hooks/AuthContext";
import { toastError, toastSuccess } from "../../lib/config/toast";
import { UploadImage } from "../../model/Upload";

interface ComponentProps {
  product: Product;
  updateQuantity: (id: string, qty: number) => void;
  tenant?: boolean;
  refetch: () => Promise<void>;
}

export default function ({
  product,
  updateQuantity,
  tenant,
  refetch,
}: ComponentProps) {
  const [qty, setQty] = useState(0);
  const { user } = useAuth();
  useEffect(() => {
    updateQuantity(product.id, qty);
  }, [qty]);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const minusOnClick = () => {
    if (qty - 1 >= 0) {
      setQty(qty - 1);
    }
  };

  const plusOnClick = () => {
    setQty(qty + 1);
  };

  const updateModal: LegacyRef<HTMLDialogElement> | undefined = useRef(null);
  const deleteModal: LegacyRef<HTMLDialogElement> | undefined = useRef(null);

  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState(0);
  const [newImage, setNewImage] = useState<any>();

  const handleOnUpdate = async () => {
    let URL = selectedProduct?.imageUrl;
    if (newImage) {
      URL = await UploadImage(newImage);
    }
    const res = await UpdateProductFromTenants(
      new Product(selectedProduct!.id, newName, URL, newPrice),
      user!.uid
    );

    if (res) {
      toastSuccess("Successfully updated products");
      refetch();
    } else {
      toastError("Error occured");
    }
  };

  useEffect(() => {
    if (selectedProduct) {
      setNewName(selectedProduct.name);
      setNewPrice(selectedProduct.price);
    }
  }, [selectedProduct]);

  return (
    <>
      <div key={product.id} className="w-full flex justify-center">
        <div className="card card-compact w-3/4 h-full bg-neutral shadow-xl hover:scale-sm transition duration-300 ease-in-out">
          <figure className="w-full h-1/2">
            <img
              src={product.imageUrl ? product.imageUrl : defaultImage}
              className="w-full h-full object-cover"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-xl text-white">{product.name}</h2>
            <h2 className="text-lg text-white">IDR {product.price}</h2>
            {!!!tenant && (
              <>
                <div className="flex justify-center">
                  <button onClick={minusOnClick} className="btn btn-error">
                    <FaMinus />
                  </button>
                  <div className="flex justify-center items-center w-14 font-semibold text-xl text-white">
                    {qty}
                  </div>
                  <button onClick={plusOnClick} className="btn btn-success">
                    <FaPlus />
                  </button>
                </div>
              </>
            )}
            {tenant && (
              <>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => {
                      setSelectedProduct(product);
                      deleteModal.current?.showModal();
                    }}
                    className="btn"
                  >
                    <FaTrash />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedProduct(product);
                      updateModal.current?.showModal();
                    }}
                    className="btn btn-primary"
                  >
                    <FaEdit />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <dialog ref={updateModal} className="modal">
        <div className="modal-box w-11/12 max-w-2xl">
          <h3 className="font-bold text-lg">Update {selectedProduct?.name}</h3>
          <div className="mt-6">
            <div className="flex items-center">
              <h2 className="w-20">Name :</h2>
              <input
                onChange={(e) => setNewName(e.target.value)}
                type="text"
                className="input input-bordered"
                value={newName}
              />
            </div>
            <div className="flex items-center mt-5">
              <h2 className="w-20">Price :</h2>
              <input
                onChange={(e) => setNewPrice(parseInt(e.target.value))}
                type="number"
                className="input input-bordered"
                value={newPrice}
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Product Image</span>
              </label>
              <input
                onChange={(e: any) => {
                  setNewImage(e.target.files[0]);
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
                  onClick={async () => await handleOnUpdate()}
                  className="btn btn-success text-white"
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      <dialog ref={deleteModal} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{selectedProduct?.name}</h3>
          <p className="py-4">
            Are you sure you wanted to delete {selectedProduct?.name} ?
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-neutral text-white">Close</button>
            </form>
            <form method="dialog">
              <button
                onClick={async () => {
                  const res = await DeleteProductFromTenants(
                    selectedProduct!,
                    user?.uid!
                  );
                  if (res) {
                    toastSuccess(
                      `Succesfully deleted ${selectedProduct?.name} from your product list`
                    );
                    refetch();
                  } else {
                    toastError(`Error has occured !`);
                  }
                }}
                className="btn btn-error text-white"
              >
                Delete
              </button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
