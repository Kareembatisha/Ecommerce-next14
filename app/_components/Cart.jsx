import React, { useContext } from "react";
import { cartContext } from "../_context/CartContext";
import Link from "next/link";

function Cart() {
  const { cart, setCart } = useContext(cartContext);
  console.log(cart);
  return (
    <div className="h-[300px] w-[300px] bg-gray-100 z-10 rounded-md border shadow-sm absolute mx-10 right-10 top-12 p-5 overflow-auto">
      <h3 className="text-center">Your cart list</h3>
      <div className="mt-4 space-y-6">
        <ul className="space-y-4">
          {cart?.map((item) => (
            <li key={item.id} className="flex items-center gap-4">
              <img
                src={
                  item?.productDetails?.attributes?.banner?.data?.attributes
                    ?.url
                }
                alt=""
                className="size-16 rounded object-cover"
              />

              <div>
                <h3 className="text-sm text-gray-900 line-clamp-1">
                  {item?.productDetails?.attributes?.title}
                </h3>

                <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                  <div>
                    <dt className="inline">category:</dt>
                    <dd className="inline">
                      {item?.productDetails?.attributes?.category}
                    </dd>
                  </div>

                  <div>
                    <dt className="inline">price:</dt>
                    <dd className="inline">
                      {item?.productDetails?.attributes?.price} $
                    </dd>
                  </div>
                </dl>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="space-y-4 text-center mt-5">
        <Link
          href="/cart"
          className="block rounded border border-gray-600 px-5 py-3 text-sm text-gray-600 transition hover:ring-1 hover:ring-gray-400"
        >
          View my cart ({cart.length})
        </Link>
      </div>
    </div>
  );
}

export default Cart;
