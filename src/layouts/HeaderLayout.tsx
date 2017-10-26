import * as React from 'react';
import { StatelessComponent } from 'react';
import { UserInfo } from '../containers/UserInfo';

export const HeaderLayout: StatelessComponent<{}> = ({ children }) =>
  <div>
    <header>
      <h1>Tournament Tracker</h1>
      <aside><UserInfo /></aside>
    </header>
    <hr />
    <main>
      {children}
    </main>
  </div>
