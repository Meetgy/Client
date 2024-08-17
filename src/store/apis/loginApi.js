import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const loginApi = createApi({
    reducerPath: "login",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000"
    }),
    endpoints: (builder) => {
        return {
            signup: builder.mutation({
                query: (data) => {
                    return {
                        url: '/user/signup',
                        method: "POST",
                        body: data,
                    }
                }
            }),
            login: builder.mutation({
                query: (data) => {
                    return {
                        url: '/user/login',
                        method: "POST",
                        body: data,
                    }
                }
            })
        }
    }
})

export { loginApi };
export const { useSignupMutation, useLoginMutation } = loginApi;