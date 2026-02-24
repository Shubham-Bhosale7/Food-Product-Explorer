Food Explorer – Development Journey

This project is a React-based food product search application using the OpenFoodFacts API. Users can search by product name or barcode, view product details, and load more products using pagination.

While building this project, I faced multiple issues. Below are 10 main problems I encountered and how I solved them.

1. Duplicate Key Error While Rendering Products

Problem:
React showed the warning:
“Encountered two children with the same key”.

Cause:
Some products from the API had duplicate or missing IDs.

Solution:
I changed the key to use a more stable value like product.code. I also made sure the key is always unique before rendering.

Learning:
Keys must always be unique and stable in React lists.

2. Search Results Not Resetting Properly

Problem:
When I searched a new product, old results were still mixed with new results.

Cause:
I was not clearing the products array when the search query changed.

Solution:
I added a useEffect that resets products and page number when searchQuery changes.

useEffect(() => {
  setProducts([]);
  setPage(1);
}, [searchQuery]);

Learning:
Whenever a dependency changes (like search input), related state must be reset properly.

3. Pagination Using Old Page Number After Search

Problem:
If I was on page 5 and searched something new, it fetched page 5 of the new search instead of page 1.

Solution:
Reset page to 1 when search changes.

Learning:
Search and pagination states must be connected carefully.

4. Random Page Logic Causing Inconsistent Behavior

Problem:
I tried using a random page number for homepage products, but it caused unpredictable results.

Cause:
Random number was recalculating on re-renders.

Solution:
I simplified the logic and controlled page state properly instead of recalculating random values.

Learning:
Avoid unnecessary randomness in state unless properly handled.

5. Incorrect Routing Structure for Search

Problem:
I was confused whether to show search results on homepage or a separate page.

Solution:
I decided to use query parameters like:

/?search=chocolate

Then I used useSearchParams to extract the search value.

Learning:
Clear routing structure makes the app simpler and easier to manage.

6. Confusion Between Barcode and Name Search

Problem:
The app needed to handle both barcode (numbers) and name (text) searches.

Solution:
I added a check:

If input contains only digits → treat as barcode.

Otherwise → treat as product name.

This helped in routing correctly.

Learning:
Input validation improves user experience and logic clarity.

7. Forgot to Import useEffect

Problem:
I used useEffect but forgot to import it.

Solution:
Fixed the import statement.

Learning:
Small mistakes can break the app. Always check imports carefully.

8. API URL Safety Issue

Problem:
In some cases, the API URL could become an empty string.

Solution:
Added a guard before making the API call to ensure the URL is valid.

Learning:
Always validate external requests before calling APIs.

9. Handling State for Load More (Pagination)

Problem:
New products were either replacing old ones or duplicating incorrectly.

Solution:
I added conditional logic:

If page is 1 → replace products

If page > 1 → append products

This fixed duplication and overwriting issues.

Learning:
Pagination requires careful state handling.