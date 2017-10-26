import { Registration } from "../../../api";
import { State, Dispatch } from "../../../store/types";
import { fetchRegistrations, createRegistration } from "../modules/registrations";
import { connect } from "react-redux";
import { Registrations as View } from '../components/Registrations';

interface StateProps {
  registrations: Registration[];
  is_loading: boolean;
}

interface DispatchProps {
  sign_up: (new_registration: string) => void;
}

interface OwnProps {
}

export interface Props extends StateProps, DispatchProps, OwnProps {
};

const mapStateToProps = ({ registrations: { is_loading, items: registrations } }: State, props: OwnProps): StateProps => ({
  registrations,
  is_loading
});

const mapDispatchToProps = (dispatch: Dispatch, props: OwnProps): DispatchProps => {
  setTimeout(() => dispatch(fetchRegistrations()), 30);
  return {
    sign_up: registration_date => {
      dispatch(createRegistration(registration_date))
      .then(() => dispatch(fetchRegistrations()))
    }
  };
};

export const Registrations = connect(mapStateToProps, mapDispatchToProps)(View);
