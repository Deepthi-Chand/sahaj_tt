export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'OPTIONS' | 'HEAD' | 'DELETE';

export interface Link {
  href: string;
  method?: HttpMethod;
  type?: string;
  accept?: string;
};
