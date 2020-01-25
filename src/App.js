import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Header from "./Header";
import Work from "./pages/work/Work";
import Infos from "./pages/infos/Infos";
import Contact from "./pages/contact/Contact";
import Follow from "./pages/follow/Follow";

import "./app.scss";

export default function App() {
  return (
    <Router basename="/test">
      <div>
        <Header></Header>
        <div className="content-wrap">
          <Switch>
            <Route path="/infos">
              <Infos />
            </Route>
            <Route path="/contact">
              <Contact />
            </Route>
            <Route path="/follow">
              <Follow />
            </Route>
            <Route
              path={["/work/:id"]}
              render={props => {
                return <Work {...props} />;
              }}
            ></Route>
            <Route path={["/"]}>
              <Work />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}
