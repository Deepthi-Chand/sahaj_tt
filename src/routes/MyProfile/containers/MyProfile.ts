import { MyProfile as View } from '../components/MyProfile';
import { Match } from 'api';
import { State, Dispatch } from 'store/types';
import { fetchMatches, updateMatchResult, confirmMatchResult } from 'routes/Matches/modules/matches';
import { connect } from 'react-redux';

interface StateProps {
  email: string;
  name: string;
  matches: Match[];
  isPendingLoss: (match: Match) => boolean;
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
  (match: Match) => match.team_one.player_one.email === email || match.team_two.player_one.email === email;
const isResultPending = ({ result }: Match) => !!result && !result.confirmed;
const getPlayerTeamId = (email: string) =>
  (match: Match) =>
    isPartOfMatch(email)(match)
      ? match.team_one.player_one.email === email ? match.team_one.id : match.team_two.id
      : undefined;
const isTeamLosing = (team_id: string) =>
  (match: Match) =>
    (match.team_one.id === team_id || match.team_two.id === team_id) && match.result.winning_team !== team_id;
const isPendingLoss = (email: string) =>
  (match: Match) => isResultPending(match) && isTeamLosing(getPlayerTeamId(email)(match))(match);

const mapStateToProps = ({ authentication: { email, name }, matches: { items } }: State): StateProps => ({
  email,
  name,
  matches: items.filter(isPartOfMatch(email)),
  isPendingLoss: isPendingLoss(email)
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  setTimeout(() => dispatch(fetchMatches()), 30);
  return {
    updateResult: (match, won) => dispatch(updateMatchResult(match, won)),
    confirmResult: (match, confirmed) => dispatch(confirmMatchResult(match, confirmed))
  };
}

export const MyProfile = connect(mapStateToProps, mapDispatchToProps)(View);
