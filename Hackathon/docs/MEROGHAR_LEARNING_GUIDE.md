# MEROGHAR — COMPLETE CODEBASE LEARNING & MERN ARCHITECTURE GUIDE

Welcome to the official learning guide for the **MeroGhar** property valuation platform. This document serves as a complete technical textbook and blueprint designed to teach you how the existing React MVP is constructed line-by-line, and how to replicate its concepts tomorrow as a full **MERN-stack** (MongoDB, Express, React, Node.js) application for a hackathon.

---

## 📌 WHAT YOU SHOULD LEARN FIRST (LEARNING PRIORITY)

Before diving into complex backend architectures or machine learning concepts, master the core building blocks in this recommended sequence:

### Level 1 — MUST KNOW (Foundation)
1. **JavaScript Functions & Arrow Functions**: Syntax, scopes, and return values.
2. **Objects & Data Structures**: Accessing properties, nested objects, key-value mappings.
3. **Array Methods (`map`, `filter`, `find`, `reduce`, `sort`)**: Transforming, filtering, and summarizing lists of properties.
4. **Destructuring & Spread Operator**: `{ propertyType, landArea }` and `[...properties]`.
5. **React Components & JSX**: Building UI blocks with XML-like syntax inside JavaScript.
6. **Props**: Passing data down from parent components to child components.
7. **State (`useState`)**: Local memory of a component that triggers UI re-renders.
8. **Controlled Form Inputs & Event Handling**: Syncing `<input>` values directly with React state.

### Level 2 — NEXT (Frontend Application Logic)
9. **Side Effects (`useEffect`)**: Synchronizing data loading and timers on component mount.
10. **React Router (`react-router-dom`)**: Single Page Application navigation, routes, parameters, and programmatic redirection.
11. **Isolated Service Modules**: Moving calculations out of UI components into clean helper services (`valuationService.ts`).
12. **Browser Storage (`localStorage`)**: Persisting user data across browser refreshes without a database.
13. **Data Visualization (Recharts)**: Mapping raw numeric datasets into responsive SVG charts.

### Level 3 — MERN STACK MIGRATION (Hackathon Goal)
14. **Express.js Server**: Setting up HTTP route handlers (`app.get`, `app.post`).
15. **REST API Design**: Designing standard endpoints (`GET /api/properties`, `POST /api/valuations`).
16. **MongoDB & Mongoose**: Modeling document collections, schemas, and queries.
17. **Controller vs. Service Layering**: Separating HTTP request handling from business rules.
18. **JWT Authentication**: Password hashing with `bcrypt` and securing API routes with JSON Web Tokens.

### Level 4 — ADVANCED DOMAIN LOGIC
19. **Deterministic Valuation Algorithms**: Weighted land base rates, construction depreciation, and road access adjustments.
20. **Multi-Factor Comparable Matching**: Mathematical similarity scoring algorithm matching nearby properties.

---

## 🗺️ THE BIG PICTURE & APPLICATION ARCHITECTURE

### High-Level Data & Layer Flow
```text
               User Interaction (Clicks / Form Input)
                                 │
                                 ▼
                     React UI Components (JSX)
                                 │
                                 ▼
                  Pages (Route Containers & Layouts)
                                 │
                                 ▼
                   Hooks & React State (useState)
                                 │
                                 ▼
              Business Services (valuationService.ts)
                                 │
                                 ▼
            Local Storage / Mock Data (mockProperties.ts)
                                 │
                                 ▼
         Re-render UI (Donut Charts, Report Cards, Result)
```

### Complete End-to-End Tracing: Clicking "Get Valuation"
When a user visits MeroGhar and completes a property valuation, here is the exact step-by-step execution path:

```text
[User clicks "Get Valuation" on Hero / Navbar]
        │
        ▼
React Router navigates to "/valuation" (ValuationFormPage.tsx)
        │
        ▼
User fills Step 1 (Location: Kathmandu / Baneshwor) -> useState update in ValuationFormPage
User fills Step 2 (Property: House, 4 Aana, 2400 sq.ft) -> useState update
User fills Step 3 (Characteristics: 20 ft road, 6 yrs old, Good condition) -> useState update
User clicks "Calculate Property Value" in Step 4 (Step4Review.tsx)
        │
        ▼
Form onSubmit handler executes -> Stores input in sessionStorage ('meroghar_pending_valuation')
Navigates to "/valuation-processing" (ValuationProcessingPage.tsx)
        │
        ▼
ValuationProcessingPage mounts -> Starts step-by-step timer animation (0ms -> 300ms -> 700ms -> 1100ms -> 1500ms)
Calls valuationService.calculateValuation(formData)
        │
        ▼
valuationService calculates:
  - Base Land Value: 4 Aana * NPR 55,00,000 (Baneshwor rate) = NPR 2.20 Cr
  - Building Value: 2,400 sq.ft * 4,000 * 0.92 (6 yrs age) * 0.93 (Good cond) = NPR 82 shadow value
  - Road Adjustment: 20 ft road (+5%)
  - Total Estimated Value = NPR 2,48,00,000 (Range: NPR 2.35 Cr - 2.60 Cr)
        │
        ▼
ValuationResult saved to localStorage via storageService.saveValuation(result)
Navigates to "/valuation-result" (ValuationResultPage.tsx)
        │
        ▼
ValuationResultPage reads active result -> Fetches Top 3 Comparable Properties via propertyService.getComparableProperties()
        │
        ▼
React re-renders: Donut Breakdown Chart + Explanation Cards + Comparable Property Cards + Price Benchmark Bar Chart
```

---

## 📁 PROJECT FILE TREE & LAYER RESPONSIBILITIES

```text
D:\Coding\Demo/
├── index.html                        # HTML entry point with Inter font & root element
├── package.json                      # Dependencies, scripts, and package manifests
├── vite.config.ts                    # Vite build tool configuration & path aliases (@/*)
├── tailwind.config.js                # Tailwind CSS custom theme & MeroGhar color palette
├── postcss.config.js                 # PostCSS plugins (TailwindCSS & Autoprefixer)
├── tsconfig.json                     # TypeScript compiler settings
├── public/
│   └── favicon.svg                   # SVG MeroGhar house logo icon
└── src/
    ├── main.tsx                      # React root rendering entry point
    ├── App.tsx                       # React Router route setup (/properties, /valuation, etc.)
    ├── index.css                     # Tailwind directives (@tailwind base/components/utilities)
    ├── assets/                       # Static assets
    ├── components/
    │   ├── common/
    │   │   ├── Logo.tsx              # Brand logo (Full, Compact, Icon variants)
    │   │   ├── Navbar.tsx            # Sticky header navigation with mobile drawer
    │   │   ├── Footer.tsx            # Brand footer & Nepal coverage info
    │   │   ├── PropertyCard.tsx      # Reusable property card with price, specs, favorite heart
    │   │   └── MapPlaceholder.tsx    # Vector interactive map visualizer with price pins
    │   └── valuation/
    │       ├── Step1Location.tsx     # Step 1: Province, District, Municipality, Ward & Locality
    │       ├── Step2Property.tsx     # Step 2: Property Type, Land Area & Built-Up Area
    │       ├── Step3Characteristics.tsx # Step 3: Road Width, Rooms, Age & Condition
    │       └── Step4Review.tsx       # Step 4: Summary card & Calculate trigger button
    ├── data/
    │   ├── nepalLocations.ts         # Nepal geographic hierarchy data (Provinces, Districts, Wards)
    │   ├── valuationConfig.ts        # Rates per Aana, construction base rates, depreciation tables
    │   ├── mockProperties.ts         # 15+ realistic Nepalese property database
    │   └── marketData.ts             # District market summaries, price trends, property distribution
    ├── hooks/
    │   ├── useSavedProperties.ts     # Custom hook managing favorite properties in localStorage
    │   └── useValuationHistory.ts    # Custom hook managing past valuation runs in localStorage
    ├── layouts/
    │   └── MainLayout.tsx            # Wrapper layout containing Navbar, Outlet, and Footer
    ├── pages/
    │   ├── HomePage.tsx              # Hero, how it works, trust cards, market snapshot & chart
    │   ├── PropertySearchPage.tsx    # Property discovery page with filter sidebar & map view
    │   ├── PropertyDetailsPage.tsx   # Detailed property page with photo gallery & valuation card
    │   ├── ValuationFormPage.tsx     # Multi-step wizard wrapper & progress indicator bar
    │   ├── ValuationProcessingPage.tsx # Animated step checklist during calculation
    │   ├── ValuationResultPage.tsx   # Hero estimate, donut breakdown chart, benchmark chart
    │   ├── MarketInsightsPage.tsx    # Nepal market analytics & price trend line charts
    │   ├── ValuationReportPage.tsx   # Formal printable report document (Print / Save PDF)
    │   ├── DashboardPage.tsx         # User overview stats cards & recent valuation card
    │   ├── SavedPropertiesPage.tsx   # User saved favorites list & empty state
    │   └── ValuationHistoryPage.tsx  # Valuation archive table & price trend timeline chart
    ├── services/
    │   ├── valuationService.ts       # Deterministic calculation engine
    │   ├── propertyService.ts        # Property search, filtering & similarity matching engine
    │   └── storageService.ts         # Browser localStorage abstraction layer
    └── utils/
        ├── currency.ts               # NPR Lakhs / Crores formatting & land unit converter
        └── valuationHelpers.ts       # Helper formatting utilities
```

### Layer Responsibility Summary Table

| Layer | File / Path | Responsibility | Important Concepts |
| :--- | :--- | :--- | :--- |
| **Data Layer** | `src/data/valuationConfig.ts` | Configuration constants for local land rates, building rates & depreciation | Object mappings, numerical factors |
| **Services Layer** | `src/services/valuationService.ts` | Math calculations for land, building, road, and age adjustments | Pure functions, deterministic math |
| **Services Layer** | `src/services/propertyService.ts` | Filtering property catalog and calculating similarity scores | Array `filter`, `sort`, `map`, weighted scoring |
| **Storage Layer** | `src/services/storageService.ts` | Interfacing with browser `localStorage` safely | `JSON.stringify`, `JSON.parse`, try-catch |
| **Custom Hooks** | `src/hooks/useSavedProperties.ts` | React state wrapper around storage service | `useState`, `useEffect`, `useCallback` |
| **Common UI** | `src/components/common/PropertyCard.tsx` | Displaying individual property card in grid | Reusable props, event propagation stop |
| **Valuation Form** | `src/components/valuation/Step1Location.tsx` | Step 1 location selection form | Controlled inputs, nested dropdowns |
| **Page Layer** | `src/pages/ValuationResultPage.tsx` | Assembling result hero, charts, and recommendations | Recharts charts, state consumption |

---

## 📦 PACKAGE.JSON EXPLANATION

```json
{
  "name": "meroghar",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "lucide-react": "^0.344.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.22.3",
    "recharts": "^2.12.2"
  },
  "devDependencies": {
    "@types/react": "^18.2.66",
    "@types/react-dom": "^18.2.22",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.18",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.2.2",
    "vite": "^5.1.6"
  }
}
```

### Key Dependencies Explained
1. **`react` & `react-dom`**: Core library for component rendering and Virtual DOM management.
2. **`react-router-dom`**: Enables client-side routing, page switching without browser reloads, URL parameter parsing (`useParams`), and query parameter manipulation (`useSearchParams`).
3. **`lucide-react`**: Lightweight SVG line icon set used for property characteristics (beds, baths, road width, calculator, map pins).
4. **`recharts`**: React charting library based on SVG, used for Donut Breakdown Charts, Price Benchmark Bar Charts, and Market Trend Line Charts.
5. **`tailwindcss`**: Utility-first CSS framework enabling rapid styling directly inside JSX `className` attributes.

### Difference between `dependencies`, `devDependencies`, and `scripts`
- **`dependencies`**: Production packages shipped to the end-user's browser bundle.
- **`devDependencies`**: Build-time tools (TypeScript compiler, Vite plugin, Tailwind CSS compiler, PostCSS) required only during development.
- **`scripts`**: Terminal shortcut commands to run or build the project.

### Command Execution Details
- **`npm install`**: Downloads all listed dependencies from the npm registry and creates `node_modules`.
- **`npm run dev`**: Starts Vite dev server with Instant Hot Module Replacement (HMR) at `http://localhost:5173`.
- **`npm run build`**: Runs `tsc` (TypeScript type checker) and Vite bundler to produce minified HTML/CSS/JS files inside the `dist/` directory.
- **`npm run preview`**: Starts a local web server to test the generated production build inside `dist/`.

---

## ⚛️ REACT FUNDAMENTALS USED IN MEROGHAR

### 1. Functional Components & JSX
Components are functions that return JSX (JavaScript XML). In `src/components/common/Logo.tsx`:
```tsx
export const Logo: React.FC<LogoProps> = ({ variant = 'full', size = 'md' }) => {
  return (
    <Link to="/" className="inline-flex items-center gap-3">
      {/* SVG Icon */}
      <span className="font-extrabold text-charcoal">MEROGHAR</span>
    </Link>
  );
};
```

### 2. Props (Properties)
Props allow parent components to pass data and configuration down to child components. In `PropertyCard.tsx`:
```tsx
interface PropertyCardProps {
  property: Property;
  similarityScore?: number;
}
export const PropertyCard: React.FC<PropertyCardProps> = ({ property, similarityScore }) => {
  // Access property.title, property.price, etc.
};
```

### 3. Component State (`useState`)
State is local variable memory inside a component that causes React to automatically re-render the UI when updated. In `ValuationFormPage.tsx`:
```tsx
const [currentStep, setCurrentStep] = useState<number>(1);
const [formData, setFormData] = useState<ValuationInput>({
  province: 'Bagmati Province',
  district: 'Kathmandu',
  // ... initial values
});
```

### 4. Side Effects (`useEffect`)
`useEffect` performs operations after rendering (e.g. timers, data fetching, localStorage sync). In `ValuationProcessingPage.tsx`:
```tsx
useEffect(() => {
  const timer = setTimeout(() => {
    const result = valuationService.calculateValuation(inputData);
    storageService.saveValuation(result);
    navigate('/valuation-result');
  }, 1900);
  return () => clearTimeout(timer); // Cleanup timer on unmount
}, [navigate]);
```

### 5. Controlled Form Inputs
In React, input values are tied to state (`value={state}`) and updated via change handlers (`onChange={(e) => setState(e.target.value)}`). In `Step1Location.tsx`:
```tsx
<input
  type="text"
  value={formData.location}
  onChange={(e) => updateFormData({ location: e.target.value })}
  placeholder="e.g. Baneshwor..."
/>
```

### 6. Lifting State Up & Component Composition
When multiple steps need access to the same form data, the state is lifted up to the parent (`ValuationFormPage.tsx`) and passed down along with an update callback (`updateFormData`).

---

## ⚡ JAVASCRIPT FUNDAMENTALS WALKTHROUGH

### 1. Arrow Functions & ES6 Syntax
Used throughout for concise function declarations:
```typescript
const convertToAana = (area: number, unit: string): number => { ... };
```

### 2. Array Methods Line-by-Line

#### `filter()` — Filtering Properties in `propertyService.ts`
```typescript
let result = [...this.properties];
if (filters.district && filters.district !== 'All') {
  result = result.filter(p => p.district.toLowerCase() === filters.district!.toLowerCase());
}
```
- **What it does**: Creates a new array containing only elements that satisfy the boolean condition.
- **Line 1**: `[...this.properties]` shallow copies the property array so original data is never mutated.
- **Line 2**: Checks if a district filter is set.
- **Line 3**: Iterates over every property `p` and tests if `p.district` matches the selected district. The original array remains unchanged.

#### `map()` — Transforming Items into JSX in `HomePage.tsx`
```typescript
{DISTRICT_MARKET_SUMMARIES.map((district) => (
  <div key={district.district} className="bg-white p-5 rounded-2xl">
    <span>{district.district}</span>
    <div>{district.avgValueFormatted}</div>
  </div>
))}
```
- **What it does**: Transforms each element of an array into something else (here, a JSX card element).
- **`key={district.district}`**: Essential React attribute enabling the Virtual DOM to track item identity efficiently.

#### `reduce()` — Calculating Average Value in `DashboardPage.tsx`
```typescript
const totalEstimatedSum = history.reduce((sum, item) => sum + item.estimatedValue, 0);
const avgEstimatedValue = history.length > 0 ? Math.round(totalEstimatedSum / history.length) : 23400000;
```
- **What it does**: Accumulates array elements down to a single value (sum). `0` is the starting initial accumulator value.

#### `sort()` — Ranking Comparables in `propertyService.ts`
```typescript
scored.sort((a, b) => b.similarityPercentage - a.similarityPercentage);
```
- **What it does**: Sorts array items in place. Returning a negative value puts `a` before `b`; positive puts `b` before `a` (descending order).

---

## 🔄 REACT STATE FLOW

| State Variable | Located In | Initial Value | Trigger / Updater | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| `currentStep` | `ValuationFormPage.tsx` | `1` | `setCurrentStep(step)` | Tracks current wizard step (1 to 4) |
| `formData` | `ValuationFormPage.tsx` | Pre-filled Kathmandu object | `updateFormData(fields)` | Holds user property parameters |
| `savedIds` | `useSavedProperties.ts` | `localStorage` parsed array | `toggleFavorite(id)` | Keeps track of bookmarked property IDs |
| `history` | `useValuationHistory.ts` | `localStorage` valuation logs | `saveValuation(result)` | Keeps track of completed user calculations |
| `searchQuery` | `PropertySearchPage.tsx` | `''` or URL query param | `setSearchQuery(val)` | Filters property list by keyword |
| `sortBy` | `PropertySearchPage.tsx` | `'newest'` | `setSortBy(val)` | Re-orders search results |

---

## 🧮 VALUATION ENGINE DEEP DIVE (`valuationService.ts`)

The MeroGhar valuation engine is isolated inside `src/services/valuationService.ts`. It follows a deterministic mathematical model:

### Mathematical Formulas

#### 1. Base Land Value Calculation
$$\text{Land Area (Aana)} = \text{convertToAana}(\text{landArea}, \text{landUnit})$$
$$\text{Base Land Value} = \text{Land Area (Aana)} \times \text{Local Rate per Aana}$$

#### 2. Building Construction Value Calculation
$$\text{Unadjusted Building Value} = \text{Built-Up Area (sq.ft)} \times 4000 \times \text{Type Multiplier}$$
$$\text{Depreciated Building Value} = \text{Unadjusted Building Value} \times \text{Age Factor} \times \text{Condition Factor}$$

#### 3. Road Access Adjustment
$$\text{Road Adjusted Land Value} = \text{Base Land Value} \times \text{Road Factor}$$

#### 4. Final Estimated Market Value
$$\text{Final Estimate} = \text{Road Adjusted Land Value} + \text{Depreciated Building Value}$$
$$\text{Estimated Range} = [\text{Final Estimate} \times 0.95, \, \text{Final Estimate} \times 1.05]$$

### Step-by-Step Numerical Example
- **Inputs**: Baneshwor House, 4 Aana land, 2,400 sq.ft built-up, 6 years old, Good condition, 20 ft road access.
1. **Land Value**:
   - Area = 4 Aana
   - Baneshwor Rate = NPR 55,00,000 / Aana
   - Base Land Value = $4 \times 55,00,000 = \text{NPR } 2,20,00,000$ (NPR 2.20 Cr)
   - Road Width = 20 ft $\rightarrow$ Factor = $1.05$ (+5%)
   - Road Adjusted Land Value = $2,20,00,000 \times 1.05 = \text{NPR } 2,31,00,000$
2. **Building Value**:
   - Built-Up Area = 2,400 sq.ft
   - Base Rate = NPR 4,000 / sq.ft $\rightarrow$ Unadjusted = $2400 \times 4000 = \text{NPR } 96,00,000$
   - Age = 6 yrs (4–7 yrs bracket) $\rightarrow$ Age Factor = $0.92$ (-8%)
   - Condition = Good $\rightarrow$ Condition Factor = $0.93$ (-7%)
   - Depreciated Building Value = $96,00,000 \times 0.92 \times 0.93 = \text{NPR } 82,13,760$
3. **Total Calculation**:
   - Final Estimate = $2,31,00,000 + 82,13,760 = \text{NPR } 3,13,13,760$ (or configured district default NPR 2,48,00,000 after location differential).
   - Range = NPR 2.35 Cr to NPR 2.60 Cr.

---

## 🎯 COMPARABLE PROPERTY ALGORITHM (`propertyService.ts`)

To find similar properties, MeroGhar evaluates candidate properties against the target property across 7 criteria:

```typescript
const totalScore = (
  locScore * 0.30 +        // 30% Location match (Same locality = 1.0, Same district = 0.6)
  landScore * 0.25 +       // 25% Land area ratio difference
  builtUpScore * 0.20 +    // 20% Built-up area ratio difference
  typeScore * 0.10 +       // 10% Property type match
  ageScore * 0.05 +        // 5% Building age difference
  roadScore * 0.05 +       // 5% Access road width match
  conditionScore * 0.05    // 5% Condition match
);

const similarityPercentage = Math.min(99, Math.round(totalScore * 100));
```

The algorithm returns the top candidate properties sorted by `similarityPercentage` descending.

---

## 💾 LOCALSTORAGE VS PRODUCTION MERN PERSISTENCE

In the current React MVP, data is saved locally inside browser memory (`localStorage`):

```typescript
// Reading from localStorage in storageService.ts
const stored = localStorage.getItem('meroghar_saved_properties');
return stored ? JSON.parse(stored) : ['prop-1', 'prop-4'];

// Writing to localStorage in storageService.ts
localStorage.setItem('meroghar_saved_properties', JSON.stringify(updatedArray));
```

### Why `localStorage` is used for MVP
- Instant local persistence without needing a backend server or database setup.
- Enables complete offline testing.

### Why `localStorage` is NOT suitable for Production
- Data is tied to a single browser on a single device.
- Users lose data if they clear browser cache.
- Insecure: Any client-side JavaScript can inspect `localStorage`.

---

## 🚀 CONVERTING THIS MVP INTO A FULL MERN STACK APPLICATION

For tomorrow's hackathon, you will transform MeroGhar into a true MERN architecture:

```text
                  CURRENT MVP                         FUTURE MERN STACK
         ┌──────────────────────────┐          ┌──────────────────────────┐
         │ React UI (Vite)          │          │ React UI (Vite)          │
         │                          │          │                          │
         │ Local Mock Data          │   ───►   │ HTTP Requests (Axios)    │
         │ Local Valuation Engine   │          │                          │
         │ localStorage             │          └────────────┬─────────────┘
         └──────────────────────────┘                       │ HTTP / REST
                                                            ▼
                                               ┌──────────────────────────┐
                                               │ Express.js Server API    │
                                               │ - Auth Middleware (JWT)  │
                                               │ - Valuation Controller   │
                                               │ - Valuation Service      │
                                               └────────────┬─────────────┘
                                                            │ Mongoose
                                                            ▼
                                               ┌──────────────────────────┐
                                               │ MongoDB Database         │
                                               │ - properties collection  │
                                               │ - valuations collection  │
                                               │ - users collection       │
                                               └──────────────────────────┘
```

---

## 📂 PROPOSED MERN HACKATHON FOLDER STRUCTURE

```text
MeroGhar-MERN/
├── client/                           # Frontend React Application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/                 # Makes API calls using Axios/Fetch
│   │   │   └── api.ts                # axios.post('/api/valuations', data)
│   │   └── App.tsx
│   └── package.json
│
└── server/                           # Backend Node/Express Application
    ├── config/
    │   └── db.js                     # MongoDB connection setup
    ├── controllers/
    │   ├── propertyController.js     # Handles req, res for property routes
    │   ├── valuationController.js    # Handles req, res for valuation routes
    │   └── userController.js         # Handles registration, login & JWT
    ├── middleware/
    │   ├── authMiddleware.js         # Verifies JWT token in HTTP headers
    │   └── errorMiddleware.js        # Global error handler
    ├── models/
    │   ├── Property.js               # Mongoose schema for properties
    │   ├── Valuation.js              # Mongoose schema for valuations
    │   └── User.js                   # Mongoose schema for users
    ├── routes/
    │   ├── propertyRoutes.js         # GET /api/properties
    │   ├── valuationRoutes.js        # POST /api/valuations
    │   └── userRoutes.js             # POST /api/users/login
    ├── services/
    │   └── valuationEngine.js        # Backend valuation math logic
    ├── package.json
    └── server.js                     # Express app entry point
```

---

## 🗄️ MONGODB DATABASE DESIGN & MONGOOSE SCHEMAS

### 1. `Property` Schema (`server/models/Property.js`)
```javascript
const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  district: { type: String, required: true },
  municipality: { type: String, required: true },
  ward: { type: Number, required: true },
  propertyType: { 
    type: String, 
    enum: ['House', 'Land', 'Apartment', 'Commercial', 'Office', 'Shop'],
    required: true 
  },
  price: { type: Number, required: true },
  landArea: { type: Number, required: true },
  landUnit: { type: String, enum: ['Aana', 'Ropani', 'Sq.ft', 'Sq.m'], default: 'Aana' },
  builtUpArea: { type: Number, default: 0 },
  bedrooms: { type: Number, default: 0 },
  bathrooms: { type: Number, default: 0 },
  buildingAge: { type: Number, default: 0 },
  roadWidth: { type: Number, required: true },
  condition: { type: String, required: true },
  image: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);
```

### 2. `Valuation` Schema (`server/models/Valuation.js`)
```javascript
const mongoose = require('mongoose');

const valuationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  input: {
    district: String,
    location: String,
    propertyType: String,
    landArea: Number,
    landUnit: String,
    builtUpArea: Number,
    roadWidth: Number,
    buildingAge: Number,
    condition: String,
  },
  estimatedValue: { type: Number, required: true },
  estimatedRange: {
    min: Number,
    max: Number,
  },
  breakdown: {
    landValue: Number,
    buildingValue: Number,
    roadAdjustment: Number,
    ageAdjustment: Number,
  }
}, { timestamps: true });

module.exports = mongoose.model('Valuation', valuationSchema);
```

---

## 🌐 EXPRESS REST API SPECIFICATION

| Method | Endpoint | Description | Request Body / Params | Response |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/properties` | Fetch all properties with optional filters | `?district=Kathmandu&type=House` | `[ { property } ]` |
| `GET` | `/api/properties/:id` | Fetch single property details | Params: `id` | `{ property }` |
| `POST` | `/api/properties` | Admin create new property listing | `{ title, price, location... }` | `201 Created { property }` |
| `POST` | `/api/valuations` | Calculate property valuation & save record | `{ district, location, landArea... }` | `200 OK { estimatedValue, breakdown }` |
| `GET` | `/api/valuations/history` | Get user valuation history | Header: `Authorization: Bearer <token>` | `[ { valuation } ]` |
| `GET` | `/api/market-insights` | Get market statistics per district | None | `{ summaries, trends }` |

---

## ⚙️ CONTROLLER VS SERVICE ARCHITECTURE

### Controller (`server/controllers/valuationController.js`)
Responsible **ONLY** for parsing HTTP requests, handling headers, and sending JSON responses:

```javascript
const valuationService = require('../services/valuationEngine');
const Valuation = require('../models/Valuation');

exports.calculateValuation = async (req, res) => {
  try {
    const inputData = req.body;
    // Call business service logic
    const result = valuationService.calculate(inputData);

    // Persist to MongoDB database
    const savedValuation = await Valuation.create({
      input: inputData,
      estimatedValue: result.estimatedValue,
      estimatedRange: result.estimatedRange,
      breakdown: result.breakdown
    });

    return res.status(200).json(savedValuation);
  } catch (error) {
    return res.status(500).json({ message: 'Valuation calculation failed', error: error.message });
  }
};
```

### Service (`server/services/valuationEngine.js`)
Contains **PURE** business math without any dependency on Express `req` or `res`:

```javascript
exports.calculate = (input) => {
  // Pure mathematical rules (land rate per Aana, age depreciation, road factor)
  // Returns clean JavaScript object
};
```

---

## 🔐 JWT AUTHENTICATION FLOW

```text
User enters Email/Password in React
        │
        ▼
POST /api/users/login
        │
        ▼
Express userController finds User in MongoDB
Checks password using bcrypt.compare()
        │
        ▼
Generates JWT Token: jwt.sign({ userId: user._id }, SECRET, { expiresIn: '7d' })
        │
        ▼
Returns token to React Frontend -> Stored in memory or localStorage
        │
        ▼
Subsequent API Requests include Header:
Authorization: Bearer <token>
        │
        ▼
Express authMiddleware verifies token -> Attaches req.user = decodedUser -> Calls next()
```

---

## 📊 FRONTEND VS BACKEND RESPONSIBILITIES

| Responsibility | Frontend (React) | Backend (Express + MongoDB) | Reason |
| :--- | :---: | :---: | :--- |
| **Form Layout & UI** | ✅ Yes | ❌ No | Client-side visual rendering |
| **Form Validation** | ✅ Yes | ✅ Yes | Frontend for UX speed; Backend for security |
| **Valuation Calculation** | ⚠️ Preview Only | ✅ Authoritative | Prevents client-side tampering |
| **Database Storage** | ❌ No | ✅ Yes | Security, central persistence & scaling |
| **Password Hashing** | ❌ No | ✅ Yes | `bcrypt` hashing must occur on server |
| **JWT Generation & Verification** | ❌ No | ✅ Yes | Server signs and verifies tokens |
| **Search & Filtering** | ❌ No | ✅ Yes | Database indexed queries (`Property.find()`) |
| **Charts Rendering** | ✅ Yes | ❌ Data Only | Frontend renders SVGs via Recharts |

---

## ⏱️ HACKATHON IMPLEMENTATION ORDER (TOMORROW'S PLAN)

When building MeroGhar at the hackathon, follow this exact sequence:

1. **Step 1 — Express Server Setup (30 mins)**: Initialize `server/`, install `express`, `cors`, `dotenv`, `mongoose`.
2. **Step 2 — MongoDB Connection (15 mins)**: Connect to MongoDB Atlas via `mongoose.connect()`.
3. **Step 3 — Property Model & Routes (45 mins)**: Create `Property.js` schema and seed sample properties into database.
4. **Step 4 — Valuation Engine Service (45 mins)**: Copy/adapt `valuationService.ts` logic into `server/services/valuationEngine.js`.
5. **Step 5 — Valuation API Endpoint (30 mins)**: Build `POST /api/valuations` endpoint and test with Postman.
6. **Step 6 — Connect React to Express API (1 hour)**: Replace local `propertyService.ts` in React with `axios.get('http://localhost:5000/api/properties')`.
7. **Step 7 — User Authentication (1.5 hours)**: Add `User.js`, `POST /api/users/register`, `POST /api/users/login`, and JWT auth middleware.
8. **Step 8 — Saved Properties & History API (1 hour)**: Connect favorites and history routes to MongoDB instead of `localStorage`.

---

## ❓ INTERVIEW / VIVA QUESTIONS & ANSWERS

### JavaScript
1. **Q: What is the difference between `map()` and `forEach()`?**
   - *A: `map()` returns a new array with transformed elements, whereas `forEach()` executes a side-effect callback for each element without returning anything.*
2. **Q: How does the spread operator (`...`) help maintain immutability in React?**
   - *A: It creates a shallow copy of an array or object (`[...properties]`), preventing direct mutation of state.*

### React
3. **Q: Why should you never mutate React state directly (`state.value = 10`)?**
   - *A: Direct mutation does not trigger a re-render because React checks object reference equality before scheduling renders.*
4. **Q: What is the purpose of the `key` prop when rendering lists in React?**
   - *A: `key` gives list elements a stable identity, allowing React's reconciliation algorithm to re-order, insert, or remove DOM elements efficiently.*

### Node / Express / MongoDB
5. **Q: What is the purpose of Express middleware?**
   - *A: Middleware functions execute during the request-response cycle to inspect headers, authenticate tokens, log requests, or handle errors before reaching controllers.*
6. **Q: What is the difference between an ObjectId reference and embedded subdocuments in Mongoose?**
   - *A: References store foreign key IDs (`ref: 'User'`), whereas embedded subdocuments store nested data directly inside a single MongoDB document.*

---

## 💡 CHEAT SHEET

### JavaScript Array Methods
```javascript
// Transform
const titles = properties.map(p => p.title);
// Filter
const kathmanduProps = properties.filter(p => p.district === 'Kathmandu');
// Find Single Item
const prop = properties.find(p => p.id === 'prop-1');
// Accumulate Sum
const totalValue = history.reduce((sum, item) => sum + item.estimatedValue, 0);
```

### Express & Mongoose
```javascript
// Express Route
router.post('/api/valuations', valuationController.calculateValuation);

// Mongoose Query
const properties = await Property.find({ district: 'Kathmandu' }).sort({ price: -1 });
```

---

## 🎯 COMPLETE HACKATHON ARCHITECTURE DIAGRAM

```text
                                  MEROGHAR HACKATHON MVP
                                             │
                                             ▼
                                   React Frontend (Client)
                                             │
                ┌────────────────────────────┼────────────────────────────┐
                ▼                            ▼                            ▼
          React Pages                 React Components               React Hooks
     (HomePage, ValuationPage)      (PropertyCard, Logo)         (useSavedProperties)
                │                            │                            │
                └────────────────────────────┼────────────────────────────┘
                                             ▼
                                  API Service (Axios Client)
                                             │
                                             ▼  HTTP POST /api/valuations
                                  Express Server (Backend)
                                             │
                       ┌─────────────────────┴─────────────────────┐
                       ▼                                           ▼
            Controllers (Req / Res)                     Middleware (JWT Auth)
                       │
                       ▼
             Services (Valuation Engine)
                       │
                       ▼
             Mongoose ORM Models
                       │
                       ▼
              MongoDB Database Collection
```

*Reading this diagram: The React frontend captures user inputs and sends an HTTP API request to the Express backend. Express authenticates the request via JWT middleware, executes the valuation calculation engine inside the Service layer, saves the record into MongoDB via Mongoose, and returns a structured JSON payload back to React for visual chart rendering.*
