"use client";
import Breadcrumb from "@/app/_components/Breadcrumb";
import productApis from "@/app/_utils/productApis";
import React, { useEffect, useState } from "react";
import ProductBanner from "../_component/productBanner";
import ProductInfo from "../_component/productInfo";

function page({ params }) {
  const [productDetails, setProductDetails] = useState({});
  useEffect(() => {
    getProductById();
  }, [params?.productId]);
  const getProductById = () => {
    productApis.getProductById(params?.productId).then((res) => {
      console.log(res.data.data);
      setProductDetails(res.data.data);
    });
  };
  return (
    <div className="px-10 py-8 md:px-28">
      <Breadcrumb />
      <div className="grid grid-cols-1 gap-5 mt-10 justify-around sm:gap-0 sm:grid-cols-2 ">
        <ProductBanner productDetails={productDetails} />
        <ProductInfo productDetails={productDetails} />
      </div>
    </div>
  );
}

export default page;
