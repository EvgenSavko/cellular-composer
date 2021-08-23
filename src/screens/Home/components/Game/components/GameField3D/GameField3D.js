import React from 'react'
import PropTypes from 'prop-types'

import useEscapeHook from '@Shared/hooks/useEscapeHook'
import useCoreGameField3D from './hook/useCoreGameField3D'

const GameField3D = ({ handleDeleteGame }) => {
  useEscapeHook(handleDeleteGame)
  const { gameDomElement } = useCoreGameField3D()

  return (
    <div>
      <div ref={gameDomElement} id="3d-game"></div>
    </div>
  )
}

GameField3D.propTypes = {
  handleDeleteGame: PropTypes.func,
}

export default GameField3D
