import axios from "axios";
import { useState, useEffect } from "react";

const useCategoryData = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        // Fetch top categories from OpenFoodFacts API
        const response = await axios.get(
          "https://world.openfoodfacts.org/categories.json",
        );

        if (response.data.tags) {
          // Extract category tags and limit to top categories
          const categoryList = response.data.tags
            .slice(0, 50) // Limit to top 50 categories
            .map((cat) => ({
              id: cat.id,
              name: cat.name,
              products: cat.products,
            }))
            .sort((a, b) => b.products - a.products); // Sort by product count

          setCategories(categoryList);
        }
        setError(null);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to fetch categories");
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};

export default useCategoryData;
