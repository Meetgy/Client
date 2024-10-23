import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the API slice
const connectionsApi = createApi({
    reducerPath: 'connections', // Unique key for the slice
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000"
    }), // Base URL for API requests
    endpoints: (builder) => {
        return {
            fetchUsers: builder.query({
                query: () => {
                    return {
                        url: '/user/connections',
                        method: 'GET'
                    }
                }
            })
        }
    }
})

export { connectionsApi };
export const { useFetchUsersQuery } = connectionsApi;