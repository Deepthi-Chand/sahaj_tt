import * as React from 'react';
import { StatelessComponent } from 'react';
import { Props } from '../containers/Login';

export const Login: StatelessComponent<Props> = ({ login }) =>
  <div>
    <button onClick={login}>Just click this</button>
  </div>;
