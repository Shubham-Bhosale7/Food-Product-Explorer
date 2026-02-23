import React, { useState } from "react";
import ProductCard from "../Components/ProductCard";
import useProuctData from "../hooks/useProductData";


function HomePage() {

  const productData = useProuctData("productsFromHomePage");

  if (!productData?.products) {
    return <p>Loading...</p>;
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4 p-4">
      {productData.products.map((product) => (
        <ProductCard key={product.code} product={product} />
      ))}
    </div>
  );
}
export default HomePage;
