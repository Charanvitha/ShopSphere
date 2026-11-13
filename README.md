# ShopSphere

ShopSphere is a responsive product discovery application. The React/Vite client requests product data from an Express API. Product filtering, sorting, and pagination are handled by the server using a structured JSON inventory.

## Requirements

- Node.js 20.10 or newer (JSON import attributes are used by the server)
- npm

## Run locally

Install and start the API in one terminal:

```powershell
cd server
npm install
npm run dev
```

The API listens at `http://127.0.0.1:5001` by default. Set `PORT` or `HOST` if your environment needs a different binding.

Install and start the client in a second terminal:

```powershell
cd client
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`). The Vite development server proxies `/api` requests to `127.0.0.1:5001`. If you change the proxy configuration, restart Vite. To point the client at a separately hosted API, set `VITE_API_BASE_URL` in `client/.env.local` to its base URL.

For a production client bundle, run `npm run build` inside `client`. Run the API in production with `npm start` inside `server`.

## Project structure

```text
client/
  src/
    components/       Reusable navigation, filters, cards, loading, and empty states
    hooks/            Product fetching and request state
    pages/            Catalog page and UI state
    services/          Fetch API wrapper
server/
  src/
    data/              JSON product inventory
    controllers/       HTTP request handlers
    middleware/        Centralized 404 and error responses
    routes/            Express API routes
    services/          Query validation and product business logic
```

## API

### `GET /api/products`

Returns the filtered and paginated product page.

| Query | Meaning | Default / allowed values |
| --- | --- | --- |
| `search` | Case-insensitive substring match against product name | Empty string |
| `category` | One or more categories; pass comma-separated values or repeat the key | Electronics, Apparel, Footwear, Home & Living, Accessories |
| `minPrice` | Inclusive lower price bound | Unset; must be finite and non-negative |
| `maxPrice` | Inclusive upper price bound | Unset; must be finite and non-negative |
| `minRating` | Inclusive minimum star rating | Unset; from 1 through 5 |
| `sortBy` | Sort order | `featured`, `price-asc`, `price-desc`, `rating-desc` |
| `page` | One-based page number | `1`; integer up to 1,000,000 |
| `limit` | Items per page | `30`; integer from 1 through 100 |

Example:

```text
GET /api/products?category=Electronics,Apparel&minPrice=50&maxPrice=300&minRating=4&sortBy=price-asc&page=1&limit=12
```

Success response:

```json
{
  "success": true,
  "products": [],
  "totalProducts": 0,
  "currentPage": 1,
  "totalPages": 0
}
```

Invalid values return HTTP `400` with `{ "success": false, "message": "..." }`. A request with `minPrice` greater than `maxPrice`, an unsupported category or sort value, an invalid rating, or an invalid page/limit is rejected.

### `GET /api/products/filters`

Returns categories and the inventory-wide price boundaries:

```json
{
  "success": true,
  "categories": ["Accessories", "Apparel", "Electronics", "Footwear", "Home & Living"],
  "priceRange": { "min": 28, "max": 1199 }
}
```

### `GET /api/health`

Returns `{ "success": true, "status": "ok" }` when the server is running.

## Filtering and sorting flow

The service validates query values before processing. It then applies category matching (OR across selected categories), inclusive price bounds, minimum rating, and case-insensitive product-name search. It sorts the remaining results (`featured` follows inventory ID order; the price sorts use numeric price; top-rated sorts by rating, then review count), computes the total count and page count, and finally slices the requested page. Thus `totalProducts` describes all matches before pagination.

Search input is debounced by 300 ms in the client. Other filter changes request results immediately. The client cancels obsolete fetches with `AbortController`, shows loading and error states, and never filters or sorts the inventory locally.

## Viva preparation

1. **Why is filtering implemented in Express?** The API remains the source of truth and the same rules can serve more than one client.
2. **Why separate routes, controllers, and services?** Routes map URLs, controllers translate HTTP requests and responses, and services hold reusable business logic and validation.
3. **Why filter before paginating?** Pagination must select from the complete matching set, otherwise counts and pages would be wrong.
4. **How are multiple categories combined?** A product is included when its category matches any selected category; the other filter groups are combined with AND.
5. **How does search work?** It trims and lowercases the query and checks whether the lowercased product name contains it.
6. **What does `totalProducts` count?** All filtered results before page slicing.
7. **How do you prevent invalid price ranges?** The service checks for finite, non-negative prices and rejects `minPrice > maxPrice` with HTTP 400; the UI also constrains the two controls.
8. **How does the UI avoid too many search requests?** It waits 300 ms after the last keystroke and cancels the previous in-flight request when parameters change.
9. **How are sort ties handled for ratings?** Higher review count is used as a secondary key.
10. **How are empty results handled?** The grid is replaced with a message and a reset button; the API still returns a successful response with an empty products array.
11. **How are inventory categories and price limits kept consistent?** `/api/products/filters` derives them from the JSON inventory at runtime.
12. **How would you replace the JSON inventory with a database?** Keep the same service contract and move the filtering/query operations into database queries, preserving validation and response shape.

## Git commit plan

Use incremental commits such as:

1. `chore: scaffold ShopSphere client and server`
2. `feat(api): add sample product inventory and catalog endpoints`
3. `feat(api): validate and apply product filters and sorting`
4. `feat(ui): build responsive catalog and filter components`
5. `feat(ui): connect catalog filters to products API`
6. `docs: add setup, API, and viva guide`

No commits have been created automatically.
