import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:8000",
    prepareHeaders: (headers, { getState }) => {
        let token = getState().auth.token; // First, try getting the token from Redux state
    
        if (!token) {
          token = localStorage.getItem('token'); // Fallback to localStorage
        }
    
        if (token) {
          headers.set('authorization', `Bearer ${token}`);
        }
    
        return headers;
    },
})

const getChatUsersApi = createApi({
    reducerPath: 'getChatUsers', // Unique key for the slice
    baseQuery,
    endpoints: (builder) => {
        return {
            getChatUsers: builder.query({
                query: () => {
                    return {
                        url: '/chat/history/all',
                        method: 'GET'
                    }
                }
            })
        }
    }
})
export { getChatUsersApi };
export const { useGetChatUsersQuery } = getChatUsersApi;