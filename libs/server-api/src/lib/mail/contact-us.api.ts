export type ContactUsApi = {
  contactUs: (body: ContactUsRequest) => Promise<ContactUsResponse>;
};

export type ContactUsRequest = {
  clientEmail: string;
  clientName: string;
  messageTitle: string;
  messageBody: string;
};

export type ContactUsResponse = void;
