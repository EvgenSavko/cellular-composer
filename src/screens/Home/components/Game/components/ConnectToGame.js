import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

import { Form, Input, Button } from 'antd'

import firebase from '@Shared/firebase/firebase'
import { useAuth } from '@Shared/context/AuthContext'

const ConnectToGame = ({ gameName, setGameName, setError, queryGames }) => {
  const { currentUser } = useAuth()
  const formRef = useRef(null)

  useEffect(() => {
    if (gameName.name !== 'default' && gameName.connect) {
      const { email, uid } = currentUser
      const name = email?.substring(0, email.indexOf('@'))
      queryGames?.doc(uid).set({
        name: name,
        id: 2,
        uid: uid,
        game_creator: false,
        positionX: null,
        positionY: null,
        positionZ: null,
        time_creat: firebase.firestore.Timestamp.fromDate(new Date()).toDate(),
      })
      setGameName({ name: gameName.name, connect: false, create: false })
    }
  }, [gameName.name, gameName.connect])

  const onFinish = ({ game_name }) => {
    setGameName({ name: game_name, connect: true, create: false })
    formRef?.current.resetFields()
    setError(null)
  }

  const onFinishFailed = () => {
    setError({ name: 'Error', message: `Please enter game's name.` })
  }

  return (
    <div className="init-game__input connect-game">
      <Form name="connect_game" layout="inline" ref={formRef} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item
          label="Connect to game"
          name="game_name"
          tooltip="Enter name of existing game!"
          rules={[
            {
              message: 'Please enter game`s name',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            <span className="submit-btn-text">Connect</span>
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

ConnectToGame.propTypes = {
  gameName: PropTypes.shape({
    name: PropTypes.string,
    connect: PropTypes.bool,
    create: PropTypes.bool,
  }),
  queryGames: PropTypes.shape({
    add: PropTypes.func,
    doc: PropTypes.func,
  }),
  setError: PropTypes.func,
  setGameName: PropTypes.func,
}

export default ConnectToGame
