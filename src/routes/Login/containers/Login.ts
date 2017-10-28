import { login } from '../../../modules/authentication';
import { Dispatch } from '../../../store/types';
import { connect } from 'react-redux';
import { Login as View } from '../components/Login';
import { RouteComponentProps } from 'react-router';

interface StateProps {

}

interface DispatchProps {
  login: () => void;
}

interface OwnProps extends RouteComponentProps<{}> {

}

export interface LoginProps extends StateProps, DispatchProps, OwnProps {

}

const mapStateToProps = (): StateProps => ({

});

const mapDispatchToProps = (dispatch: Dispatch, { location: { state: { from } } }: OwnProps): DispatchProps => ({
  login: () => dispatch(login(from || '/'))
});

export const Login = connect(mapStateToProps, mapDispatchToProps)(View);
