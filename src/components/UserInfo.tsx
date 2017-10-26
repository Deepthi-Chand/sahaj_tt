import * as React from 'react';
import { StatelessComponent } from 'react';
import { Props } from '../containers/UserInfo';

export const UserInfo: StatelessComponent<Props> = ({ authenticated, name }) =>
  authenticated ? <p>{name}</p> : null;
