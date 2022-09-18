export type MailAddress = string;

export type MailTypes = 'CONFIRM_REGISTRY' | 'ACCOUNT_CLOSED';

export type BaseMailProps = {
  type: MailTypes;
  to: MailAddress;
  subject: string;
};
