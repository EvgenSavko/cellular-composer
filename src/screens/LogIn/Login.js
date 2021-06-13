import React, { useState, useRef } from "react";

import { Form, Input, Button, Radio } from "antd";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";

import firebase from "@Shared/firebase/firebase";
import ModalError from "@Components/ModalError/ModalError";

const optionsSubmit = [
  { label: "Sign in", value: "Sign in" },
  { label: "Sign up", value: "Sign up" },
];

const Login = () => {
  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    errorCreate,
  ] = useCreateUserWithEmailAndPassword(firebase.auth());

  const [option, setOption] = useState(optionsSubmit[1].value);
  const [error, setError] = useState(null);
  const formRef = useRef(null);

  const onFinish = ({ email, password }) => {
    console.log("Success:", email, password);
    createUserWithEmailAndPassword(email, password);
    setError(null);
  };

  const onFinishFailed = () => {
    setError({ name: "Error", message: `Please fill all required inputs` });
  };

  const onReset = () => {
    formRef?.current.resetFields();
    setError(null);
  };

  return (
    <div className="login_page">
      {error && <ModalError error={error} />}
      <div className="container">
        <Radio.Group
          options={optionsSubmit}
          onChange={(e) => setOption(e.target.value)}
          value={option}
          optionType="button"
          buttonStyle="solid"
        />

        <Form
          name="auth"
          ref={formRef}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Email"
            name="email"
            required
            tooltip="Will be your username!"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="button" onClick={onReset}>
              Reset
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
