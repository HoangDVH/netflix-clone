import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Account } from "../types/Account";
// Define a service using a base URL and expected endpoints
export const loginApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.100.60:61949/api/Account/Auth/Login",
  }),
  endpoints: (build) => ({
    loginAccount: build.mutation<Account, string>({
      query: (body) => ({
        url: "",
        method: "POST",
        mode:'cors',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginAccountMutation } = loginApi;
