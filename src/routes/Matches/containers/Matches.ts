import { Match } from "api";
import { State, Dispatch } from "../../../store/types";
import { fetchMatches } from "../modules/matches";
import { connect } from "react-redux";
import { Matches as View } from '../components/Matches';

interface StateProps {
  matches: Match[];
  is_loading: boolean;
}

interface DispatchProps {
}

interface OwnProps {
}

export interface Props extends StateProps, DispatchProps, OwnProps {
};

const mapStateToProps = ({ matches: { is_loading, items: matches } }: State): StateProps => ({
  matches,
  is_loading
});

const mapDispatchToProps = (dispatch: Dispatch, { }: OwnProps): DispatchProps => {
  setTimeout(() => dispatch(fetchMatches()), 30);
  return {};
};

export const Matches = connect(mapStateToProps, mapDispatchToProps)(View);
