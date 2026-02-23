import React from "react";
import randomFoodImage from "../images/randomFoodImage.webp";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();

  const {
    code = "unknown code",
    _id = "unknown ID",
    product_name = "unknown product",
    _keywords = "",
    selected_images,
    compared_to_category = "General",
    ingredients_text_en = [],
    nutrition_grades = "N/A",
  } = product || {};

  const image =
    selected_images?.front?.display?.fr ||
    selected_images?.front?.display?.en ||
    randomFoodImage;

  const grade_list = ["A", "B", "C", "D", "E"];

  let grade = (nutrition_grades || "").toString().toUpperCase();

  if (!grade_list.includes(grade)) {
    grade = "N/A";
  }

  const categoryName = compared_to_category?.includes(":")
    ? compared_to_category.split(":")[1]?.replace(/-/g, " ")
    : "General";

  // Function to get color for nutrition grade
  const getGradeColor = (g) => {
    const colors = {
      A: "bg-green-500 text-white",
      B: "bg-lime-500 text-white",
      C: "bg-yellow-500 text-white",
      D: "bg-orange-500 text-white",
      E: "bg-red-500 text-white",
    };
    return colors[g] || "bg-gray-400 text-white";
  };

  // Normalize ingredients into an array
  const ingredients = Array.isArray(ingredients_text_en)
    ? ingredients_text_en
    : typeof ingredients_text_en === "string" && ingredients_text_en
      ? ingredients_text_en.split(",").map((s) => s.trim())
      : [];

  return (
    <div className="p-2">
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col h-full">
        {/* Image Container - rectangle */}
        <div className="relative h-40 overflow-hidden bg-gray-200">
          <img
            src={image}
            alt={product_name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />

          {/* Nutrition Grade Badge */}
          <div
            className={`absolute top-2 right-2 ${getGradeColor(
              grade,
            )} rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm shadow-lg`}
          >
            {grade || "N/A"}
          </div>
        </div>

        {/* Content */}
        <div className="p-3 flex flex-col flex-grow">
          <div className="mb-2">
            <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
              {categoryName}
            </span>
          </div>

          <h3 className="text-sm font-semibold text-gray-800 mb-2 line-clamp-2">
            {product_name}
          </h3>

          {ingredients && ingredients.length > 0 && (
            <div className="mb-3 flex-grow">
              <p className="text-xs font-semibold text-gray-600 mb-1">
                Ingredients:
              </p>
              <div className="flex flex-wrap gap-1">
                {ingredients.slice(0, 3).map((ing, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                  >
                    {ing}
                  </span>
                ))}
                {ingredients.length > 3 && (
                  <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                    +{ingredients.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}

          <button
            className="w-full mt-auto bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition duration-200"
            onClick={() => navigate(`/product/${code}`)}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
