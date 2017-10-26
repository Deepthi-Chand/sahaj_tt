import * as Promise from "bluebird";
const data = require("./registrations.json");

export interface Registration {
  id: string;
  date: string;
  player: string;
  status: string;
}

export interface RegistrationsApi {
  get: () => Promise<Registration[]>;
}

export const registrations: RegistrationsApi = {
  get: () => Promise.delay(1000, data)
};
