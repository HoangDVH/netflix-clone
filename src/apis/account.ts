import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Account } from "../types/Account";
// Define a service using a base URL and expected endpoints
export const accountApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.100.60:56367/api/Account",
  }),
  endpoints: (build) => ({
    addAccount: build.mutation<Account[], string>({
      query(body) {
        return { url: "User/Register", method: "POST", body };
      },
    }),
   
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useAddAccountMutation } = accountApi;
