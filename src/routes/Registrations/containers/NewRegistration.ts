import { fetchRegistrations, createRegistration } from "../modules/registrations";
import { connect } from "react-redux";
import { NewRegistration as View } from '../components/NewRegistration';
import { State, Dispatch } from "../../../store/types";

interface StateProps {
}

interface DispatchProps {
  signUp: (new_registration: string) => void;
}

interface OwnProps {
}

export interface Props extends StateProps, DispatchProps, OwnProps {
};

const mapStateToProps = (state: State, props: OwnProps): StateProps => ({
});

const mapDispatchToProps = (dispatch: Dispatch, props: OwnProps): DispatchProps => ({
  signUp: registration_date => {
    dispatch(createRegistration(new Date(registration_date)))
      .then(() => dispatch(fetchRegistrations()))
  }
});

export const NewRegistration = connect(mapStateToProps, mapDispatchToProps)(View);
