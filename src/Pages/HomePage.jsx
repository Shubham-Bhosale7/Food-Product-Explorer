import React, { useState } from "react";
import ProductCard from "../Components/ProductCard";
import CategoryFilter from "../Components/CategoryFilter";
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
  const [selectedCategory, setSelectedCategory] = useState(null);

  console.log("Inside home page" + searchQuery);

  const { products, loading, setPage } = useProuctData(
    "productsFromHomePage",
    searchQuery,
    selectedCategory,
  );

  console.log(products, "products");

  if (loading && products.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Filter Section */}
      <div className="bg-white border-b border-gray-200 p-4 shadow-sm">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Filter by Category
          </h3>
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4 p-4 max-w-7xl mx-auto">
        {products.length > 0
          ? products.map((product, i) => (
              <ProductCard key={`${product.code}-${i}`} product={product} />
            ))
          : !loading && (
              <p className="col-span-full text-center text-gray-500 py-8">
                No products found. Try a different search or category.
              </p>
            )}
      </div>

      {/* Load More Button */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      </div>
    </div>
  );
}

export default HomePage;
