import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Layout from "./Components/Layout";
import ProductDetailPage from "./Pages/ProductDetailPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index  element={<HomePage />} />
        {/* <Route path="/product/:search"  element={<HomePage />} /> */}
        <Route path="product/:id" element={<ProductDetailPage />} />
      </Route>
    </Routes>
  </BrowserRouter>,
);
