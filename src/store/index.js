import { configureStore } from "@reduxjs/toolkit";
import { connectionsApi } from "./apis/connectionsApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { loginApi } from "./apis/loginApi";

export const store = configureStore({
    reducer:{
        [connectionsApi.reducerPath]: connectionsApi.reducer,        
        [loginApi.reducerPath]: loginApi.reducer,        
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
                .concat(connectionsApi.middleware)
                .concat(loginApi.middleware)
    }
})

setupListeners(store.dispatch);

export { useFetchUsersQuery } from "./apis/connectionsApi"
export { useSignupMutation } from "./apis/loginApi"