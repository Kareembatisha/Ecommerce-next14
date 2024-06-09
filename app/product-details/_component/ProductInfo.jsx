import { AlertOctagon, BadgeCheck, ShoppingCart } from "lucide-react";
import React from "react";

function ProductInfo({ productDetails }) {
  return (
    <div key={productDetails?.id || Math.random()}>
      <h2 className="text-[20px]">{productDetails?.attributes?.title}</h2>
      <h2 className="text-[15px] text-gray-400">
        {productDetails?.attributes?.category}
      </h2>
      <h2 className="text-[15px] mt-5">
        {productDetails?.attributes?.discription[0]?.children[0].text}
      </h2>
      <h2 className="text-[11px] text-gray-500 flex gap-2 mt-2 items-center">
        {productDetails?.attributes?.instantDelivery ? <BadgeCheck className="w-5 h-5 text-green-500"/>:<AlertOctagon className=""/>}Eligible For Instant
        Delivery
      </h2>
      <h2 className="text-[32px] text-primary mt-3">
        ${productDetails?.attributes?.price}
      </h2>
      <button className="flex gap-2 p-3 text-white rounded-lg bg-primary  hover:bg-[#3572EF]">
        <ShoppingCart /> Add To Cart
      </button>
    </div>
  );
}

export default ProductInfo;
