import React, { useEffect, memo, useState, useCallback, useRef } from 'react'
import PropTypes from 'prop-types'

import { useAuth } from '@Shared/context/AuthContext'
import { UP_KEY, DOWN_KEY, LEFT_KEY, RIGHT_KEY } from '@Shared/constants/constants'
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
  const keys = useRef([])
  //TODO  implement handling of pressing two buttons

  const handleUserKeyDown = useCallback(
    (event) => {
      console.log('keypress Down')
      const key = event.which

      if (!keys.current.includes(key)) keys.current.push(key)

      if (currentPlayer) {
        const position = {
          x: currentPlayer.positionX,
          y: currentPlayer.positionY,
        }

        if (keys.current.length === 2) {
          console.log('DOUBLE PRESS')
          if (keys.current.includes(UP_KEY) && keys.current.includes(RIGHT_KEY)) {
            position.y += 30
            position.x += 30
          }
          if (keys.current.includes(UP_KEY) && keys.current.includes(LEFT_KEY)) {
            position.y += 30
            position.x -= 30
          }
          if (keys.current.includes(RIGHT_KEY) && keys.current.includes(DOWN_KEY)) {
            position.y -= 30
            position.x += 30
          }
          if (keys.current.includes(LEFT_KEY) && keys.current.includes(DOWN_KEY)) {
            position.y -= 30
            position.x -= 30
          }

          // Wrong pressing
          if (keys.current.includes(LEFT_KEY) && keys.current.includes(RIGHT_KEY)) {
            setState(state + 1)
          }
        } else if (keys.current.length === 1) {
          if (keys.current.includes(UP_KEY)) position.y += 10
          if (keys.current.includes(DOWN_KEY)) position.y -= 10
          if (keys.current.includes(RIGHT_KEY)) position.x += 10
          if (keys.current.includes(LEFT_KEY)) position.x -= 10
        }

        const availableControlsButtons = [UP_KEY, DOWN_KEY, RIGHT_KEY, LEFT_KEY]
        if (!availableControlsButtons.includes(key)) setState(state + 1)

        queryGames.doc(uid).update({
          positionX: position.x,
          positionY: position.y,
        })
      }
    },
    [currentPlayer?.positionX, currentPlayer?.positionY, state]
  )

  const handleUserKeyUp = useCallback(() => {
    console.log('keypress UP')
    console.log(' keys.current', keys.current)
    keys.current = []
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', handleUserKeyDown, {
      once: true,
      // passive: true,
      // capture: true,
    })
    document.addEventListener('keyup', handleUserKeyUp, {
      once: true,
    })
    return () => {
      console.log('unmount')
      document.removeEventListener('keydown', handleUserKeyDown)
      document.removeEventListener('keyup', handleUserKeyUp)
    }
  }, [handleUserKeyDown, handleUserKeyUp])

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
