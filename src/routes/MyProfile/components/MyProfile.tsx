import * as React from 'react';
import { StatelessComponent } from 'react';
import { Grid, Paper, Typography, Divider } from 'material-ui';
import { MyMatches } from './MyMatches';
import { MyProfileProps } from '../containers/MyProfile';

export const MyProfile: StatelessComponent<MyProfileProps> = ({ name, email, matches, updateResult, confirmResult }) =>
  <Grid container alignItems='stretch' justify='center'>
    <Grid item xs={12} sm={8}>
      <Typography type='headline'>{name}</Typography>
      <Typography type='subheading'>{email}</Typography>
      <Divider />
      <Typography type='body2'>Your matches</Typography>
      <MyMatches matches={matches} updateResult={updateResult} confirmResult={confirmResult} />
    </Grid>
  </Grid>;
