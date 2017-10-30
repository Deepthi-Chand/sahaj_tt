import * as Promise from "bluebird";
import * as moment from "moment";
import { Fetch } from "./fetch";
let data: Registration[] = require("./registrations.json");

export interface Registration {
  id: string;
  date: Date;
  player: string;
  status: string;
}

export interface RegistrationsApi {
  get: (user_id?: string) => Promise<Registration[]>;
  create: (new_registration: Partial<Registration>) => Promise<void>;
}

export const createRegistrations = ({ fetchLinkAs }: Fetch): RegistrationsApi => ({
  get: (user_id?: string) => Promise.delay(1000,
    data
      .map((reg, i) => ({
        ...reg,
        id: i.toString(),
        date: moment(reg.date).toDate()
      }))
      .filter(reg => !user_id || reg.player === user_id)
  ),
  create: (new_registration: Registration) => {
    data = data.concat(new_registration);
    return Promise.delay(1000);
  }
});
