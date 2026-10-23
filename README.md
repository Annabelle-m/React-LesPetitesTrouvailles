# Les Petites Trouvailles

A responsive fashion storefront built with React. Explore a curated collection
of women's clothing and accessories, search and filter products, save favorites,
manage a shopping cart, and read or submit product reviews.

Live Demo: Les Petites Trouvailles
https://les-petites-trouvailles-5u4p.vercel.app

The application is deployed on Vercel.

The application uses the public [DummyJSON API](https://dummyjson.com/) for
product data and review submissions. It is a demonstration project: DummyJSON
simulates creating reviews, browser storage keeps submitted reviews available
locally, and checkout does not process real payments.

## Features

- A home page featuring selected products and links to the catalog.
- A product catalog with:
  - Animated product search.
  - Category, price, and minimum-rating filters.
  - Sorting by recommendation, price, name, or rating.
  - Pagination, with 12 products per page.
- Product detail pages with product information, fractional star ratings,
  favorites, quantity selection, cart actions, and customer reviews.
- Product detail pages that open in a modal when selected from a listing, while
  remaining directly accessible by URL.
- Review submission with name, rating, and comment fields. Ratings are
  averaged from available product reviews; the API rating is used if there are
  no rated reviews.
- Favorites and shopping cart saved between visits.
- Cart feedback and review confirmations delivered through a shared
  notification system.
- Light and dark themes, with the selected theme saved between visits.
- Responsive desktop and mobile layouts, keyboard-accessible interactions, and
  support for the system reduced-motion preference.

## Requirements

- Node.js 20.19+ or 22.12+.
- npm.
- Network access to DummyJSON to load product data and submit reviews.

## Getting started

Install dependencies and start the development server:

```sh
npm install
npm run dev
```

Vite prints the local development URL in the terminal. It is typically
`http://localhost:5173`.

## Available scripts

| Command                | Description                                                      |
| ---------------------- | ---------------------------------------------------------------- |
| `npm run dev`          | Start the Vite development server.                               |
| `npm run build`        | Create an optimized production build in `dist/`.                 |
| `npm run preview`      | Preview the production build locally. Run `npm run build` first. |
| `npm run lint`         | Run Oxlint.                                                      |
| `npm run format`       | Format project files with Prettier.                              |
| `npm run format:check` | Check formatting without changing files.                         |

## Routes

| URL                    | Page                                 |
| ---------------------- | ------------------------------------ |
| `/`                    | Home page                            |
| `/products`            | Product catalog                      |
| `/products/:productId` | Product detail page or catalog modal |
| `/favorites`           | Saved favorites                      |
| `/cart`                | Shopping cart                        |
| Any unmatched URL      | Not-found page                       |

When a product is selected from a listing, React Router keeps the listing as
the background page and displays the product detail as a modal. Opening a
product URL directly renders the full detail page instead.

## Project structure

```text
src/
├── app/                         # App composition and route definitions
├── assets/                      # Brand images and other static assets
├── features/
│   ├── cart/                    # Cart state, storage, controls, and pages
│   ├── favorites/               # Favorites state, storage, and page
│   ├── home/                    # Home page and featured products
│   ├── products/                # Catalog, filters, details, search, and data
│   ├── reviews/                 # Review forms, lists, ratings, and services
│   └── theme/                   # Theme state, storage, and toggle
├── layouts/                     # Main layout, sidebar, and notification viewport
├── shared/
│   ├── api/                     # Shared API client
│   ├── components/
│   │   ├── not-found/           # Not-found page and styles
│   │   ├── notifications/       # Notification provider, hook, and toast
│   │   ├── pagination/          # Reusable pagination control and styles
│   │   ├── product-modal/       # Reusable product modal and styles
│   │   └── ui/                  # Shared buttons, inputs, select, and textarea
│   ├── constants/               # Shared route and pagination constants
│   ├── hooks/                   # Shared hooks
│   └── utils/                   # Shared utilities, including price formatting
└── styles/                      # Global styles and design tokens
```

Code is grouped by feature. Keep domain-specific behavior and UI within its
feature; use `shared/` for components and utilities that are reusable across
features. The `layouts/` directory composes application-wide elements around
the routed page content.

Global colors, typography, radii, shadows, and motion values are centralized
in `src/styles/variables.css`. Feature components keep their CSS beside their
JSX where applicable.

## Notifications

The notification provider is mounted above the router. Features publish
notifications with the shared `useNotifications` hook, while the layout-level
notification viewport displays them across routes. The shared toast provides
the common presentation and dismissal behavior; feature-specific content, such
as the cart product image and cart link, is supplied by the feature component.

## Data and persistence

### Products

Product data is fetched from DummyJSON category endpoints for:

- `womens-bags`
- `womens-dresses`
- `womens-jewellery`
- `womens-shoes`
- `womens-watches`
- `tops`

The catalog's display labels are defined separately from the API category
identifiers.

### Reviews and ratings

Reviews are submitted through DummyJSON's `POST /comments/add` endpoint.
DummyJSON simulates the creation response rather than persisting the review,
so the application also saves submitted reviews in local storage. Product
rating averages combine the ratings available from product reviews and
locally saved reviews. When there are no rated reviews, the product API rating
is used as a fallback.

### Browser storage

The following data is stored in `localStorage`:

| Key                             | Data                                      |
| ------------------------------- | ----------------------------------------- |
| `petites-trouvailles-cart`      | Cart products and quantities              |
| `petites-trouvailles-favorites` | Favorite products                         |
| `petites-trouvailles-reviews`   | Locally saved reviews, grouped by product |
| `les-petites-trouvailles-theme` | Selected light or dark theme              |

Stored data is tied to the current browser and site origin. Clearing site data
removes the saved cart, favorites, reviews, and theme preference.

## Technology

- React 19 and React DOM.
- React Router 7.
- Vite 8, with the React Compiler enabled in the Vite configuration.
- Lucide React for icons.
- Oxlint for linting.
- Prettier for formatting.

The interface uses project-owned React components and CSS rather than a
third-party component library.
