import React from "react";
import PropTypes from "prop-types";

import { Alert, Spin, Space } from "antd";
import { useCollectionData } from "react-firebase-hooks/firestore";

import firebase from "@Shared/firebase/firebase";
import Button from "@Components/Button/Button";
import Portal from "@Components/Portal/Portal";

const querySchools = firebase.firestore().collection("school");

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

const Home = () => {
  const [value, loading, error] = useCollectionData(querySchools);

  return (
    <div>
      {loading && (
        <Space size="middle">
          <Spin size="large" />
        </Space>
      )}
      {error && <ModalError error={error} />}
      Home
      <Button title="submit" type="primary" />
      <div className="test-color">
        <Button title="test" type="primary" />
      </div>
      {value?.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
};

export default Home;
