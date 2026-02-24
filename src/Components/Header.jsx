import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");

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

  return (
    <header className="bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-4">
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between gap-8">
          {/* Logo and Branding */}
          <Link
            to="/"
            className="flex items-center gap-2 hover:opacity-90 transition"
          >
            <div className="text-2xl font-bold">🍎</div>
            <div className="font-bold text-xl hidden sm:block">
              Food Explorer
            </div>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSubmit} className="flex-1 max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full px-4 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-300 transition"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
              >
                🔍
              </button>
            </div>
          </form>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="hover:text-green-100 transition duration-200 font-medium"
            >
              Home
            </Link>
            <Link
              to="/"
              className="hover:text-green-100 transition duration-200 font-medium"
            >
              Products
            </Link>
            <Link
              to="/"
              className="hover:text-green-100 transition duration-200 font-medium"
            >
              About
            </Link>
            <Link
              to="/"
              className="hover:text-green-100 transition duration-200 font-medium"
            >
              Contact
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-2xl hover:opacity-80 transition">
            ☰
          </button>
        </div>

        {/* Category Filter Bar */}
        <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
          {["All", "Fruits", "Vegetables", "Dairy", "Grains", "Organic"].map(
            (category) => (
              <button
                key={category}
                className="px-4 py-2 bg-green-500 hover:bg-green-400 rounded-full text-sm font-medium whitespace-nowrap transition"
              >
                {category}
              </button>
            ),
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
