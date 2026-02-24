import axios from "axios";
import { useState, useEffect } from "react";

const useProductData = (type, searchQuery) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Reset when search changes
  useEffect(() => {
    setProducts([]);
    setPage(1);
  }, [searchQuery]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        let url = "";

        if (type === "productsFromHomePage") {
          url = searchQuery
            ? `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${searchQuery}&json=true&page=${page}&page_size=20`
            : `https://world.openfoodfacts.org/cgi/search.pl?search_terms=&json=true&page=${page}&page_size=20`;
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
  }, [type, searchQuery, page]);

  return { products, loading, setPage };
};

export default useProductData;
