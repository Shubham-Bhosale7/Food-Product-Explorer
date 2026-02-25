import React from "react";
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
  const selectedCategory = searchParams.get("category");

  console.log("Inside home page" + searchQuery);

  const { products, loading, setPage } = useProuctData(
    "productsFromHomePage",
    searchQuery,
    selectedCategory,
  );

  // Sort products based on sortBy and sortOrder from URL params
  const sortedProducts = React.useMemo(() => {
    const productsCopy = [...products];
    const sortBy = searchParams.get("sortBy") || "name";
    const sortOrder = searchParams.get("sortOrder") || "asc";

    if (sortBy === "name") {
      productsCopy.sort((a, b) => {
        const nameA = (a.product_name || "").toLowerCase();
        const nameB = (b.product_name || "").toLowerCase();
        return sortOrder === "asc"
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      });
    } else if (sortBy === "grade") {
      const gradeOrder = { A: 1, B: 2, C: 3, D: 4, E: 5, "N/A": 6 };
      productsCopy.sort((a, b) => {
        const gradeA = (a.nutrition_grades || "N/A").toString().toUpperCase();
        const gradeB = (b.nutrition_grades || "N/A").toString().toUpperCase();
        const orderA = gradeOrder[gradeA] || 6;
        const orderB = gradeOrder[gradeB] || 6;
        return sortOrder === "asc" ? orderA - orderB : orderB - orderA;
      });
    }

    return productsCopy;
  }, [products, searchParams]);

  console.log(products, "products");

  if (loading && products.length === 0) {
    return (
      <div className="text-center mt-6 mb-6">
        <p className="inline-block bg-green-600 text-white px-6 py-2 rounded">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Products Grid */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4 p-4 max-w-7xl mx-auto">
        {sortedProducts.length > 0
          ? sortedProducts.map((product, i) => (
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
