import * as Promise from "bluebird";
import { httpMethods, DEFAULT_REQUEST_INIT, BASE_URL } from "./defaults";
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'OPTIONS' | 'HEAD' | 'DELETE';

export interface Link {
  href: string;
  method?: HttpMethod;
  type?: string;
  base_url?: string;
};

const fetchHandled = (url: string, overrides?: RequestInit) => Promise.resolve(fetch(url, { ...DEFAULT_REQUEST_INIT, ...overrides }));
const getJson = <T>(promise: Promise<Response>): Promise<T> => promise.then(response => response.json().then(json => <T>json));

const getRequestInit = (link: Link, entity?: any, headers?: Headers): RequestInit => {
  const method = link.method || httpMethods.get;
  headers = headers || new Headers();
  if (link.type != undefined) headers.set('Content-Type', link.type);
  const body = entity == undefined ? undefined : JSON.stringify(entity);
  return { method, headers, body };
};

export const fetchJson = <T>(url: string, overrides?: RequestInit) => getJson<T>(fetchHandled(url, overrides));
const getRequestUri = (link: Link): string => link.href.indexOf('/') === 0 ? `${link.base_url ? link.base_url : BASE_URL}${link.href}` : link.href;
export const fetchLinkAs = <T>(link: Link, entity?: any, headers?: Headers) => fetchJson<T>(getRequestUri(link), getRequestInit(link, entity, headers));
