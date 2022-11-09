import { ISendMailOptions } from '@nestjs-modules/mailer';
import { BaseMailProps, MailAddress } from './base.mail';

export type ContactUsEmailData = BaseMailProps & {
  type: 'CONTACT_US';
  cc: MailAddress;
  context: {
    name: string;
    body: string;
  };
};

export type ContactUsMailProps = {
  to: MailAddress;
  cc: MailAddress;
  name: string;
  subject: string;
  body: string;
};

export const buildContactUsMailData = (props: ContactUsMailProps): ContactUsEmailData => ({
  type: 'CONTACT_US',
  cc: props.cc,
  subject: props.subject,
  to: props.to,
  context: {
    name: props.name,
    body: props.body,
  },
});

export const buildContactUsMail = (props: Omit<ContactUsEmailData, 'template'>): ISendMailOptions => ({
  to: props.to,
  cc: props.cc,
  subject: props.subject,
  template: 'contact-us',
  context: props.context,
});
