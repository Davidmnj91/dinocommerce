export type UserEmailAuthApi = {
  login: (body: UserEmailLoginRequest, req?: unknown, res?: unknown) => Promise<string>;
  logout: (req?: unknown, res?: unknown) => Promise<void>;
  register: (body: UserEmailRegisterRequest, req?: unknown, res?: unknown) => Promise<void>;
};

export type UserEmailLoginRequest = {
  email: string;
  password: string;
};

export type UserEmailRegisterRequest = {
  username: string;
  email: string;
  password: string;
};
