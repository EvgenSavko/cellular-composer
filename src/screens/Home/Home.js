import React from "react";

import { Spin, Space } from "antd";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

import firebase from "@Shared/firebase/firebase";
import Button from "@Components/Button/Button";
import ModalError from "@Components/ModalError/ModalError";

const querySchools = firebase.firestore().collection("school");

const Home = () => {
  const [user, loadingUser, errorUser] = useAuthState(firebase.auth());
  const [value, loading, error] = useCollectionData(querySchools);
  console.log("user from firebase", user);

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
