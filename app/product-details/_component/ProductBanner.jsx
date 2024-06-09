import Image from "next/image";
import React from "react";

function ProductBanner({ productDetails }) {
  return (
    <div>
      <Image
        src={productDetails?.attributes?.banner?.data?.attributes?.url}
        alt="product banner"
        width={400}
        height={400}
        className="rounded-lg"
      />
    </div>
  );
}

export default ProductBanner;
