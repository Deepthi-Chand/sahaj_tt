import { getFetch } from './fetch';
import { createMatches } from './matches';
import { createRegistrations } from './registrations';
import { API_URL } from 'globals';

const createApi = (baseUri: string) => {
  const fetch = getFetch(baseUri);
  return  {
    matches: createMatches(fetch),
    registrations: createRegistrations(fetch)
  };
};

export { User } from './users';
export { Match } from './matches';
export { Registration } from './registrations';

export const {
  matches,
  registrations
} = createApi(API_URL);
