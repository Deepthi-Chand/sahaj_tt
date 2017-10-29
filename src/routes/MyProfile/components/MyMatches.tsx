import * as React from 'react';
import { Match } from 'api';
import { StatelessComponent } from 'react';
import { List, ListItem, Avatar, ListItemText, ListItemSecondaryAction, IconButton, Typography } from 'material-ui';
import { Games, ThumbUp, ThumbDown } from 'material-ui-icons';

interface MyMatchesProps {
  matches: Match[];
  isPendingLoss: (match: Match) => boolean;
  updateResult: (match: Match, won: boolean) => void;
  confirmResult: (match: Match, confirmed: boolean) => void;
}

export const MyMatches: StatelessComponent<MyMatchesProps> = ({ matches, isPendingLoss, updateResult, confirmResult }) =>
  <List>
    {
      matches.map(match => {
        const { id, team_one: { player_one }, team_two: { player_one: player_two }, result } = match;
        // TODO: Move to container some day
        const callback = !result
          ? (selection: boolean) => () => updateResult(match, selection)
          : (selection: boolean) => () => confirmResult(match, selection);
        const message =
          (!result || !result.confirmed)
            ? `Result pending. ${ !!result && !!result.winning_team ? `${result.winning_team} has claimed a win.`: ''}`
            : `${result.winning_team} won.`;
        const askConfirmation = isPendingLoss(match);
        const question =
          !result
            ? 'Did you win?'
            : askConfirmation
              ? `${result.winning_team} won.${result.confirmed ? '' : 'Do you agree?'}`
              : '';
        return (
          <ListItem key={id}>
          <Avatar><Games /></Avatar>
          <ListItemText primary={`${player_one} vs ${player_two}`} secondary={message} />
            {
              (!result || askConfirmation) &&
              <ListItemSecondaryAction>
                <Typography type='caption'>{question}</Typography>
                <IconButton onClick={callback(true)}><ThumbUp /></IconButton>
                <IconButton onClick={callback(false)}><ThumbDown /></IconButton>
              </ListItemSecondaryAction>
            }
        </ListItem>
        );
      }

      )
    }
  </List>;
