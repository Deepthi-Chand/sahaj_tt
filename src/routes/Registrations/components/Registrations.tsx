import * as React from 'react';
import { StatelessComponent } from 'react';
import { Props } from '../containers/Registrations';
import { NewRegistration } from './NewRegistration';

export const Registrations: StatelessComponent<Props> = ({ is_loading, registrations, sign_up }) =>
  <div>
    <h1>Registrations</h1>
    <hr />
    {
      is_loading
        ? <p>Loading...</p>
        : <ul>{
          registrations.map(({ id, date, player, status }) =>
            <li key={id}>{player} plays on  {date.toISOString()}</li>
          )
        }</ul>
    }
    <NewRegistration signUp={sign_up} />
  </div>;
