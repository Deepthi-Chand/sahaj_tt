import { registrations } from '../../api';
import Registration from '../../declarations/registration';

export const GET_REGISTRATIONS = '@@user/GET_REGISTRATIONS';
export const LOCAL_STORAGE_KEY:string = 'redux:registrations';

export const getRegistrations = async () => {
  const storedRegistrations = localStorage.getItem(LOCAL_STORAGE_KEY);
  const registrations = await
    !!storedRegistrations
      ? Promise.resolve(JSON.parse(storedRegistrations))
      : registrations.fetch();
  return registrations;
};
