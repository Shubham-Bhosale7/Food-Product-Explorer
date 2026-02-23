# Food Product Explorer — Layout Fix

This repository demonstrates a small layout change that arranges product cards in a responsive grid on the home page.

Summary of the change

- File modified: [src/Pages/HomePage.jsx](src/Pages/HomePage.jsx)
- Change: Wrapped the product list in a responsive Tailwind CSS grid container so cards display in rows and columns instead of stacking vertically.

Method used

- Inspected the `HomePage.jsx` component and found it returned a raw array of `ProductCard` elements which caused a vertical stack.
- Added a parent `div` with Tailwind grid classes: `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-4` to provide responsive columns and spacing.
- Kept the `ProductCard` component as-is; its internal sizing works together with the grid for consistent card sizing.

How to verify

- Start the development server (for example `npm start` or `yarn start`).
- Open the app in a browser and navigate to the home page.
- Resize the browser to observe the responsive column changes (1 → 2 → 3 → 6 columns at breakpoints).

Notes

- Tailwind CSS is used for layout; ensure Tailwind is configured and the project build is working.
- If you prefer different column counts, change the grid classes in [src/Pages/HomePage.jsx](src/Pages/HomePage.jsx).

If you want, I can also adjust the `ProductCard` widths to rely fully on the grid (remove its internal width classes) — tell me which approach you prefer.

1) First I studied the endpoints and got endpoints for
  1) Random Products for HomePage - 
    [text](https://world.openfoodfacts.org/cgi/search.pl?search_terms=&json=true&page={randomNumber}&page_size=20)

  2) Product from barcode