import { MyProfile as View } from '../components/MyProfile';
import { Match } from 'api';
import { State, Dispatch } from 'store/types';
import { fetchMatches, updateMatchResult, confirmMatchResult } from 'routes/Matches/modules/matches';
import { connect } from 'react-redux';

interface StateProps {
  email: string;
  name: string;
  matches: Match[];
}

interface DispatchProps {
  updateResult: (match: Match, won: boolean) => void;
  confirmResult: (match: Match, confirmed: boolean) => void;
}

interface OwnProps {

}

export interface MyProfileProps extends StateProps, DispatchProps, OwnProps {

}

const isPartOfMatch = (email: string) =>
  (match: Match) => match.team_one.player_one === email || match.team_two.player_one === email;

const mapStateToProps = ({ authentication: { email, name }, matches: { items } }: State): StateProps => ({
  email,
  name,
  matches: items.filter(isPartOfMatch(email))
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  setTimeout(() => dispatch(fetchMatches()), 30);
  return {
    updateResult: (match, won) => dispatch(updateMatchResult(match, won)),
    confirmResult: (match, confirmed) => dispatch(confirmMatchResult(match, confirmed))
  };
}

export const MyProfile = connect(mapStateToProps, mapDispatchToProps)(View);
