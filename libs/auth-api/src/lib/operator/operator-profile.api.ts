export type OperatorProfileApi = {
  getProfile: (req?: unknown) => Promise<OperatorProfileResponse>;
};

export type OperatorProfileResponse = {
  name: string;
  lastName: string;
  dateOfBirth: Date;
  email: string;
  phone: string;
  profilePictureUrl?: string;
};
