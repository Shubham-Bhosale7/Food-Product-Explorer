import React, { useState } from "react";

function SortFilter({ sortBy, sortOrder, onSortChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const sortOptions = [
    { value: "name-asc", label: "Product Name (A-Z)" },
    { value: "name-desc", label: "Product Name (Z-A)" },
    { value: "grade-asc", label: "Nutrition Grade (Best First)" },
    { value: "grade-desc", label: "Nutrition Grade (Worst First)" },
  ];

  const handleSortSelect = (sortValue) => {
    onSortChange(sortValue);
    setIsOpen(false);
  };

  const currentLabel =
    sortOptions.find((opt) => opt.value === `${sortBy}-${sortOrder}`)?.label ||
    "Sort by";

  return (
    <div className="relative w-full sm:w-64">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-75 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium flex items-center justify-between hover:bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        <span>{currentLabel}</span>
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
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSortSelect(option.value)}
              className={`w-full text-left px-4 py-3 hover:bg-green-50 transition border-b border-gray-200 last:border-b-0 ${
                `${sortBy}-${sortOrder}` === option.value
                  ? "bg-green-100 text-green-700 font-semibold"
                  : "bg-white text-gray-700"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default SortFilter;
