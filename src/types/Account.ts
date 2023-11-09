export type Account = {
  id: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: number;
  rememberMe: boolean;
  accessToken: string;
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
  roleIds: string[];
};

export type AccountListUser = {
  data: AccountList[];
};

export type Role = {
  id: string;
  name: string;
  permissionSetIds: string;
  userIds: string;
};
export type RoleList = {
  data: Role[];
};
