import React, { useRef, useEffect, memo } from 'react'
import PropTypes from 'prop-types'

import firebase from '@Shared/firebase/firebase'

import { Form, Input, Button } from 'antd'
import { useAuth } from '@Shared/context/AuthContext'

const CreateGame = ({ gameName, queryListOfGames, listOfGamesCollection = [], setGameName, setError, queryGames }) => {
  const { currentUser } = useAuth()
  const formRef = useRef(null)

  useEffect(() => {
    if (gameName.name !== 'default' && gameName.create) {
      const { email, uid } = currentUser

      const newName = email?.substring(0, email.indexOf('@'))

      const isExist = listOfGamesCollection.some(({ name }) => name === gameName.name)
      if (!isExist && uid && newName) {
        queryGames?.doc(uid).set({
          name: newName,
          id: 1,
          uid: uid,
          game_creator: true,
          positionX: null,
          positionY: null,
          time_creat: firebase.firestore.Timestamp.fromDate(new Date()).toDate(),
        })

        setGameName({ name: gameName.name, connect: false, create: false })
        queryListOfGames.doc(gameName.name).set({
          name: gameName.name,
          creator_iud: uid,
          time_creat: firebase.firestore.Timestamp.fromDate(new Date()).toDate(),
        })
      }
    }
  }, [gameName.name, gameName.create, currentUser.uid])

  //onFinish - means submit
  const onFinish = ({ game_name }) => {
    const isExist = listOfGamesCollection.some(({ name }) => name === game_name)
    if (!isExist) {
      setGameName({ name: game_name, connect: false, create: true })
      firebase.analytics().logEvent('creat_game', { name: game_name })
      setError(null)
    }
    isExist && setError({ name: 'Error', message: `This name is already taken.` })
    formRef?.current.resetFields()
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
          tooltip="Create name for your game!"
          required
          rules={[
            {
              required: true,
              message: 'Please enter game`s name.',
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
  queryListOfGames: PropTypes.shape({
    add: PropTypes.func,
    doc: PropTypes.func,
  }),
  queryGames: PropTypes.shape({
    add: PropTypes.func,
    doc: PropTypes.func,
  }),
  setError: PropTypes.func,
  setGameName: PropTypes.func,
  listOfGamesCollection: PropTypes.array,
}

export default memo(CreateGame)
