import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";

import "../src/style/antd.scss";

import Login from "@Screens/LogIn";
import Navbar from "@Components/Navbar/Navbar";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Navbar />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
