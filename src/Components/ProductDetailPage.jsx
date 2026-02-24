import React from "react";
// import { useOutletContext } from "react-router-dom";
import useProuctData from "../hooks/useProductData";
import randomFoodImage from "../images/randomFoodImage.webp";
import { useParams } from "react-router-dom";

function ProductDetailPage() {
  const { id } = useParams();
  console.log(id)
  const { loading, products, setPage }  = useProuctData("productFromBarcode", id);
  console.log(products, 'hwll');

  if (loading) {
    return <p className="w-72 mx-auto text-center mt-6 bg-green-600 text-white px-6 py-2 rounded">Loading...</p>;
  }

  // if (productData.status === 0 || !productData.product) {
  //   return <p className="p-4">Product not found.</p>;
  // }

  // const product = productData.product || {};

  const {
    product_name = "Unknown product",
    categories = "",
    selected_images,
    ingredients_text = "",
    ingredients_text_en,
    ingredients,
    nutriments = {},
    labels,
    labels_tags,
  } = products;

  const image =
    selected_images?.front?.display?.en ||
    selected_images?.front?.display?.fr ||
    products.image_front_url ||
    randomFoodImage;

  // Build ingredients array from available fields
  let ingredientsList = [];
  if (Array.isArray(ingredients) && ingredients.length > 0) {
    ingredientsList = ingredients.map((i) =>
      typeof i === "string" ? i : i.text || "",
    );
  } else if (
    Array.isArray(ingredients_text_en) &&
    ingredients_text_en.length > 0
  ) {
    ingredientsList = ingredients_text_en;
  } else if (typeof ingredients_text_en === "string" && ingredients_text_en) {
    ingredientsList = ingredients_text_en.split(",").map((s) => s.trim());
  } else if (typeof ingredients_text === "string" && ingredients_text) {
    ingredientsList = ingredients_text.split(",").map((s) => s.trim());
  }

  // Labels (fallback to tags)
  //   const labelList1 =

  const labelList =
    typeof labels === "string" && labels.length
      ? labels.split(",").map((s) => s.trim())
      : Array.isArray(labels_tags)
        ? labels_tags.map((t) =>
            typeof t === "string" ? t.replace("en:", "") : t,
          )
        : [];

  // Nutrition mapping - show common values if present
  const nutritionItems = [
    { key: "energy-kcal_100g", label: "Energy (kcal)" },
    { key: "energy_100g", label: "Energy (kJ)" },
    { key: "fat_100g", label: "Fat (g)" },
    { key: "saturated-fat_100g", label: "Saturated fat (g)" },
    { key: "carbohydrates_100g", label: "Carbs (g)" },
    { key: "sugars_100g", label: "Sugars (g)" },
    { key: "proteins_100g", label: "Proteins (g)" },
    { key: "salt_100g", label: "Salt (g)" },
    { key: "sodium_100g", label: "Sodium (g)" },
  ];

  return (
    <div className="p-4">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3 flex-shrink-0">
            <div className="w-full bg-gray-100 rounded overflow-hidden">
              <img
                src={image}
                alt={product_name}
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="mt-3">
              {labelList.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {labelList.map((lbl, idx) => (
                    <span
                      key={idx}
                      className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full"
                    >
                      {lbl}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="md:flex-1">
            <h2 className="text-2xl font-bold text-gray-800">{product_name}</h2>
            {categories && (
              <p className="text-sm text-gray-600 mt-1">{categories}</p>
            )}

            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                  Ingredients
                </h3>
                {ingredientsList.length > 0 ? (
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    {ingredientsList.map((ing, i) => (
                      <li key={i}>{ing}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">
                    No ingredients information available.
                  </p>
                )}
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                  Nutrition (per 100g)
                </h3>
                <div className="text-sm text-gray-700">
                  <div className="grid grid-cols-2 gap-2">
                    {nutritionItems.map((it) => {
                      const val = nutriments[it.key];
                      if (val === undefined || val === null) return null;
                      return (
                        <React.Fragment key={it.key}>
                          <div className="text-gray-600">{it.label}</div>
                          <div className="font-semibold">{val}</div>
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
