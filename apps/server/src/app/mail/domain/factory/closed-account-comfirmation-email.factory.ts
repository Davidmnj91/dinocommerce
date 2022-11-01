import { ISendMailOptions } from '@nestjs-modules/mailer';
import { BaseMailProps, MailAddress } from './base.mail';

export type AccountClosedEmailData = BaseMailProps & {
  type: 'ACCOUNT_CLOSED';
  context: {
    username: string;
  };
};

export type AccountClosedMailProps = {
  to: MailAddress;
  username: string;
};

export const buildAccountClosedMailData = (props: AccountClosedMailProps): AccountClosedEmailData => ({
  type: 'ACCOUNT_CLOSED',
  subject: 'Sad you leave Dinocommerce',
  to: props.to,
  context: {
    username: props.username,
  },
});

export const buildAccountClosedMail = (props: Omit<AccountClosedEmailData, 'template'>): ISendMailOptions => ({
  to: props.to,
  subject: props.subject,
  template: 'account-closed-confirmation',
  context: props.context,
});
