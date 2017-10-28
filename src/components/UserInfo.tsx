import * as React from 'react';
import { StatelessComponent } from 'react';
import { Props } from '../containers/UserInfo';
import { Link } from 'react-router-dom';
import { NavButton } from './NavButton';
import { Button } from 'material-ui';

export const UserInfo: StatelessComponent<Props> = ({ authenticated, name, admin }) =>
  authenticated
    ? (
      <div>
        <NavButton color='contrast' to='/'>Home</NavButton>
        <NavButton color='contrast' to='/matches'>Matches</NavButton>
        <NavButton color='contrast' to='/registrations'>Registrations</NavButton>
        { admin && <NavButton color='contrast' to='/admin/registrations'>Admin</NavButton> }
        <Button disabled color='contrast'>{name}</Button>
      </div>
    )
    : null;
