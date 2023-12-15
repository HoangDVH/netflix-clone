import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AccountList,
  AccountListUser,
  CurrentUser,
  Permission,
  PermissionList,
  PermissionSet,
  PermissionSetList,
  Role,
  RoleEditList,
  RoleList,
} from "../types/Account";

// Define a service using a base URL and expected endpoints
export const accountListApi = createApi({
  reducerPath: "accountListApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.100.60:56367/api/Account",
  }),
  endpoints: (builder) => ({
    getAccountList: builder.query<AccountListUser, void>({
      query: () => ({
        url: "/User?IsDeep=true",
      }),
    }),
    getAccountById: builder.query<AccountList, void>({
      query: (idAccount) => ({
        url: `/User/${idAccount}`,
      }),
    }),
    getCurrentUser: builder.query<CurrentUser, { accessToken: string }>({
      query: ({ accessToken }) => {
        return {
          url: "/User/GetCurrentUser?isDeep=true",
          headers: {
            Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
            accept: "text/plain",
          },
        };
      },
    }),

    getRoleById: builder.query<Role, string>({
      query: (roleId) => ({
        url: `/Role/${roleId}?isDeep=true`,
      }),
    }),
    getUserById: builder.query<AccountList, string>({
      query: (idView) => ({
        url: `/User/${idView}?isDeep=true`,
      }),
    }),
    getRole: builder.query<RoleList, string>({
      query: () => ({
        url: "/Role?IsDeep=true",
      }),
    }),
    searchRoleByName: builder.query<RoleList, string>({
      query: (name) => ({
        url: `/Role?Keyword=${name}&IsDeep=true`,
      }),
    }),
    searchPermissionByName: builder.query<PermissionList, string>({
      query: (name) => ({
        url: `/Permission?Keyword=${name}&IsDeep=true`,
      }),
    }),
    searchUserByName: builder.query<AccountListUser, string>({
      query: (name) => ({
        url: `/User?Keyword=${name}&IsDeep=true`,
      }),
    }),

    deleteAccount: builder.mutation<object, string>({
      query: (deleteId) => ({
        url: `/User/${deleteId}`,
        method: "DELETE",
      }),
    }),
    deleteRole: builder.mutation<object, string>({
      query: (deleteId) => ({
        url: `/Role/${deleteId}`,
        method: "DELETE",
      }),
    }),
    deletePermission: builder.mutation<object, string>({
      query: (deleteId) => ({
        url: `/Permission/${deleteId}`,
        method: "DELETE",
      }),
    }),
    deletePermissionSet: builder.mutation<object, string>({
      query: (deleteId) => ({
        url: `/PermissionSet/${deleteId}`,
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
    editUser: builder.mutation<
      AccountList,
      { idEdit: string; body: AccountList }
    >({
      query: ({ idEdit, body }) => ({
        url: `/User/${idEdit}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }),
    }),
    editRole: builder.mutation<
      RoleList,
      { idRole: string; body: RoleEditList }
    >({
      query: ({ idRole, body }) => ({
        url: `/Role/${idRole}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }),
    }),
    editPermission: builder.mutation<
      PermissionList,
      { idPer: string; body: PermissionList }
    >({
      query: ({ idPer, body }) => ({
        url: `/Permission/${idPer}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }),
    }),

    editPermissionSet: builder.mutation<
      PermissionSetList,
      { idPer: string; body: PermissionSetList }
    >({
      query: ({ idPer, body }) => ({
        url: `/PermissionSet/${idPer}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }),
    }),

    createNewUser: builder.mutation<AccountListUser, void>({
      query: (body) => ({
        url: "/User",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }),
    }),
    getByEmail: builder.query<AccountList, { email: string }>({
      query: ({ email }) => ({
        url: `/User/GetByEmail?email=${email}`,
      }),
    }),
    getPermissionSet: builder.query<PermissionSetList, string>({
      query: () => ({
        url: "/PermissionSet?IsDeep=true",
      }),
    }),
    getPermissionSetById: builder.query<PermissionSet, string>({
      query: (idPermission) => ({
        url: `/PermissionSet/${idPermission}?isDeep=true`,
      }),
    }),
    getPermission: builder.query<PermissionList, string>({
      query: () => ({
        url: "/Permission",
      }),
    }),
    getPermissionByUser: builder.query<string[], { id: string }>({
      query: ({ id }) => ({
        url: `/User/GetAllPermissions?userId=${id}`,
      }),
    }),
    getPermissionById: builder.query<Permission, string>({
      query: (idPer) => ({
        url: `/Permission/${idPer}?isDeep=true`,
      }),
    }),
    creaeNewPermission: builder.mutation<PermissionList, string>({
      query: (body) => ({
        url: "/Permission",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }),
    }),
    creaeNewPermissionSet: builder.mutation<PermissionSetList, string>({
      query: (body) => ({
        url: "/PermissionSet",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }),
    }),
    createNewRole: builder.mutation<PermissionSetList, void>({
      query: (body) => ({
        url: "/Role",
        method: "POST",
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
export const {
  useGetAccountListQuery,
  useGetAccountByIdQuery,
  useGetRoleByIdQuery,
  useDeleteAccountMutation,
  useGetRoleQuery,
  useEditPhoneNumberMutation,
  useCreateNewUserMutation,
  useGetByEmailQuery,
  useGetPermissionSetQuery,
  useCreateNewRoleMutation,
  useEditUserMutation,
  useDeleteRoleMutation,
  useEditRoleMutation,
  useGetPermissionQuery,
  useCreaeNewPermissionMutation,
  useGetPermissionByIdQuery,
  useDeletePermissionMutation,
  useEditPermissionMutation,
  useCreaeNewPermissionSetMutation,
  useDeletePermissionSetMutation,
  useGetPermissionSetByIdQuery,
  useEditPermissionSetMutation,
  useSearchRoleByNameQuery,
  useSearchPermissionByNameQuery,
  useGetCurrentUserQuery,
  useGetPermissionByUserQuery,
  useGetUserByIdQuery,
  useSearchUserByNameQuery,
} = accountListApi;
