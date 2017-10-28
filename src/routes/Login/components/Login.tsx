import * as React from 'react';
import { StatelessComponent } from 'react';
import { LoginProps } from '../containers/Login';
import { Grid, Paper, Typography, Button, WithStyles, withStyles } from 'material-ui';
import { Theme } from 'material-ui/styles';

const styles = (theme: Theme) => ({
  paper: {
    textAlign: 'center',
    padding: '24px'
  }
});

interface Props extends LoginProps, Partial<WithStyles<'paper'>> {

}

const LoginComponent: StatelessComponent<Props> = ({ login, classes }) =>
  <Grid container justify='center'>
    <Grid item xs={12} md={3}>
      <Paper className={classes.paper}>
        <Typography type='subheading'>Login with a sahajsoft.com email address</Typography>
        <Button onClick={login}>Login</Button>
      </Paper>
    </Grid>
  </Grid>;

export const Login = withStyles(styles)(LoginComponent);
