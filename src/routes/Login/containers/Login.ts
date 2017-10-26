import { login } from '../../../modules/authentication';
import { Dispatch } from '../../../store/types';
import { connect } from 'react-redux';
import { Login as View } from '../components/Login';

interface StateProps {

}

interface DispatchProps {
  login: () => void;
}

interface OwnProps {

}

export interface Props extends StateProps, DispatchProps, OwnProps {

}

const mapStateToProps = (): StateProps => ({

});

const mapDispatchToProps = (dispatch: Dispatch, props: OwnProps): DispatchProps => ({
  login: () => dispatch(login('mock@gmail.com'))
});

export const Login = connect(mapStateToProps, mapDispatchToProps)(View);
