import axios from 'axios';
import type { Registration } from './declarations/registration';

export const fetchRegistrations = (): Promise<List<Registration>> =>
  axios.get('/api/registrations.json').then(response => response.data);
