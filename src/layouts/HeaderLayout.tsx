import * as React from 'react';
import { StatelessComponent } from 'react';
import { UserInfo } from '../containers/UserInfo';
import { Grid, AppBar, Toolbar, Typography, withStyles, WithStyles } from 'material-ui';
import { Theme } from 'material-ui/styles';

const style = (theme: Theme)  => ({
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  }
});

interface Props extends Partial<WithStyles<'root'|'flex'>>{
}

const HeaderLayoutComponent: StatelessComponent<Props> = ({ children, classes }) =>
  <Grid container className={classes.root}>
    <Grid item xs={12}>
      <AppBar position='static'>
        <Toolbar>
          <Typography type='title' color='inherit' className={classes.flex}>Tournament Tracker</Typography>
          <UserInfo />
        </Toolbar>
      </AppBar>
    </Grid>
    <Grid item xs={12}>
      <main>
        {children}
      </main>
    </Grid>
  </Grid>

export const HeaderLayout = withStyles(style)(HeaderLayoutComponent);
