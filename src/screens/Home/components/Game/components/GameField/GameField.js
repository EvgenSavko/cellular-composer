import React, { useEffect, memo, useState, useCallback } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import { useAuth } from '@Shared/context/AuthContext'
import LoadingAlert from '@Components/LoadingAlert'

const indexToColor = {
  0: 'red',
  1: 'green',
  2: 'blue',
  3: 'black',
}

const Player = memo(({ index, left, bottom }) => {
  const getStyle = ({ positionX, positionY }, index) => {
    const pX = positionX === null ? index * 10 : positionX
    const pY = positionY === null ? index * 10 : positionY

    return { left: pX, bottom: pY }
  }

  return (
    <div
      className={`player player--color-${indexToColor[index]}`}
      style={getStyle({ positionX: left, positionY: bottom }, index)}
    ></div>
  )
})

Player.propTypes = {
  bottom: PropTypes.number,
  index: PropTypes.number,
  left: PropTypes.number,
}

const GameField = ({ gamesCollection, loadingGame, queryGames }) => {
  const {
    currentUser: { uid },
  } = useAuth()
  const [state, setState] = useState(0)
  const currentPlayer = gamesCollection?.find((player) => player.uid === uid)

  //TODO  implement handling of pressing two buttons

  const handleUserKeyPress = useCallback(
    (event) => {
      console.log('keypress')
      const key = event.key // keydown: "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
      console.log(key)

      if (currentPlayer) {
        const position = {
          x: currentPlayer.positionX,
          y: currentPlayer.positionY,
        }
        if (key === 'w') position.y += 10
        if (key === 'd') position.x += 10
        if (key === 's') position.y -= 10
        if (key === 'a') position.x -= 10
        else setState(state + 1)
        console.log('currentPlayer', currentPlayer)
        console.log('new position', position)

        queryGames.doc(uid).update({
          positionX: position.x,
          positionY: position.y,
        })
      }
    },
    [currentPlayer?.positionX, currentPlayer?.positionY, state]
  )

  useEffect(() => {
    document.addEventListener('keypress', handleUserKeyPress, {
      once: true,
      // passive: true,
      // capture: true,
    })

    return () => {
      console.log('unmount')
      document.removeEventListener('keypress', handleUserKeyPress)
    }
  }, [handleUserKeyPress])

  return (
    <div className="game-field">
      game-field
      {loadingGame && <LoadingAlert message="Creating game..." description="Wait for users to join." />}
      {gamesCollection?.map((player, index) => (
        <Player key={player.id} index={index} left={player.positionX} bottom={player.positionY} />
      ))}
    </div>
  )
}

GameField.propTypes = {
  gamesCollection: PropTypes.array,
  loadingGame: PropTypes.bool,
  queryGames: PropTypes.shape({
    update: PropTypes.func,
    doc: PropTypes.func,
  }),
}

export default GameField
