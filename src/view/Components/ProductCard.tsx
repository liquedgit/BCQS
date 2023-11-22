import { FaMinus, FaPlus } from "react-icons/fa";
import { Product } from "../../model/Product";
import { useState, useEffect } from "react";
import defaultImage from "../../assets/Tenant1.jpg";

export default function ({
  product,
  updateQuantity,
}: {
  product: Product;
  updateQuantity: (id: string, qty: number) => void;
}) {
  const [qty, setQty] = useState(0);

  useEffect(() => {
    updateQuantity(product.id, qty);
  }, [qty]);

  const minusOnClick = () => {
    if (qty - 1 >= 0) {
      setQty(qty - 1);
    }
  };

  const plusOnClick = () => {
    setQty(qty + 1);
  };

  return (
    <>
      <div
        key={product.id}
        className="card card-compact w-full bg-base-100 shadow-xl"
      >
        <figure>
          <img src={product.imageUrl ? product.imageUrl : defaultImage} />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-xl">{product.name}</h2>
          <h2 className="text-lg">Rp. {product.price}</h2>
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
        </div>
      </div>
    </>
  );
}