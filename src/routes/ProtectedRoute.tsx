import * as React from 'react';
import { StatelessComponent } from 'react';
import { RouteProps } from 'react-router';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { State } from '../store/types';

interface StateProps {
  authenticated: boolean;
  admin: boolean;
}

interface DispatchProps {

}

interface OwnProps extends RouteProps {
  onlyAdmin?: boolean;
}

interface Props extends StateProps, DispatchProps, OwnProps {

}

const mapStateToProps = ({ authentication: { authenticated, is_admin } }: State): StateProps => ({
  authenticated,
  admin: is_admin
});

const ProtectedRouteComponent: StatelessComponent<Props> = ({ authenticated, admin, onlyAdmin, component: Component, ...routeProps }) =>
  <Route
    {...routeProps}
    render={
      props =>
        authenticated
          ? !!onlyAdmin && !admin
            ? <h3>Sorry, only <strong>admins</strong> are allowed to access this page.</h3>
            : <Component {...props as any} />
          : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    } />;

export const ProtectedRoute = connect(mapStateToProps)(ProtectedRouteComponent);
