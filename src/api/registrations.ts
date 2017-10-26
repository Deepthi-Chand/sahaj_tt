import * as Promise from "bluebird";
import * as moment from "moment";
let data: Registration[] = require("./registrations.json");

export interface Registration {
  id: string;
  date: Date;
  player: string;
  status: string;
}

export interface RegistrationsApi {
  get: () => Promise<Registration[]>;
  create: (new_registration: Partial<Registration>) => Promise<void>;
}

export const registrations: RegistrationsApi = {

  get: () => Promise.delay(1000, data.map((reg, i) => ({
    ...reg,
    id: i.toString(),
    date: moment(reg.date).toDate()
  }))),

  create: (new_registration: Registration) => {
    data = data.concat(new_registration);
    return Promise.delay(1000);
  }
};
