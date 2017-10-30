import { getFetch } from './fetch';
import { createMatches, MatchesApi } from './matches';
import { createRegistrations, RegistrationsApi } from './registrations';

export interface Api {
  matches: MatchesApi;
  registrations: RegistrationsApi;
}

export const createApi = (baseUri: string): Api => {
  const fetch = getFetch(baseUri);
  return  {
    matches: createMatches(fetch),
    registrations: createRegistrations(fetch)
  };
};

export { User } from './users';
export { Match } from './matches';
export { Registration } from './registrations';
