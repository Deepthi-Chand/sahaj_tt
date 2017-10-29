import * as React from 'react';
import { StatelessComponent } from 'react';
import { UserMenu } from './UserMenu';
import { Link } from 'react-router-dom';
import { NavButton } from 'components/NavButton';
import { Button, WithStyles, withStyles } from 'material-ui';
import { connect } from 'react-redux';
import { State } from 'store/types';
import { Theme } from 'material-ui/styles';

interface StateProps {
  authenticated: boolean;
  admin: boolean;
}

export interface Props extends StateProps, Partial<WithStyles<'root'>> {

}

const mapStateToProps = ({ authentication: { authenticated, is_admin } }: State): StateProps => ({
  authenticated,
  admin: is_admin
});

const styles = (theme: Theme) => ({
  root: {
    display: 'flex',
    '& > div': {
      display: 'inline-flex'
    }
  }
});

const MenuComponent: StatelessComponent<Props> = ({ authenticated, admin, classes }) =>
  authenticated
    ? (
      <div className={classes.root}>
        <NavButton color='contrast' to='/'>Home</NavButton>
        <NavButton color='contrast' to='/registrations'>Registrations</NavButton>
        {admin && <NavButton color='contrast' to='/admin/registrations'>Admin</NavButton>}
        <UserMenu />
      </div>
    )
    : null;

export const Menu = connect(mapStateToProps)(withStyles(styles)(MenuComponent));
