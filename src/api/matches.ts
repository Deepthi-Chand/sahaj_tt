import * as Promise from "bluebird";
import * as moment from "moment";
const data: Match[] = require("./matches.json");

export interface Team {
  player_one: string
}

export interface Match {
  id: string;
  team_one: Team;
  team_two: Team;
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
