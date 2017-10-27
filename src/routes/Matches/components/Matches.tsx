import * as React from 'react';
import { StatelessComponent } from 'react';
import { Props } from '../containers/Matches';
import * as moment from 'moment';
import { Match } from '../../../api';

const isUpcoming = (match: Match) =>
  match.date.getTime() > moment().subtract(1, "days").toDate().getTime() && !match.completed;

export const Matches: StatelessComponent<Props> = ({ is_loading, matches }) =>
  <div>
    <section>
      <h3>Upcoming Matches</h3>
      <hr />
      {
        is_loading
          ? <p>Loading...</p>
          : <ul>{
            matches
              .filter(match => isUpcoming(match))
              .map(({ id, player_one, player_two, date }) =>
                <li key={id}>{player_one} vs {player_two} on {date.toISOString()}</li>
              )
          }</ul>
      }
    </section>
    <section>
      <h3>Completed Matches</h3>
      <hr />
      {
        is_loading
          ? <p>Loading...</p>
          : <ul>{
            matches
              .filter(match => !isUpcoming(match))
              .map(({ id, player_one, player_two, date }) =>
                <li key={id}>{player_one} vs {player_two} on {date.toISOString()}</li>
              )
          }</ul>
      }
    </section>
  </div>;
