import React, { useEffect, useRef, useState, useCallback, memo } from 'react'

import { useCollectionData } from 'react-firebase-hooks/firestore'

import { useAuth } from '@Shared/context/AuthContext'
import firebase from '@Shared/firebase/firebase'
import ModalError from '@Components/ModalError'

const initGame = { name: 'default', create: false, connect: false }
const LIST_OF_EXISTING_GAMES = 'list_of_existing_games'

const useGameLogicHook = () => {
  const { currentUser } = useAuth()
  const [error, setError] = useState(null)
  const [gameName, setGameName] = useState(initGame)
  const queryGames = firebase.firestore().collection(gameName.name)
  const [gamesCollection, loadingGame, errorCollection] = useCollectionData(queryGames.orderBy('time_creat', 'asc')) //desc and asc
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
    if (errorListGame) errorProps = errorListGame

    return errorProps && <ModalError error={errorProps} />
  }, [error, errorCollection, errorListGame])

  // console.log('gamesCollection:', gamesCollection)

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
  return {
    queryListOfGames,
    gamesCollection,
    listOfGamesCollection,
    setGameName,
    setError,
    queryGames,
    gameName,
    loadingGame,
    loadingListGame,
    amIGameCreator,
    handleDeleteGame,
    logOutOfGame,
    renderModalError,
  }
}

export default useGameLogicHook
