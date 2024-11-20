import { configureStore } from "@reduxjs/toolkit";
import { FLUSH, PAUSE, PURGE, REGISTER, REHYDRATE, persistStore } from "redux-persist"
import reduxStorage from "./storage/storage";
import persistReducer from "redux-persist/es/persistReducer";
import rootReducer from "./rootReducer";


const persistConfig = {
    key: "root",
    storage: reduxStorage,
    blacklist: [],
    whiteList: ['user', 'cart'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REGISTER, REHYDRATE, PAUSE, PURGE],
            },
        }),
});

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;