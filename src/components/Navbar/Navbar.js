import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { Menu } from "antd";
import { HomeOutlined, LogoutOutlined, SmileOutlined } from "@ant-design/icons";

const Navbar = () => {
  let { pathname } = useLocation();
  const getKeyUrl = () => pathname.split("/")[1] || "home";
  const [current, setCurrent] = useState(getKeyUrl());

  const handleClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <div>
      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="home" icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="login" icon={<LogoutOutlined />}>
          <Link to="/login">Login</Link>
        </Menu.Item>
        <Menu.Item key="about" icon={<SmileOutlined />}>
          <Link to="/about">About us</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Navbar;
