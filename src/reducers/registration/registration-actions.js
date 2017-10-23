import fetchRegistrations from '../../api/registration'
import Registration from '../../declarations/registration';

export const GET_REGISTRATIONS = '@@user/GET_REGISTRATIONS';
export const LOCAL_STORAGE_KEY:string = 'redux:registrations';

export const getRegistrations = (): ?List<Registration> => {
  const storedRegistrations = localStorage.getItem(LOCAL_STORAGE_KEY);
  let registrations: ?List<Registration>;

  if (storedRegistrations) {
    registrations = JSON.parse(storedRegistrations);
  } else {
    registrations = [];
  }

  return registrations;
};
