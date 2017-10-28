import * as React from 'react';
import { StatelessComponent } from 'react';
import { Header } from 'components/Header';
import { Grid, AppBar, Toolbar, Typography, withStyles, WithStyles } from 'material-ui';
import { Theme } from 'material-ui/styles';

const style = (theme: Theme)  => ({
  title: {
    flex: 1,
  }
});

interface Props extends Partial<WithStyles<'title'>>{
}

const HeaderLayoutComponent: StatelessComponent<Props> = ({ children, classes }) =>
  <Grid container>
    <Grid item xs={12}>
      <Header />
    </Grid>
    <Grid item xs={12}>
      <main>
        {children}
      </main>
    </Grid>
  </Grid>

export const HeaderLayout = withStyles(style)(HeaderLayoutComponent);
