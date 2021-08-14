import React, { memo, useEffect } from 'react'

import { Typography, Button, Spin } from 'antd'
import gsap from 'gsap'

import CreateGame from './components/CreateGame'
import ConnectToGame from './components/ConnectToGame'
import GameField from './components/GameField'
import useGameLogicHook from './useGameLogicHook'

const { Title } = Typography

const Game = () => {
  const {
    queryListOfGames,
    queryGames,
    gamesCollection,
    listOfGamesCollection,
    gameName,
    loadingGame,
    loadingListGame,
    amIGameCreator,
    setGameName,
    setError,
    handleDeleteGame,
    logOutOfGame,
    renderModalError,
  } = useGameLogicHook()

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

  return (
    <div className="game">
      <div className="padding-container init-game-wrapper">
        <div className="title-wrapper">
          <Title level={3}>
            GAME: "{gameName.name !== 'default' ? gameName.name : 'connect or create'}"{' '}
            {(loadingGame || loadingListGame) && <Spin size="small" />}
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
      {gameName.name !== 'default' && (
        <GameField gamesCollection={gamesCollection} loadingGame={loadingGame} queryGames={queryGames} />
      )}
    </div>
  )
}

export default memo(Game)
