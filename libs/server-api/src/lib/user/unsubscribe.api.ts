export type UserUnsubscribeApi = {
  unsubscribe: (req?: unknown) => Promise<UserUnsubscribeResponse>;
};

export type UserUnsubscribeResponse = void;
