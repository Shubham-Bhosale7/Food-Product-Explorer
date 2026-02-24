import React, { useState } from "react";
import ProductCard from "../Components/ProductCard";
import useProuctData from "../hooks/useProductData";
import { useSearchParams } from "react-router-dom";

// function HomePage() {
//   const productData = useProuctData("productsFromHomePage");

//   const [visibleItemCount, setVisibleItemCount] = useState(20);

//   if (!productData?.products) {
//     return <p>Loading...</p>;
//   }

//   const handleLoadMore = () => {
//     // Increase the visible count
//     setVisibleItemCount((prevCount) => prevCount + 10);
//   };

//   return (
//     <>
//       <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4 p-4">
//         {productData.products.slice(0, visibleItemCount).map((product) => (
//           <ProductCard key={product.code} product={product} />
//         ))}
//       </div>
//       <div className="flex justify-center mb-6">
//         <button
//           onClick={handleLoadMore}
//           className="bg-green-600 text-white px-6 py-2 rounded"
//         >
//           Load More
//         </button>
//       </div>
//     </>
//   );
// }

function HomePage() {
  // const { searchQuery } = useOutletContext() || {};
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");
  console.log('Inside home page' + searchQuery)

  const { products, loading, setPage } = useProuctData("productsFromHomePage", searchQuery);

  console.log(products, "products");

  if (loading && products.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4 p-4">
        {products.map((product, i) => (
          <ProductCard key={`${product.code}-${i}`} product={product} />
        ))}
      </div>

      <div className="flex justify-center mb-6">
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="bg-green-600 text-white px-6 py-2 rounded"
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      </div>
    </>
  );
}

export default HomePage;
