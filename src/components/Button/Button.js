import React from "react";

import { Button } from "antd";
import PT from "prop-types";

const CustomButton = ({ title, type }) => (
  <div className="button">
    <Button type={type}>{title}</Button>
  </div>
);

CustomButton.propTypes = {
  title: PT.string,
};

export default CustomButton;
