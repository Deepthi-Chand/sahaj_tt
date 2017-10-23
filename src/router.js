import React from "react";
import { Router, Route, IndexRoute } from "react-router";
import { requireAuthentication as restrict } from './components/AuthenticatedComponent';
import { history } from "./store.js";
import App from "./components/App";
import Home from "./components/Home";
import PreviousMatch from "./components/PreviousMatchList"
import UserEdit from "./components/UserEdit";
import Register from "./components/Register";
import NotFound from "./components/NotFound";
import HeroPageLayout from "./components/HeroPageLayout"

// build the router
const router = (
  <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
    <Route component={HeroPageLayout}>
      <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="previous-match" component={PreviousMatch}/>
        <Route path="todays-match" component={PreviousMatch}/>
        <Route path="user-edit(/:id)" component={UserEdit}/>
        <Route path="register" component={Register}/>
        <Route path="*" component={NotFound}/>
      </Route>
    </Route>
  </Router>
);

// export
export { router };
