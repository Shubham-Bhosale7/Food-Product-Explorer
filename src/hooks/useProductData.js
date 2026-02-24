import axios from "axios";
import { useState, useEffect } from "react";

const useProuctData = (productDataType, barcode) => {
  const randomPage = Math.floor(Math.random() * (20 - 1 + 1)) + 1;
  const [productData, setProductData] = useState(null);
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
          setProductData((...prev) => [...response.data]);
        } else if (productDataType === "productFromBarcode" && barcode) {
          const response = await axios.get(
            `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`,
          );
          setProductData(response.data);
          console.log("hello");
          console.log(productData);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getProductData();
  }, [productDataType, barcode, page]);

  return {productData, loading, setPage};
};

export default useProuctData;
