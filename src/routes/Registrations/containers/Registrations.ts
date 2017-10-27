import { Registration } from "../../../api";
import { State, Dispatch } from "../../../store/types";
import { fetchRegistrations, createRegistration } from "../modules/registrations";
import { connect } from "react-redux";
import { Registrations as View } from '../components/Registrations';
import { RouteComponentProps } from "react-router";

interface StateProps {
  registrations: Registration[];
  is_loading: boolean;
  canRegister: boolean;
}

interface DispatchProps {
}

interface OwnProps extends RouteComponentProps<{}> {
}

export interface Props extends StateProps, DispatchProps, OwnProps {
};

const mapStateToProps = ({ registrations: { is_loading, items: registrations } }: State, { location: { pathname } }: OwnProps): StateProps => ({
  registrations,
  is_loading,
  canRegister: !pathname.startsWith('/admin')
});

const mapDispatchToProps = (dispatch: Dispatch, { location: { pathname } }: OwnProps): DispatchProps => {
  setTimeout(() => dispatch(fetchRegistrations(pathname.startsWith('/admin'))), 30);
  return {
  };
};

export const Registrations = connect(mapStateToProps, mapDispatchToProps)(View);
