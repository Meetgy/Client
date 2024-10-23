import { configureStore } from "@reduxjs/toolkit";
import { connectionsApi } from "./apis/connectionsApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { loginApi } from "./apis/loginApi";
import { messageReducer } from "./slices/messageSlice";

export const store = configureStore({
    reducer: {
        messagesSlice: messageReducer,
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
export { useSignupMutation, useLoginMutation } from "./apis/loginApi"
export {
    oldMessages,
    addMessages,
    updateMessageState
} from "./slices/messageSlice"