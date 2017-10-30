import * as Promise from "bluebird";
import { httpMethods, DEFAULT_REQUEST_INIT, BASE_URL } from "./defaults";
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'OPTIONS' | 'HEAD' | 'DELETE';

export interface Link {
  href: string;
  method?: HttpMethod;
  type?: string;
  accept?: string;
};

const fetchHandled = (url: string, overrides?: RequestInit) => Promise.resolve(fetch(url, { ...DEFAULT_REQUEST_INIT, ...overrides }));
const getJson = <T>(promise: Promise<Response>): Promise<T> => promise.then(response => response.json().then(json => <T>json));

const getRequestInit = (link: Link, entity?: any, headers?: Headers): RequestInit => {
  const method = link.method || httpMethods.get;
  headers = headers || new Headers();
  if (link.accept != undefined) headers.set('Accept', link.accept);
  if (link.type != undefined) headers.set('Content-Type', link.type);
  const body = entity == undefined ? undefined : JSON.stringify(entity);
  return { method, headers, body };
};

interface FetchLink {
  (link: Link, entity?: any, headers?: Headers): Promise<Response>;
}
interface FetchLinkAs {
  <T>(link: Link, entity?: any, headers?: Headers): Promise<T>;
}

export interface Fetch {
  fetchLink: FetchLink;
  fetchLinkAs: FetchLinkAs;
}

export const getFetch = (baseUri: string): Fetch => {
  const getRequestUri = (link: Link): string =>
    link.href.indexOf('/') === 0 ? `${baseUri}${link.href}` : link.href;
  const fetchLink = (link: Link, entity?: any, headers?: Headers) =>
    fetchHandled(getRequestUri(link), getRequestInit(link, entity, headers));
  const fetchLinkAs = <T>(link: Link, entity?: any, headers?: Headers) =>
    fetchLink(link, entity, headers).then(response => response.json().then(x => x as T));
  return {
    fetchLink,
    fetchLinkAs
  };
};
