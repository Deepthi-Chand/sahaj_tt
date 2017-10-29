import * as React from 'react';
import { StatelessComponent } from 'react';
import { Grid, Paper, Typography, Divider } from 'material-ui';
import { PendingResults } from 'routes/MyProfile/components/PendingResults';
import { Match } from 'api';
const matches: Match[] = [
  {
    "id": "1",
    "team_one": {
      "id": "team-1",
      "player_one": "deepthichand@sahajsoft.com"
    },
    "team_two":{
      "id": "team-2",
      "player_one": "shalin@sahajsoft.com"
    },
    "completed": true,
    "date": new Date()
  },
  {
    "id": "2",
    "team_one": {
      "id": "team-1",
      "player_one": "deepthichand@sahajsoft.com"
    },
    "team_two":{
      "id": "team-2",
      "player_one": "shalin@sahajsoft.com"
    },
    "completed": false,
    "date": new Date()
  },
  {
    "id": "3",
    "team_one": {
      "id": "team-1",
      "player_one": "deepthichand@sahajsoft.com"
    },
    "team_two":{
      "id": "team-2",
      "player_one": "shalin@sahajsoft.com"
    },
    "completed": false,
    "date": new Date()
  }
];

interface MyProfileProps {
  email: string;
}

export const MyProfile: StatelessComponent<MyProfileProps> = ({ email }) =>
  <Grid container alignItems='stretch'>
    <Grid item xs={12} md={8}>
      <Typography type='headline'>My Profile</Typography>
      <Typography type='subheading'>{email}</Typography>
      <Divider />
    </Grid>
    <Grid item xs={12} md={4}>
      <Paper>
        <Typography type='headline'>Your matches with pending results</Typography>
        <PendingResults matches={matches} />
      </Paper>
    </Grid>
  </Grid>;
