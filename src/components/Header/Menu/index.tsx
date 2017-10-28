import * as React from 'react';
import { StatelessComponent } from 'react';
import { UserMenu } from './UserMenu';
import { Link } from 'react-router-dom';
import { NavButton } from 'components/NavButton';
import { Button } from 'material-ui';
import { connect } from 'react-redux';
import { State } from 'store/types';

interface StateProps {
  authenticated: boolean;
  admin: boolean;
}

export interface Props extends StateProps {

}

const mapStateToProps = ({ authentication: { authenticated, admin }}: State): StateProps => ({
  authenticated,
  admin
});

export const MenuComponent: StatelessComponent<Props> = ({ authenticated, admin }) =>
  authenticated
    ? (
      <div>
        <NavButton color='contrast' to='/'>Home</NavButton>
        <NavButton color='contrast' to='/matches'>Matches</NavButton>
        <NavButton color='contrast' to='/registrations'>Registrations</NavButton>
        { admin && <NavButton color='contrast' to='/admin/registrations'>Admin</NavButton> }
        <UserMenu />
      </div>
    )
    : null;

export const Menu = connect(mapStateToProps)(MenuComponent);
