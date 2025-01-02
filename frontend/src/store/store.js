// import { configureStore } from "@reduxjs/toolkit"
// import userReducer from "./userSlice"
// import productReducer from "./productsSlice"
// import cartSlice from "./cartSlice"

// const store=configureStore({
//     reducer:{
//         user:userReducer,
//         product:productReducer,
//         cart:cartSlice
//     }
// })

// export default store
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import productReducer from "./productsSlice";
import cartSlice from "./cartSlice";

const persistConfig = {
    key: "root",
    storage,
};

const rootReducer = combineReducers({
    user: userReducer,
    product: productReducer,
    cart: cartSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
            },
        }),
});

const persistor = persistStore(store);

export { store, persistor };
