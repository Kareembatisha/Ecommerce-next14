"use client";
import { usePathname } from "next/navigation";
import Breadcrumb from "../../_components/Breadcrumb";
import productApis from "../../_utils/productApis";
import React, { useEffect, useState } from "react";
import ProductBanner from "../_component/ProductBanner";
import ProductInfo from "../_component/ProductInfo";
import ProductList from "../../_components/ProductList";

function page({ params }) {
  const [productDetails, setProductDetails] = useState({});
  const [productList, setProductList] = useState([]);
  const path = usePathname();
  useEffect(() => {
    getProductById();
  }, [params?.productId]);
  const getProductById = () => {
    productApis.getProductById(params?.productId).then((res) => {
      console.log(res.data.data);
      setProductDetails(res.data.data);
      getProductListByCategory(res.data.data);
    });
  };
  const getProductListByCategory = (product) => {
    productApis
      .getProductByCategory(product?.attributes?.category)
      .then((res) => {
        console.log(res?.data?.data);
        setProductList(res?.data?.data);
      });
  };
  return (
    <div className="px-10 py-8 md:px-28">
      <Breadcrumb path={path} />
      <div className="grid grid-cols-1 gap-5 mt-10 justify-around sm:gap-0 sm:grid-cols-2 ">
        <ProductBanner productDetails={productDetails} />
        <ProductInfo productDetails={productDetails} />
      </div>
      <h2 className="mt-24 mb-4 text-xl">similar Products</h2>
      <ProductList productList={productList} />
    </div>
  );
}

export default page;
