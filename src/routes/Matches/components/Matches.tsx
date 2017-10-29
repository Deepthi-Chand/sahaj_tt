import * as React from 'react';
import { StatelessComponent } from 'react';
import { Props } from '../containers/Matches';
import * as moment from 'moment';
import { Match } from '../../../api';
import { Table, TableHead, TableRow, TableCell, TableBody, Typography } from 'material-ui';

const isUpcoming = (match: Match) =>
  match.date.getTime() > moment().subtract(1, "days").toDate().getTime() && !match.completed;

export const Matches: StatelessComponent<Props> = ({ is_loading, matches }) =>
  <div>
    <section>
      <Typography type="headline">Upcoming Matches</Typography>
      <hr />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Player 1</TableCell>
            <TableCell>Player 2</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            is_loading
              ? <TableRow><TableCell colSpan={3}>Loading...</TableCell></TableRow>
              :
              matches
                .filter(match => isUpcoming(match))
                .map(({ id, team_one, team_two, date }) =>
                  <TableRow key={id}>
                    <TableCell>{date.toISOString()}</TableCell>
                    <TableCell>{team_one.player_one.name}</TableCell>
                    <TableCell>{team_two.player_one.name}</TableCell>
                  </TableRow>
                )
          }
        </TableBody>
      </Table>
    </section>
    <section>
      <Typography type="headline">Completed Matches</Typography>
      <hr />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Player 1</TableCell>
            <TableCell>Player 2</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            is_loading
              ? <TableRow><TableCell colSpan={3}>Loading...</TableCell></TableRow>
              :
              matches
                .filter(match => !isUpcoming(match))
                .map(({ id, team_one, team_two, date }) =>
                  <TableRow key={id}>
                    <TableCell>{date.toISOString()}</TableCell>
                    <TableCell>{team_one.player_one.name}</TableCell>
                    <TableCell>{team_two.player_one.name}</TableCell>
                  </TableRow>
                )
          }
        </TableBody>
      </Table>
    </section>
  </div>;
