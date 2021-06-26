import React, { useEffect, useRef, useState, useCallback, memo } from 'react'

import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Typography, Button, Spin } from 'antd'

import { useAuth } from '@Shared/context/AuthContext'
import firebase from '@Shared/firebase/firebase'
import ModalError from '@Components/ModalError'
import CreateGame from './CreateGame'
import ConnectToGame from './ConnectToGame'
const { Title } = Typography

const initGame = { name: 'default', create: false, connect: false }
const LIST_OF_EXISTING_GAMES = 'list_of_existing_games'
const Game = () => {
  const { currentUser } = useAuth()
  const [error, setError] = useState(null)
  const [gameName, setGameName] = useState(initGame)
  const queryGames = firebase.firestore().collection(gameName.name)
  const [gamesCollection, loadingGame, errorCollection] = useCollectionData(queryGames)
  const amIGameCreator = !!gamesCollection?.find(({ game_creator, uid }) => game_creator && uid === currentUser?.uid)
  const startGame = useRef(false)

  const queryListOfGames = firebase.firestore().collection(LIST_OF_EXISTING_GAMES)
  const [listOfGamesCollection, loadingListGame, errorListGame] = useCollectionData(queryListOfGames)

  const finishTheGame = () => {
    setGameName(initGame)
    startGame.current = false
  }

  useEffect(() => {
    // set status of the game if the game was started
    if (gamesCollection?.length > 0 && !startGame.current && gameName.name !== 'default') {
      startGame.current = true
    }

    // close the game if the game creator has finished the game
    if (gamesCollection?.length === 0 && gameName.name !== 'default' && startGame.current) {
      finishTheGame()
    }
  }, [gamesCollection?.length, gameName.name])

  const renderModalError = useCallback(() => {
    let errorProps = null
    if (error) errorProps = error
    if (errorCollection) errorProps = errorCollection

    return errorProps && <ModalError error={errorProps} />
  }, [error, errorCollection])

  console.log('gamesCollection:', gamesCollection)

  const logOutOfGame = async () => {
    const { uid } = currentUser
    try {
      await queryGames.doc(uid).delete()
      finishTheGame()
    } catch (error) {
      setError(error)
    }
  }

  const handleDeleteGame = async () => {
    try {
      gamesCollection.forEach(async (document) => {
        await queryGames.doc(document.uid).delete()
      })
      await queryListOfGames.doc(gameName.name).delete()
    } catch (error) {
      setError(error)
    }
    finishTheGame()
  }

  return (
    <div className="game">
      <div className="padding-container init-game-wrapper">
        <div className="title-wrapper">
          <Title level={3}>
            GAME "{gameName.name !== 'default' ? gameName.name : 'connect or create game'}"{' '}
            {loadingGame && <Spin size="small" />}
          </Title>
          <div className="init-game-action-block">
            {amIGameCreator && (
              <Button danger onClick={() => handleDeleteGame()}>
                <span className="submit-btn-text">Delete game</span>
              </Button>
            )}
            {gameName.name !== 'default' && (
              <Button danger onClick={() => logOutOfGame()}>
                <span className="submit-btn-text">Quit game</span>
              </Button>
            )}
          </div>
        </div>

        {renderModalError()}
        <div className="padding-container init-game">
          <CreateGame
            gameName={gameName}
            queryListOfGames={queryListOfGames}
            listOfGamesCollection={listOfGamesCollection}
            setGameName={setGameName}
            setError={setError}
            queryGames={queryGames}
          />
          <ConnectToGame gameName={gameName} setGameName={setGameName} setError={setError} queryGames={queryGames} />
        </div>
      </div>
    </div>
  )
}

export default memo(Game)
