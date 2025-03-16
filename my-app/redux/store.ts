import { configureStore, combineReducers } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from "redux-persist";
import authReducer from "./reducers/auth.reducer";
import mainReducers from "./reducers/main.reducers";
import chatReducers from "./reducers/chat.reducers";

const Reducers = combineReducers({
  auth: authReducer,
  main: mainReducers,
  chat: chatReducers,
});

const PersistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["main", "auth", "chat"],
};

const persistedReducers = persistReducer(PersistConfig, Reducers);

const isDevelopment = process.env.NODE_ENV === "development";

const store = configureStore({
  reducer: persistedReducers,
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: isDevelopment ? { warnAfter: 994 } : false,
    });
    return middlewares;
  },
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export { store, persistor };
