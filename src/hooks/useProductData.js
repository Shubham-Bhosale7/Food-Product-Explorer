import axios from "axios";
import { useState, useEffect } from "react";

const useProductData = (type, searchQuery, categoryFilter) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Reset when search or category changes
  useEffect(() => {
    setProducts([]);
    setPage(1);
  }, [searchQuery, categoryFilter]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        let url = "";

        if (type === "productsFromHomePage") {
          let baseUrl = "https://world.openfoodfacts.org/cgi/search.pl?";
          const params = new URLSearchParams();

          params.append("search_terms", searchQuery || "");
          params.append("json", "true");
          params.append("page", page);
          params.append("page_size", "20");

          if (categoryFilter) {
            params.append("tagtype_0", "categories");
            params.append("tag_contains_0", "contains");
            params.append("tag_0", categoryFilter);
          }

          url = baseUrl + params.toString();
        }

        if (type === "productFromBarcode" && searchQuery) {
          const response = await axios.get(
            `https://world.openfoodfacts.org/api/v0/product/${searchQuery}.json`,
          );
          setProducts(response.data.product);
          setLoading(false);
          return;
        }

        if (!url) {
          setLoading(false);
          return;
        }
        const response = await axios.get(url);

        setProducts((prev) =>
          page === 1
            ? response.data.products
            : [...prev, ...response.data.products],
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type, searchQuery, categoryFilter, page]);

  return { products, loading, setPage };
};

export default useProductData;
