import { ISendMailOptions } from '@nestjs-modules/mailer';
import { BaseMailProps, MailAddress } from './base.mail';

export type RegistryEmailData = BaseMailProps & {
  type: 'CONFIRM_REGISTRY';
  context: {
    username: string;
  };
};

export type RegistryMailProps = {
  to: MailAddress;
  username: string;
};

export const buildRegistryMailData = (props: RegistryMailProps): RegistryEmailData => ({
  type: 'CONFIRM_REGISTRY',
  subject: 'Welcome to Dinocommerce',
  to: props.to,
  context: {
    username: props.username,
  },
});

export const buildRegistryMail = (props: Omit<RegistryEmailData, 'template'>): ISendMailOptions => ({
  to: props.to,
  subject: props.subject,
  template: 'registry-confirmation',
  context: props.context,
});
