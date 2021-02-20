import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.scss";
import "antd/dist/antd.css";

import Login from "./screens/LogIn";
import Home from "./screens/Home";
import About from "./screens/About";
import Navbar from "@Components/Navbar";

const App = () => {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <Navbar />
        </header>
        <div className="App-body">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/about">
              <About />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
