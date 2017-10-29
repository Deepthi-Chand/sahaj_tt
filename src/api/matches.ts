import * as Promise from "bluebird";
import * as moment from "moment";
import { fetchLinkAs, Link } from "./request_service"
import { User } from "api";
const data: Match[] = require("./matches.json");

export interface Team {
  player_one: User;
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
  updateWinner: (match: Match, winner: Team) => Promise<Match>;
  confirmWinner: (match: Match, confirmation: boolean) => Promise<Match>;
}

export const matches: MatchesApi = {
  get: (email) =>
    Promise
      .delay(1000, data.filter(match => !email || match.team_one.player_one.email === email || match.team_two.player_one.email === email))
      .then(matches => matches.map(match => ({ ...match, date: moment(match.date).toDate()}))),
  updateWinner: (match, winner) => Promise.delay(1000, { ...match, result: { winning_team: winner.id, confirmed: false } }),
  confirmWinner: (match, confirmation) => Promise.delay(1000, { ...match, result: confirmation ? { ...match.result, confirmed: true } : undefined })
};
