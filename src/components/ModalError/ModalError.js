import React from "react";
import PropTypes from "prop-types";

import { Alert } from "antd";

import Portal from "@Components/Portal/Portal";

const ModalError = ({ error }) => (
  <Portal id="portal-root">
    <Alert
      message={error?.name || "Error"}
      description={error?.message}
      type="error"
      closable
      showIcon
    />
  </Portal>
);

ModalError.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string,
    name: PropTypes.string,
  }),
};

export default ModalError;
