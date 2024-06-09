import React from "react";
import ProductItem from "./productItem";

function ProductList({ productList }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {productList.map((item) => (
        <ProductItem key={item.id} product={item} />
      ))}
    </div>
  );
}

export default ProductList;
