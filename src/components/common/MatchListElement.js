import React, { PropTypes } from "react";
import { Link } from "react-router";
import { Button, Glyphicon } from "react-bootstrap";

// User List Element component
export default class MatchListElement extends React.Component {
  // render
  render() {
    const {user, showDelete, showLastCol} = this.props;
    let last_col = null;
    if(!showLastCol) {
      last_col = <td>{user.result}</td>
    }
    return (
      <tr>
        <td>#{user.id}</td>
        <td>{user.player1}</td>
        <td>{user.player2}</td>

        {last_col}
      </tr>
    );
  }
}

// prop checks
MatchListElement.propTypes = {
  user: PropTypes.object.isRequired,
  showDelete: PropTypes.func.isRequired,
}
