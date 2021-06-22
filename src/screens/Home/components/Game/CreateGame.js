import React, { useRef, useEffect, memo } from 'react'
import PropTypes from 'prop-types'

import { Form, Input, Button } from 'antd'
import { useAuth } from '@Shared/context/AuthContext'

const CreateGame = ({ gameName, setGameName, setError, queryGames }) => {
  const { currentUser } = useAuth()
  const formRef = useRef(null)

  useEffect(() => {
    if (gameName.name !== 'default' && gameName.create) {
      const { email, uid } = currentUser
      const name = email.substring(0, email.indexOf('@'))
      queryGames.add({
        name: name,
        id: 1,
        uid: uid,
      })
      setGameName({ name: gameName.name, connect: false, create: false })
    }
  }, [gameName.name, gameName.create])

  const onFinish = ({ game_name }) => {
    console.log('submit game_name:', game_name)
    setGameName({ name: game_name, connect: false, create: true })
    formRef?.current.resetFields()
    setError(null)
  }

  const onFinishFailed = () => {
    setError({ name: 'Error', message: `Please enter game's name.` })
  }

  return (
    <div className="init-game__input create-game">
      <Form name="create_game" layout="inline" ref={formRef} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item
          label="Create game"
          name="game_name"
          required
          tooltip="Will be your game name!"
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
            <span className="submit-btn-text">Create</span>
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

CreateGame.propTypes = {
  gameName: PropTypes.shape({
    name: PropTypes.string,
    connect: PropTypes.bool,
    create: PropTypes.bool,
  }),
  queryGames: PropTypes.shape({
    add: PropTypes.func,
  }),
  setError: PropTypes.func,
  setGameName: PropTypes.func,
}

export default memo(CreateGame)
