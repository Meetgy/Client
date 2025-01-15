import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the API slice
const getChatUsersApi = createApi({
    reducerPath: 'getChatUsers', // Unique key for the slice
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000"
    }), // Base URL for API requests
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