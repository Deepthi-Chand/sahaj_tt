import * as React from 'react';
import { StatelessComponent } from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { createStore } from 'store/createStore';
import { App, AppProps } from 'components/App';
import createHistory from 'history/createBrowserHistory';
import * as Bluebird from 'bluebird';

const anyWindow = window as any;
if(anyWindow.Promise == undefined) {
  anyWindow.P = Bluebird;
  anyWindow.Promise = Bluebird;
}

const history = createHistory();
const store = createStore(history);

const render = (Component: StatelessComponent<AppProps>) => {
  ReactDOM.render(
    <AppContainer>
      <Component store={store} history={history} />
    </AppContainer>,
    document.getElementById('root')
  )
}

render(App);

if (module.hot) {
  module.hot.accept('components/App', () => { render(App); });
}
