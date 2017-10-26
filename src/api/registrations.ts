import * as Promise from "bluebird";
let data: Registration[] = require("./registrations.json");

export interface Registration {
  id: string;
  date: string;
  player: string;
  status: string;
}

export interface RegistrationsApi {
  get: () => Promise<Registration[]>;
  create: (new_registration: Registration) => Promise<void>;
}

export const registrations: RegistrationsApi = {

  get: () => Promise.delay(1000, data),

  create: (new_registration: Registration) => {
    data = data.concat(new_registration)
    return Promise.delay(1000)
  }
};
