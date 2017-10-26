import { State } from "../store/types";
import { connect } from "react-redux";
import { UserInfo as View } from '../components/UserInfo';

interface StateProps {
  authenticated: boolean;
  name: string;
}

interface DispatchProps {

}

interface OwnProps {

}

export interface Props extends StateProps, DispatchProps, OwnProps {

}

const mapStateToProps = ({ authentication: { authenticated, name }}: State, props: OwnProps): StateProps => ({
  authenticated,
  name
});

export const UserInfo = connect(mapStateToProps)(View);
