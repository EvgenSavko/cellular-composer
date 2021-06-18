import React, { useEffect, useState, useRef, useCallback } from 'react'
import { useHistory } from 'react-router-dom'

import { Form, Input, Button, Radio } from 'antd'
import { Spin } from 'antd'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'

import firebase from '@Shared/firebase/firebase'
import { useAuth } from '@Shared/context/AuthContext'
import ModalError from '@Components/ModalError'
import LoadingAlert from '@Components/LoadingAlert'

const SIGN_UP = 'Sign up'
const SIGN_IN = 'Sign in'

const optionsTypes = [
  { label: 'Sign in', value: SIGN_IN },
  { label: 'Sign up', value: SIGN_UP },
]

const Login = () => {
  const history = useHistory()
  const { currentUser, setCurrentUser, loadingUser } = useAuth()
  const [createUserWithEmailAndPassword, userCreat, loadingCreat, errorCreate] = useCreateUserWithEmailAndPassword(
    firebase.auth()
  )
  const [signInWithEmailAndPassword, userIN, loading, errorIn] = useSignInWithEmailAndPassword(firebase.auth())

  const [option, setOption] = useState(optionsTypes[0].value)
  const [error, setError] = useState(null)
  const formRef = useRef(null)

  useEffect(() => {
    if (userIN || userCreat) {
      setCurrentUser(userIN || userCreat)
      history.push('/')
    }
  }, [userCreat, userIN])

  useEffect(() => {
    if (currentUser) {
      history.push('/')
    }
  }, [currentUser])

  const onFinish = ({ email, password }) => {
    option === SIGN_UP && createUserWithEmailAndPassword(email, password)
    option === SIGN_IN && signInWithEmailAndPassword(email, password)
    setError(null)
  }

  const onFinishFailed = () => {
    setError({ name: 'Error', message: `Please fill all required inputs` })
  }

  const onReset = () => {
    formRef?.current.resetFields()
    setError(null)
  }

  const renderModalError = useCallback(() => {
    let errorProps = null
    if (error) errorProps = error
    if (errorCreate) errorProps = errorCreate
    if (errorIn) errorProps = errorIn

    return errorProps && <ModalError error={errorProps} />
  }, [error, errorIn, errorCreate])

  return (
    <div className="login_page">
      {loadingUser && (
        <LoadingAlert
          message="Authorization check..."
          description="Wait for the user authorization check in the system."
        />
      )}
      {renderModalError()}
      <div className="container">
        <Radio.Group
          options={optionsTypes}
          onChange={(e) => setOption(e.target.value)}
          value={option}
          optionType="button"
          buttonStyle="solid"
        />

        <Form name="auth" ref={formRef} onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Form.Item
            label="Email"
            name="email"
            required
            tooltip="Will be your username!"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your email!',
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
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          {option === SIGN_UP && (
            <Form.Item
              label="Confirm Password"
              name="confirm_password"
              dependencies={['password']}
              rules={[
                {
                  required: true,
                  message: 'Please input your Confirm Password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(new Error('The two passwords that you entered do not match!'))
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
          )}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {(loading || loadingCreat) && <Spin size="small" />}
              <span className="submit-btn-text">Submit</span>
            </Button>
            <Button htmlType="button" onClick={onReset}>
              Reset
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
