import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Switch, Route } from "react-router-dom";

import { Menu } from "antd";

import Home from "@Screens/Home";
import About from "@Screens/About";
import routes from "./routes";

const Navbar = () => {
  let { pathname } = useLocation();
  const getKeyUrl = () => pathname.split("/")[1] || "home";
  const [current, setCurrent] = useState(getKeyUrl());

  const handleClick = (e) => setCurrent(e.key);

  return (
    <div>
      <header className="App-header">
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
          {routes.map(({ key, label, url, icon }) => (
            <Menu.Item key={key} icon={icon}>
              <Link to={url}>{label}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </header>
      <div className="App-body">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default Navbar;
