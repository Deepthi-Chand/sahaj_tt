import React from "react";
import MatchList from "./common/MatchList";

// Home page component
export default class PreviousMatch extends React.Component {
  // render
  render() {
    return (
      <div className="page-home">
        <MatchList delete_show={true}/>
      </div>
    );
  }
}
