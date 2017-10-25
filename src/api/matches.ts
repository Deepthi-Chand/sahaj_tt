import * as Promise from "bluebird";
const data = require("./matches.json");

export interface Match {
  id: string;
  player_one: string;
  player_two: string;
  status: string;
}

export interface MatchesApi {
  get: () => Promise<Match[]>;
}

export const matches: MatchesApi = {
  get: () => Promise.delay(1000, data)
};
