import React, { memo } from 'react'

import CreateGame from './components/CreateGame'
import ConnectToGame from './components/ConnectToGame'
import GameField from './components/GameField'
import useCoreGame from './useCoreGame'
import GameField3D from './components/GameField3D/GameField3D'
import TitleBlock from './components/TitleBlock'

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
    viewTypeGame,
    setGameName,
    setError,
    handleDeleteGame,
    logOutOfGame,
    renderModalError,
    handleViewTypeGame,
  } = useCoreGame()

  const renderViewTypeGame = () => {
    switch (viewTypeGame) {
      case '2D':
        return <GameField gamesCollection={gamesCollection} loadingGame={loadingGame} queryGames={queryGames} />
      case '3D':
        return <GameField3D handleDeleteGame={handleDeleteGame} />
      default:
        return <GameField3D handleDeleteGame={handleDeleteGame} />
    }
  }

  return (
    <div className="game">
      <div className="padding-container init-game-wrapper">
        <TitleBlock
          viewTypeGame={viewTypeGame}
          amIGameCreator={amIGameCreator}
          gameName={gameName}
          loadingGame={loadingGame}
          loadingListGame={loadingListGame}
          handleViewTypeGame={handleViewTypeGame}
          handleDeleteGame={handleDeleteGame}
          logOutOfGame={logOutOfGame}
        />
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
      {gameName.name !== 'default' && renderViewTypeGame()}
      {/* <GameField3D /> */}
    </div>
  )
}

export default memo(Game)
