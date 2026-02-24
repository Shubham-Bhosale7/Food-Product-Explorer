import React, { useState } from "react";
import useCategoryData from "../hooks/useCategoryData";

function CategoryFilter({ onCategoryChange, selectedCategory }) {
  const { categories, loading, error } = useCategoryData();
  const [isOpen, setIsOpen] = useState(false);

  const handleCategorySelect = (category) => {
    onCategoryChange(category.id === selectedCategory ? null : category.id);
    setIsOpen(false);
  };

  if (loading) {
    return <div className="text-sm text-white">Loading categories...</div>;
  }

  if (error) {
    return <div className="text-sm text-red-500">{error}</div>;
  }

  return (
    <div className="relative w-full sm:w-64">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-75 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium flex items-center justify-between hover:bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        <span>
          {selectedCategory
            ? categories.find((cat) => cat.id === selectedCategory)?.name ||
              "Select Category"
            : "All Categories"}
        </span>
        <svg
          className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          <button
            onClick={() => handleCategorySelect({ id: null })}
            className={`w-full text-left px-4 py-3 hover:bg-green-50 transition ${
              !selectedCategory
                ? "bg-green-100 text-green-700 font-semibold"
                : ""
            }`}
          >
            All Categories
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategorySelect(category)}
              className={`w-full text-left px-4 py-3 hover:bg-green-50 transition border-t border-gray-200 flex items-center justify-between ${
                selectedCategory === category.id
                  ? "bg-green-100 text-green-700 font-semibold"
                  : "bg-white text-gray-700"
              }`}
            >
              <span>{category.name}</span>
              <span className="text-xs text-gray-500">
                ({category.products})
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryFilter;
