import * as React from 'react';
import { StatelessComponent } from 'react';
import { RouteProps } from 'react-router';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { State } from '../store/types';

interface StateProps {
  authenticated: boolean;
}

interface DispatchProps {

}

interface OwnProps extends RouteProps {

}

interface Props extends StateProps, DispatchProps, OwnProps {

}

const mapStateToProps = ({ authentication: { authenticated } }: State): StateProps => ({
  authenticated
});

const PrivateRouteComponent: StatelessComponent<Props> = ({ authenticated, component: Component, ...routeProps }) =>
  <Route
    {...routeProps}
    render={
      props =>
        authenticated
          ? <Component {...props as any} />
          : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    } />;

export const PrivateRoute = connect(mapStateToProps)(PrivateRouteComponent);
