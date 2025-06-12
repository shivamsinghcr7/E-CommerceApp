import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./api/apiSlice.js";
import authReducer from "./features/auth/authSlice.js";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
setupListeners(store.dispatch);
export default store;

/* NOTES:
 - This code sets up a Redux store that works with RTK Query to handle API calls in a clean, efficient way.
 - configureStore = This helps us **create a Redux store** with less boilerplate.
 - setupListeners = Enables automatic refetching of data when the user reconnects to the internet or refocuses the window.
 - Use apiSlice.reducer to manage data from the API.
 - reducerPath is usually 'api' like [ api: apiSlice.reducer 
 - middleware:
    - This adds **extra functionality** (middleware) for things like:
    - **Caching**
    - **Automatic data fetching**
    - **Handling API errors**
 - setupListeners(store.dispatch)
    - This sets up **automatic refetching** behavior like:
        - Refetch data when the browser window regains focus
        - Or when the user reconnects to the internet


📌 Summary in Simple Words:
    You're creating a Redux store that:
        Uses RTK Query to fetch API data
        Automatically handles caching, loading, and errors
        Supports features like auto-refetch on reconnect
        Is ready to be used in your React app

🧩 Component Breakdown
    apiSlice
    └── You define endpoints (like getUsers, getProducts) in here.

    apiSlice.reducer
    └── Keeps track of the cache and status of those API requests.

    apiSlice.middleware
    └── Handles API calls, caching, invalidation, and retries.

✅ Real Example of Data Flow:
    You dispatch apiSlice.endpoints.getUsers.initiate()
    ⬇️
    RTK Query sends an API request
    ⬇️
    apiSlice.reducer stores the result in Redux state
    ⬇️
    Your component reads the data from Redux via a hook like useGetUsersQuery()
    ⬇️
    If user switches tabs and comes back — setupListeners() triggers a refetch.
*/

/*

React App
   │
   ▼
<Provider store={store}>  ←←←←←←←←←←←←←←←←←←←←←←←←←←←←
   │                                                  │
   ▼                                                  │
Redux Store (created by configureStore)              │
   │                                                  │
   ├── reducer                                        │
   │    └── [apiSlice.reducerPath]: apiSlice.reducer  │
   │                                                  │
   ├── middleware                                     │
   │    └── defaultMiddleware + apiSlice.middleware   │
   │                                                  │
   └── devTools: true                                 │
   │
   ▼
setupListeners(store.dispatch)
   └── Adds auto-refetch on:
         ├─ tab focus
         └─ internet reconnect


*/
