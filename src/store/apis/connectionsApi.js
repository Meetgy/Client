import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const connectionsApi = createApi({
    reducerPath: 'connections',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000"
    }),
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