import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AccountList, AccountListUser, Role, RoleList } from "../types/Account";

// Define a service using a base URL and expected endpoints
export const accountListApi = createApi({
  reducerPath: "accountListApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.100.60:56367/api/Account",
  }),
  endpoints: (builder) => ({
    getAccountList: builder.query<AccountListUser, void>({
      query: () => ({
        url: "/User",
      }),
    }),
    getAccountById: builder.query<AccountList, void>({
      query: (idAccount) => ({
        url: `/User/${idAccount}`,
      }),
    }),
    getRoleById: builder.query<Role, string>({
      query: (roleId) => ({
        url: `/Role/${roleId}`,
      }),
    }),
    getRole: builder.query<RoleList, string>({
      query: () => ({
        url: "/Role",
      }),
    }),
    deleteAccount: builder.mutation<object, string>({
      query: (deleteId) => ({
        url: `/User/${deleteId}`,
        method: "DELETE",
      }),
    }),
    editPhoneNumber: builder.mutation<
      AccountList,
      { phoneNumber: string; idEdit: string }
    >({
      query: ({ phoneNumber, idEdit }) => ({
        url: `/User/UpdatePhoneNumber?phoneNumber=${phoneNumber}&id=${idEdit}`,
        method: "PUT",
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAccountListQuery,
  useGetAccountByIdQuery,
  useGetRoleByIdQuery,
  useDeleteAccountMutation,
  useGetRoleQuery,
  useEditPhoneNumberMutation,
} = accountListApi;
