import { State, Dispatch } from "store/types";
import { logout } from "modules/authentication";
import { connect } from "react-redux";
import { UserMenu as View } from './UserMenu';

interface StateProps {
  authenticated: boolean;
  name: string;
}

interface DispatchProps {
  onLogout: () => void;
}

export interface UserMenuProps extends StateProps, DispatchProps {

}

const mapStateToProps = ({ authentication: { authenticated, name } }: State): StateProps => ({
  authenticated,
  name
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onLogout: () => dispatch(logout())
});

export const UserMenu = connect(mapStateToProps, mapDispatchToProps)(View);
