import React, { memo } from 'react'

import { Typography, Button, Spin } from 'antd'

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
