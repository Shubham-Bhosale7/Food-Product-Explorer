import axios from "axios";
import { useState, useEffect } from "react";

const useProuctData = (productDataType, barcode) => {
  const randomPage = Math.floor(Math.random() * (20 - 1 + 1)) + 1;
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getProductData = async () => {
      setLoading(true);
      try {
        if (productDataType === "productsFromHomePage") {
          const response = await axios.get(
            `https://world.openfoodfacts.org/cgi/search.pl?search_terms=&json=true&page=${page}&page_size=20`,
          );
          setProducts((prev) => [...prev,...response.data.products]);
        } else if (productDataType === "productFromBarcode" && barcode) {
          const response = await axios.get(
            `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`,
          );
          setProducts(response.data.products);
          console.log("hello");
          
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getProductData();
  }, [productDataType, barcode, page]);

  return {products, loading, setPage};
};

export default useProuctData;
