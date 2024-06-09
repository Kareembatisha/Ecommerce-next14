"use client";
import React, { useEffect, useState } from "react";
import ProductList from "./ProductList";
import productApis from "../_utils/productApis";

function Product() {
  const [productList, setProductList] = useState([]);
  useEffect(() => {
    productApis_();
  }, []);
  const productApis_ = () => {
    productApis.getLatestProducts().then((res) => {
      console.log(res.data.data);
      setProductList(res.data.data);
    });
  };
  return (
    <div className="px-10 md:px-20">
      <h2 className="my-4 text-xl">Our Latest Products</h2>
      <ProductList productList={productList} />
    </div>
  );
}

export default Product;
