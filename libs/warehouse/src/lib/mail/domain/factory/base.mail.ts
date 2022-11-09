export type MailAddress = string;

export type MailTypes = 'CONFIRM_REGISTRY' | 'ACCOUNT_CLOSED' | 'CONTACT_US';

export type BaseMailProps = {
  type: MailTypes;
  to: MailAddress;
  subject: string;
};
