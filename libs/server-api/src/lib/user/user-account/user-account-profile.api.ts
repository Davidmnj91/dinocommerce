export type UserProfileApi = {
  getProfile: (req?: unknown) => Promise<UserProfileResponse>;
};

export type UserProfileResponse = {
  username: string;
  email: string;
  phone: string;
  profilePictureUrl?: string;
};
