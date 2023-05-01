export type SocialMedia = {
  socialID: string;
  name?: string;
  logo: string[];
  link: string;
};

export interface Card {
  id: string;
  img: string;
  title: string;
  name: string;
  details: string;
  social: SocialMedia[]
}