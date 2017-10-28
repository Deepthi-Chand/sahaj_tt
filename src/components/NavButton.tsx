import * as React from 'react';
import { Button as MaterialButton } from 'material-ui';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { ButtonProps } from 'material-ui/Button';
import { StatelessComponent } from 'react';
import { Dispatch, State } from '../store/types';

interface StateProps {

}

interface DispatchProps {
  navigate: () => void;
}

interface OwnProps extends ButtonProps {
  to: string;
}

interface Props extends StateProps, DispatchProps, OwnProps {

}

const mapStateToProps = (state: State, props: OwnProps): StateProps => ({

});

const mapDispatchToProps = (dispatch: Dispatch, { to }: OwnProps): DispatchProps => ({
  navigate: () => dispatch(push(to))
});

const NavButtonComponent: StatelessComponent<Props> = ({ navigate, to, ...props }) =>
  <MaterialButton {...props} onClick={navigate} />;

export const NavButton = connect(mapStateToProps, mapDispatchToProps)(NavButtonComponent);
