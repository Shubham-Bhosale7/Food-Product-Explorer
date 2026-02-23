import axios from "axios";
import { useState, useEffect } from "react";

const useProuctData = (productDataType, barcode) => {
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    const getProductData = async () => {
      const randomPage = Math.floor(Math.random() * (20 - 1 + 1)) + 1;
      try {
        if (productDataType === "productsFromHomePage") {
          const response = await axios.get(
            `https://world.openfoodfacts.org/cgi/search.pl?search_terms=&json=true&page=${randomPage}&page_size=20`,
          );
          setProductData(response.data);
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
      }
    };

    getProductData();
  }, [productDataType, barcode]);

  return productData;
};

export default useProuctData;
