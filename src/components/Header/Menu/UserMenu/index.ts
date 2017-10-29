import { State, Dispatch } from "store/types";
import { logout } from "modules/authentication";
import { connect } from "react-redux";
import { UserMenu as View } from './UserMenu';
import { push } from "react-router-redux";

interface StateProps {
  authenticated: boolean;
  name: string;
}

interface DispatchProps {
  onLogout: () => void;
  onMyProfileClick: () => void;
}

export interface UserMenuProps extends StateProps, DispatchProps {

}

const mapStateToProps = ({ authentication: { authenticated, name } }: State): StateProps => ({
  authenticated,
  name
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onLogout: () => dispatch(logout()),
  onMyProfileClick: () => dispatch(push('/me'))
});

export const UserMenu = connect(mapStateToProps, mapDispatchToProps)(View);
