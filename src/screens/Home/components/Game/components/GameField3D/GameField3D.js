import React from 'react'
import PropTypes from 'prop-types'

import useEscapeHook from '@Shared/hooks/useEscapeHook'
import LoadingAlert from '@Components/LoadingAlert'
import useCoreGameField3D from './core/useCoreGameField3D'

const GameField3D = ({ handleDeleteGame, loadingGame, gamesCollection, queryGames }) => {
  useEscapeHook(handleDeleteGame, gamesCollection)
  const { gameDomElement } = useCoreGameField3D({ gamesCollection, queryGames })

  return (
    <div>
      {loadingGame && <LoadingAlert message="Creating game..." description="Wait for users to join." />}
      <div ref={gameDomElement} id="3d-game"></div>
    </div>
  )
}

GameField3D.propTypes = {
  handleDeleteGame: PropTypes.func,
  gamesCollection: PropTypes.array,
  loadingGame: PropTypes.bool,
  queryGames: PropTypes.shape({
    update: PropTypes.func,
    doc: PropTypes.func,
  }),
}

export default GameField3D
