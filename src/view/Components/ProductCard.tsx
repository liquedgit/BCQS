import { FaEdit, FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { Product } from "../../model/Product";
import { useState, useEffect } from "react";
import defaultImage from "../../assets/Tenant1.jpg";
import { useModal } from "../../hooks/useModal";

interface ComponentProps {
  product: Product;
  updateQuantity: (id: string, qty: number) => void;
  tenant?: boolean; // Add this line
}

export default function ({ product, updateQuantity, tenant }: ComponentProps) {
  const [qty, setQty] = useState(0);

  useEffect(() => {
    updateQuantity(product.id, qty);
  }, [qty]);

  const { showModal: deleteModal, toogleShowModal: toogleDeleteModal } =
    useModal();

  const { showModal: editModal, toogleShowModal: toogleEditModal } = useModal();

  const minusOnClick = () => {
    if (qty - 1 >= 0) {
      setQty(qty - 1);
    }
  };

  const plusOnClick = () => {
    setQty(qty + 1);
  };

  const showDeleteModal = () => {
    // Delete
  };

  const showEditModal = () => {
    // Edits
  };

  useEffect(() => {
    console.log(editModal);
  }, [editModal, deleteModal]);

  return (
    <>
      <div
        key={product.id}
        className="card card-compact w-full bg-neutral shadow-xl hover:scale-sm transition duration-300 ease-in-out"
      >
        <figure>
          <img src={product.imageUrl ? product.imageUrl : defaultImage} />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-xl">{product.name}</h2>
          <h2 className="text-lg">Rp. {product.price}</h2>
          {!!!tenant && (
            <>
              <div className="flex justify-center">
                <button onClick={minusOnClick} className="btn btn-error">
                  <FaMinus />
                </button>
                <div className="flex justify-center items-center w-14 font-semibold text-xl">
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
                <button onClick={() => toogleDeleteModal()} className="btn">
                  <FaTrash />
                </button>
                <button
                  onClick={() => toogleEditModal()}
                  className="btn btn-primary"
                >
                  <FaEdit />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      {editModal && (
        <>
          <div className="modal fixed inset-0 flex items-center justify-center z-50">
            <div className="modal-box p-4 bg-white rounded-lg shadow-lg">
              {/* Modal content here */}
              <h1>edit modal</h1>
            </div>
          </div>
        </>
      )}
      {deleteModal && (
        <>
          <dialog id="my_modal_4" className="modal bg-accent">
            <div className="modal-box w-11/12 max-w-5xl">
              <h3 className="font-bold text-lg">Hello!</h3>
              <p className="py-4">Click the button below to close</p>
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button, it will close the modal */}
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </>
      )}
    </>
  );
}
