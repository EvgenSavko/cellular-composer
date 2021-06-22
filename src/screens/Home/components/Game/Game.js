import React, { useState, useCallback, memo } from 'react'

import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Typography, Button, Spin } from 'antd'

import firebase from '@Shared/firebase/firebase'
import ModalError from '@Components/ModalError'
import CreateGame from './CreateGame'
import ConnectToGame from './ConnectToGame'
const { Title } = Typography

const initGame = { name: 'default', create: false, connect: false }

const Game = () => {
  const [error, setError] = useState(null)
  const [gameName, setGameName] = useState(initGame)
  const queryGames = firebase.firestore().collection(gameName.name)
  const [gamesCollection, loadingGame, errorCollection] = useCollectionData(queryGames)

  const renderModalError = useCallback(() => {
    let errorProps = null
    if (error) errorProps = error
    if (errorCollection) errorProps = errorCollection

    return errorProps && <ModalError error={errorProps} />
  }, [error, errorCollection])

  console.log('gamesCollection:', gamesCollection)

  return (
    <div className="game">
      <div className="padding-container">
        <div className="title-wrapper">
          <Title level={3}>
            GAME "{gameName.name !== 'default' ? gameName.name : 'connect or create game'}"{' '}
            {loadingGame && <Spin size="small" />}
          </Title>
          {gameName.name !== 'default' && (
            <Button danger onClick={() => setGameName(initGame)}>
              <span className="submit-btn-text">Quit game</span>
            </Button>
          )}
        </div>

        {renderModalError()}
        <div className="padding-container init-game">
          <CreateGame gameName={gameName} setGameName={setGameName} setError={setError} queryGames={queryGames} />
          <ConnectToGame gameName={gameName} setGameName={setGameName} setError={setError} queryGames={queryGames} />
        </div>
      </div>
    </div>
  )
}

export default memo(Game)
