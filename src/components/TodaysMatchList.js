import React from "react";
import MatchList from "./common/MatchList";

// Home page component
export default class Home extends React.Component {
  // render
  render() {
    return (
      <div className="page-home">
        <MatchList/>
      </div>
    );
  }
}
