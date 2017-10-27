import * as Promise from "bluebird";
import * as moment from "moment";
const data: Match[] = require("./matches.json");

export interface Match {
  id: string;
  player_one: string;
  player_two: string;
  completed: boolean;
  date: Date;
}

export interface MatchesApi {
  get: () => Promise<Match[]>;
}

export const matches: MatchesApi = {
  get: () => Promise.delay(1000,
    data
    .map((match, i) => ({
      ...match,
      id: i.toString(),
      date: moment(match.date).toDate()
    }))
  )
};
