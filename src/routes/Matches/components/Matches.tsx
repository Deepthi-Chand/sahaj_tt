import * as React from 'react';
import { StatelessComponent } from 'react';
import { Props } from '../containers/Matches';

export const Matches: StatelessComponent<Props> = ({ is_loading, matches }) =>
  <div>
    <h1>Matches</h1>
    <hr />
    {
      is_loading
        ? <p>Loading...</p>
        : <ul>{
            matches.map(({ id, player_one, player_two, status }) =>
              <li key={id}>{player_one} vs {player_two}</li>
            )
          }</ul>
    }
  </div>;
