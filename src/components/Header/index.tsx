import * as React from 'react';
import { StatelessComponent } from 'react';
import { Theme } from 'material-ui/styles';
import { WithStyles, AppBar, Toolbar, Typography, withStyles } from 'material-ui';
import { Menu } from './Menu';

const style = (theme: Theme)  => ({
  title: {
    flex: 1,
  }
});

interface Props extends Partial<WithStyles<'title'>>{
}

const HeaderComponent: StatelessComponent<Props> = ({ classes }) =>
  <AppBar position='static'>
    <Toolbar>
      <Typography type='title' color='inherit' className={classes.title}>Tournament Tracker</Typography>
      <Menu />
    </Toolbar>
  </AppBar>;

export const Header = withStyles(style)(HeaderComponent);
