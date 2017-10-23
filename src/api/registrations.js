import { get } from 'axios';
import type { Registration } from './declarations/registration';

const mockFetch = () =>
  get('/api/registrations.json')
    .then(response => response.data);

const fetch = () =>
  get('https://api.whatever.com/registrations.json')
    .then(response => response.data);

export const registrations = {
  fetch: mockFetch
};
