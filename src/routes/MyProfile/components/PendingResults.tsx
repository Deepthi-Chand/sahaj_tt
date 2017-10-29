import * as React from 'react';
import { Match } from 'api';
import { StatelessComponent } from 'react';
import { List, ListItem, Avatar, ListItemText } from 'material-ui';
import { Games } from 'material-ui-icons';

interface PendingResultsProps {
  matches: Match[];
}

export const PendingResults: StatelessComponent<PendingResultsProps> = ({ matches }) =>
  <List>
    {
      matches.map(({ id, team_one: { player_one }, team_two: { player_one: player_two }, result }) =>
          <ListItem button key={id}>
            <Avatar><Games /></Avatar>
            <ListItemText
              primary={`${player_one} vs ${player_two}`}
              secondary={
                !result
                  ? 'Click to update result'
                  : `${result.winning_team} won${result.confirmed ? '' : ', unconfirmed'}`
              } />
          </ListItem>
      )
    }
  </List>;
