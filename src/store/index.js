import { configureStore } from "@reduxjs/toolkit";
import { connectionsApi } from "./apis/connectionsApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { loginApi } from "./apis/loginApi";
import { messagesReducer } from "./slices/messageSlice";
import { getChatUsers } from "./apis/getChatUsers";

export const store = configureStore({
    reducer: {
        messagesSlice: messagesReducer,
        [loginApi.reducerPath]: loginApi.reducer,
        [connectionsApi.reducerPath]: connectionsApi.reducer,
        [getChatUsers.reducerPath]: getChatUsers.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(loginApi.middleware)
            .concat(connectionsApi.middleware)
            .concat(getChatUsers.middleware)
    }
})

setupListeners(store.dispatch);

export { useSignupMutation, useLoginMutation } from "./apis/loginApi"
export { useFetchUsersQuery } from "./apis/connectionsApi"
export { useGetChatUsersQuery } from "./apis/getChatUsers"
export {
    oldMessages,
    addMessages,
    updateMessageState
} from "./slices/messageSlice"