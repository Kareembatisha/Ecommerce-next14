import Image from "next/image";
import React from "react";

function ProductBanner({ productDetails }) {
  return (
    <div>
      {productDetails?.attributes?.banner?.data?.attributes?.url ? (
        <Image
          src={productDetails?.attributes?.banner?.data?.attributes?.url}
          alt="product banner"
          width={400}
          height={400}
          className="rounded-lg"
        />
      ) : (
        <div className="w-[400px] h-[225px] bg-slate-200 rounded-lg animate-pulse"></div>
      )}
    </div>
  );
}

export default ProductBanner;
