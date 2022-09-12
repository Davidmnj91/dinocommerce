export type MailAddress = string;

export type MailTypes = 'CONFIRM_REGISTRY';

export type BaseMailProps = {
  type: MailTypes;
  to: MailAddress;
  subject: string;
};
