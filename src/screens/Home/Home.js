import React from "react";

import { Alert, Spin, Space } from "antd";
import { useCollectionData } from "react-firebase-hooks/firestore";

import firebase from "@Shared/firebase/firebase";
import Button from "@Components/Button/Button";

const querySchools = firebase.firestore().collection("school");

const Home = () => {
  const [value, loading, error] = useCollectionData(querySchools);
  console.log(error?.name);
  console.log(error?.message);

  return (
    <div>
      {loading && (
        <Space size="middle">
          <Spin size="large" />
        </Space>
      )}
      {error && (
        <div>
          <Alert
            message={error?.name}
            description={error?.message}
            type="error"
            closable
            showIcon
          />
        </div>
      )}
      Home <Button title="submit" type="primary" />
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
