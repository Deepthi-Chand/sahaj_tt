import * as React from 'react';
import { StatelessComponent } from 'react';
import { Provider } from 'react-redux';
import { AsyncStore } from '../store/reducers';
import { State } from '../store/types';
import { ConnectedRouter } from 'react-router-redux';
import { History } from 'history';
import { Route } from 'react-router-dom';
import { Matches } from '../routes/Matches';
import { Registrations } from '../routes/Registrations';
import { Login } from '../routes/Login';
import { ProtectedRoute } from '../routes/ProtectedRoute';
import { Switch } from 'react-router';
import { HeaderLayout } from '../layouts/HeaderLayout';
import 'typeface-roboto';

export interface AppProps {
  store: AsyncStore<State>;
  history: History
};

export const App: StatelessComponent<AppProps> = ({ store, history }) =>
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <HeaderLayout>
        <Switch>
          <Route path='/login' exact component={Login} />
          <ProtectedRoute path='/' exact component={Matches} />
          <ProtectedRoute path='/registrations' exact component={Registrations} />
          <ProtectedRoute onlyAdmin path='/admin/registrations' exact component={Registrations} />
        </Switch>
      </HeaderLayout>
    </ConnectedRouter>
  </Provider>;
