import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useSearchParams } from "react-router-dom";
import CategoryFilter from "./CategoryFilter";
import SortFilter from "./SortFilter";

function Header() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category");
  const sortBy = searchParams.get("sortBy") || "name";
  const sortOrder = searchParams.get("sortOrder") || "asc";

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedInput = input.trim();

    if (!trimmedInput) return;

    if (/^\d+$/.test(trimmedInput)) {
      navigate(`/product/${trimmedInput}`);
    } else {
      navigate(`/?search=${trimmedInput}`);
    }

    setInput("");
  };

  const handleCategoryChange = (categoryId) => {
    const params = new URLSearchParams(searchParams);
    if (categoryId) {
      params.set("category", categoryId);
    } else {
      params.delete("category");
    }
    navigate(`/?${params.toString()}`);
  };

  const handleSortChange = (sortValue) => {
    const [newSortBy, newSortOrder] = sortValue.split("-");
    const params = new URLSearchParams(searchParams);
    params.set("sortBy", newSortBy);
    params.set("sortOrder", newSortOrder);
    navigate(`/?${params.toString()}`);
  };

  return (
    <header className="bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3">
        {/* Top Navigation Bar - All in One Row */}
        <div className="flex items-center justify-center gap-6 flex-wrap lg:flex-nowrap">
          {/* Logo and Branding */}
          <Link
            to="/"
            className="flex items-center gap-2 hover:opacity-90 transition flex-shrink-0"
          >
            <div className="text-3xl font-bold">🍔</div>
            <div className="font-bold text-lg hidden sm:block whitespace-nowrap">
              Food Explorer
            </div>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSubmit} className="flex-1 min-w-xs max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products... (or enter barcode)"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full px-4 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-300 transition text-sm"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
              >
                🔍
              </button>
            </div>
          </form>

          {/* Category Filter */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-base font-medium  text-gray-100 whitespace-nowrap hidden sm:inline">
              Category:
            </span>
            <div className="w-40">
              <CategoryFilter
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
              />
            </div>
          </div>

          {/* Sort Filter */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-base font-medium text-gray-100 whitespace-nowrap hidden sm:inline">
              Sort:
            </span>
            <div className="w-40">
              <SortFilter
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSortChange={handleSortChange}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
