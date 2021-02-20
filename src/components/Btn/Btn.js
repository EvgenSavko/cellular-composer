import React from "react";

import PT from "prop-types";

const Btn = ({ title }) => <div className="button">{title}</div>;

Btn.propTypes = {
  title: PT.string,
};

export default Btn;
