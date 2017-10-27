import * as React from 'react';
import { StatelessComponent } from 'react';
import { Props } from '../containers/UserInfo';
import { Link } from 'react-router-dom';

export const UserInfo: StatelessComponent<Props> = ({ authenticated, name, admin }) =>
  authenticated
    ? (
      <nav>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/matches'>Matches</Link></li>
          <li><Link to='/registrations'>Registrations</Link></li>
          { admin && <li><Link to='/admin/registations'>Admin</Link></li> }
          <li><p>{name}</p></li>
        </ul>
      </nav>
    )
    : null;
