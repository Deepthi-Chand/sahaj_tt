import * as React from 'react';
import { StatelessComponent } from 'react';
import { Provider } from 'react-redux';
import { AsyncStore } from '../store/reducers';
import { State } from '../store/types';
import { ConnectedRouter } from 'react-router-redux';
import { History } from 'history';

export interface AppProps {
  store: AsyncStore<State>;
  history: History
};

export const App: StatelessComponent<AppProps> = ({ store, history }) =>
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div className='route-result' style={{ height: '100%' }}>Hi!</div>
    </ConnectedRouter>
  </Provider>;
