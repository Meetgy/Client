import { configureStore } from "@reduxjs/toolkit";
import { connectionsApi } from "./apis/connectionsApi";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer:{
        [connectionsApi.reducerPath]: connectionsApi.reducer,        
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
                .concat(connectionsApi.middleware)
    }
})

setupListeners(store.dispatch);

export { useFetchUsersQuery } from "./apis/connectionsApi"