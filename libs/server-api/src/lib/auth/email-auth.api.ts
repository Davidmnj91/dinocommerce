export type EmailAuthApi = {
  login: (body: EmailLoginRequest, req?: unknown, res?: unknown) => Promise<string>;
  logout: (req?: unknown, res?: unknown) => Promise<void>;
  register: (body: EmailRegisterRequest, req?: unknown, res?: unknown) => Promise<void>;
};

export type EmailLoginRequest = {
  email: string;
  password: string;
  admin?: boolean;
};

export type EmailRegisterRequest = {
  email: string;
  password: string;
  username: string;
};
