"use client";
import { AlertOctagon, BadgeCheck, ShoppingCart } from "lucide-react";
import React, { useContext } from "react";
import SkeletonProductInfo from "./SkeletonProductInfo";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import cartApis from "../../_utils/cartApis";
import { cartContext } from "../../_context/CartContext";

function ProductInfo({ productDetails }) {
  const { cart, setCart } = useContext(cartContext);

  const { user } = useUser();
  const router = useRouter();
  const handleAddToCart = () => {
    if (!user) {
      router.push("/sign-in");
    } else {
      const data = {
        data: {
          userName: user.username,
          email: user.primaryEmailAddress.emailAddress,
          products: [productDetails?.id],
        },
      };
      cartApis.addToCart(data).then((res) => {
        console.log(res);
        setCart((oldCart) => [
          ...oldCart,
          {
            id: res?.data?.data?.id,
            productDetails,
          },
        ]);
      });
    }
  };
  return (
    <div>
      {productDetails?.id ? (
        <div>
          <h2 className="text-[20px]">{productDetails?.attributes?.title}</h2>
          <h2 className="text-[15px] text-gray-400">
            {productDetails?.attributes?.category}
          </h2>
          <h2 className="text-[15px] mt-5">
            {productDetails?.attributes?.discription[0]?.children[0].text}
          </h2>
          <h2 className="text-[11px] text-gray-500 flex gap-2 mt-2 items-center">
            {productDetails?.attributes?.instantDelivery ? (
              <BadgeCheck className="w-5 h-5 text-green-500" />
            ) : (
              <AlertOctagon className="" />
            )}
            Eligible For Instant Delivery
          </h2>
          <h2 className="text-[32px] text-primary mt-3">
            ${productDetails?.attributes?.price}
          </h2>
          <button
            onClick={() => handleAddToCart()}
            className="flex gap-2 p-3 text-white rounded-lg bg-primary  hover:bg-[#3572EF]"
          >
            <ShoppingCart /> Add To Cart
          </button>
        </div>
      ) : (
        <SkeletonProductInfo />
      )}
    </div>
  );
}

export default ProductInfo;
