import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useState } from "react";

function Layout() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <>
      <Header setSearchQuery={setSearchQuery} />
      <Outlet context={{ searchQuery }} />
      <Footer />
    </>
  );
}

export default Layout;
