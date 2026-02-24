import React from "react";
import { useParams } from "react-router-dom";
import useProuctData from "../hooks/useProductData";
import ProductCard from "../Components/ProductCard";

function SimilarProductsPage() {
  console.log("into similar");
  const { search } = useParams();
  const searchQuery = search.split("search=")[1];

  const { products, loading, setPage } = useProuctData(
    "productsFromSimilarCategory",
    searchQuery,
  );
  console.log(products);

  if (loading && products.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4 p-4">
        {products.map((product, index) => (
          <ProductCard key={`${product.code}-${index}`} product={product} />
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

export default SimilarProductsPage;
