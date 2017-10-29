import * as Promise from "bluebird";
import * as moment from "moment";
let data: Match[] = require("./matches.json");

export interface Team {
  player_one: string;
  id: string;
}

interface MatchResult {
  winning_team: string;
  confirmed: boolean;
}

export interface Match {
  id: string;
  team_one: Team;
  team_two: Team;
  completed: boolean;
  date: Date;
  result?: MatchResult;
}

export interface MatchesApi {
  get: (email?: string) => Promise<Match[]>;
  updateWinner: (match: Match, winner: Team) => Promise<void>;
  confirmWinner: (match: Match, confirmation: boolean) => Promise<void>;
}

const getData = (): Match[] =>
  data
    .map((match, i) => ({
      ...match,
      id: i.toString(),
      date: moment(match.date).toDate()
    }));

export const matches: MatchesApi = {
  get: (email) => Promise.delay(1000,
    getData()
    .filter(match => !email || match.team_one.player_one === email || match.team_two.player_one === email)
  ),
  updateWinner: (match, winner) => {
    data =
      getData()
        .filter(m => m.id !== match.id)
        .concat({ ...match, result: { winning_team: winner.id, confirmed: false }});
    return Promise.delay(1000);
  },
  confirmWinner: (match, confirmation) => {
    const result =
      confirmation
        ? { ...match.result, confirmed: true }
        : undefined;
    data =
      getData()
        .filter(m => m.id !== match.id)
        .concat({ ...match, result });
    return Promise.delay(1000);
  }
};
