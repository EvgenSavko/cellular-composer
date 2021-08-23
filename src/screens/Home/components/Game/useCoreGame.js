import React, { useEffect, useRef, useState, useCallback } from 'react'

import { useCollectionData } from 'react-firebase-hooks/firestore'
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/all'

import { useAuth } from '@Shared/context/AuthContext'
import firebase from '@Shared/firebase/firebase'
import ModalError from '@Components/ModalError'

gsap.registerPlugin(ScrollToPlugin)
const initGame = { name: 'default', create: false, connect: false }
const LIST_OF_EXISTING_GAMES = 'list_of_existing_games'

const useGameLogicHook = () => {
  const { currentUser } = useAuth()
  const [viewTypeGame, setViewTypeGame] = useState('2D')
  const [error, setError] = useState(null)
  const [gameName, setGameName] = useState(initGame)
  const queryGames = firebase.firestore().collection(gameName?.name)
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

  const handleViewTypeGame = (e) => {
    setViewTypeGame(e.target.value)
  }

  //Animation of a moving shape that initializes the game
  useEffect(() => {
    // console.log('gameName.name', gameName.name)
    if (gameName.name !== 'default') {
      gsap.to(`.init-game-wrapper`, { position: 'relative', overflow: 'hidden', height: 160 })
      gsap.to(`.init-game`, { x: 0, y: 100, position: 'absolute' })

      gsap.to(`.init-game-wrapper`, { height: 60, duration: 1 })
      gsap.to(`.init-game`, { x: 0, y: 160, duration: 1 })
    } else {
      gsap.to(`.init-game-wrapper`, { height: 160, duration: 1 })
      gsap.to(`.init-game`, { x: 0, y: 0, duration: 1 })

      gsap.to(`.init-game-wrapper`, { position: 'relative', overflow: 'unset', height: 'unset' })
      gsap.to(`.init-game`, { position: 'relative' })
    }
  }, [gameName.name])

  //viewTypeGame

  useEffect(() => {
    if (gameName.name !== 'default' && viewTypeGame === '3D') {
      gsap.to(window, 1, {
        scrollTo: {
          y: 130,
          autoKill: true,
        },
        ease: 'power2.out',
      })
    }
  }, [gameName.name, viewTypeGame])

  return {
    queryListOfGames,
    gamesCollection,
    listOfGamesCollection,
    viewTypeGame,
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
    handleViewTypeGame,
  }
}

export default useGameLogicHook
