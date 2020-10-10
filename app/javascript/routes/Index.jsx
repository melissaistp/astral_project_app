import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Friends from "../components/Friends";
import Friend from "../components/Friend";
import NewFriend from "../components/NewFriend";


export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/friends" exact component={Friends} />
      <Route path="/friend/:id" exact component={Friend} />
      <Route path="/friend" exact component={NewFriend} />
    </Switch>
  </Router>
);
