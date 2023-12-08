export type Account = {
  id: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  rememberMe: boolean;
  accessToken: string;
};

export type Register = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
};

export type AccountList = {
  id: string;
  accessFailedCount: number;
  concurrencyStamp: string | null;
  email: string;
  emailConfirmed: boolean;
  lockoutEnabled: boolean;
  lockoutEnd: string | null;
  normalizedEmail: string | null;
  normalizedUserName: string | null;
  passwordHash: string;
  phoneNumber: string | null;
  phoneNumberConfirmed: boolean;
  securityStamp: string | null;
  twoFactorEnabled: boolean;
  userName: string;
  roles: string[];
};

export type AccountListUser = {
  data: AccountList[];
};

export type Role = {
  id: string;
  name: string;
  permissionSets: string;
  userIds: string;
};
export type RoleList = {
  data: Role[];
};

export type RoleEdit = {
  id: string;
  name: string;
  permissionSetIds: string;
  userIds: string;
};
export type RoleEditList = {
  data: Role[];
};

export type PermissionSet = {
  id: string;
  name: string;
  description: string;
  sort: number;
  permissions: string[];
  roleIdList: string[];
};
export type PermissionSetList = {
  data: PermissionSet[];
};

export type Permission = {
  id: string;
  name: string;

  sort: number;
  permissionSetIdList: string[];
};
export type PermissionList = {
  data: Permission[];
};

export type CurrentUser = {
  id: string;
  accessFailedCount: number;
  concurrencyStamp: string;
  email: string;
  emailConfirmed: boolean;
  lockoutEnabled: boolean;
  lockoutEnd: string;
  normalizedEmail: string;
  normalizedUserName: string;
  passwordHash: string;
  phoneNumber: string;
  phoneNumberConfirmed: boolean;
  securityStamp: string;
  twoFactorEnabled: boolean;
  userName: string;
  refreshToken: string;
  roles: Role[];
};

export type Error = {
  message: string;
};
export type ErrorList = {
  data: Error[];
};
