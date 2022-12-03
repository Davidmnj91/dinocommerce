export type OperatorEmailAuthApi = {
  login: (body: OperatorEmailLoginRequest, req?: unknown, res?: unknown) => Promise<string>;
  logout: (req?: unknown, res?: unknown) => Promise<void>;
  register: (body: OperatorEmailRegisterRequest, req?: unknown, res?: unknown) => Promise<void>;
};

export type OperatorEmailLoginRequest = {
  email: string;
  password: string;
};

export type OperatorEmailRegisterRequest = {
  name: string;
  lastName: string;
  dateOfBirth: Date;
  email: string;
  phone: string;
  password: string;
  groupIds?: string[];
  isSuperUser?: boolean;
};
