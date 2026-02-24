import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* About Section */}
          <div>
            <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
              <span className="text-2xl">🍔</span> Food Explorer
            </h3>
            <p className="text-sm text-gray-100">
              Discover detailed nutritional information about food products from
              around the world.
            </p>
          </div>

          {/* Features Section */}
          <div>
            <h4 className="font-semibold text-md mb-3">Features</h4>
            <ul className="text-sm text-gray-100 space-y-2">
              <li>🔍 Search by product name or barcode</li>
              <li>🏷️ Filter by category</li>
              <li>⭐ Sort by nutrition grade</li>
              <li>📊 Detailed nutrition information</li>
            </ul>
          </div>

          {/* Data Source */}
          <div>
            <h4 className="font-semibold text-md mb-3">Data Source</h4>
            <p className="text-sm text-gray-100 mb-3">
              Powered by <span className="font-semibold">Open Food Facts</span>{" "}
              - a free and open database of food products.
            </p>
            <a
              href="https://world.openfoodfacts.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-white text-green-600 rounded-lg font-semibold hover:bg-gray-100 transition text-sm"
            >
              Visit Open Food Facts
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-green-500 my-6"></div>

        {/* Copyright Section */}
        <div className="text-center text-sm text-gray-100">
          <p>&copy; {currentYear} Food Explorer. All rights reserved.</p>
          <p className="mt-2 text-xs">
            Data provided by Open Food Facts under the{" "}
            <a
              href="https://opendatacommons.org/licenses/odbl/1-0/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white transition"
            >
              ODbL license
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
