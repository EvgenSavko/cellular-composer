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
  const currentPlayer = gamesCollection?.find((player) => player.uid === uid)

  const position = useRef({
    x: 0,
    y: 0,
  })

  const keys = useRef({})

  function action() {
    return setInterval(function () {
      if (keys.current[UP_KEY]) {
        position.current.y += 10
      }
      if (keys.current[DOWN_KEY]) {
        position.current.y -= 10
      }
      if (keys.current[RIGHT_KEY]) {
        position.current.x += 10
      }
      if (keys.current[LEFT_KEY]) {
        position.current.x -= 10
      }
      if (currentPlayer?.positionX !== position.current.x || currentPlayer?.positionY !== position.current.y) {
        console.log('SUBMIT11')
        queryGames.doc(uid).update({
          positionX: position.current.x,
          positionY: position.current.y,
        })
      }
    }, 50)
  }

  const handlePressDown = (e) => {
    console.log(123)
    keys.current[e.keyCode] = true
  }
  const handlePressUp = (e) => {
    keys.current[e.keyCode] = false
  }

  useEffect(() => {
    console.log(222)
    document.addEventListener('keydown', handlePressDown)
    document.addEventListener('keyup', handlePressUp)

    let interval
    if (currentPlayer) interval = action()

    return () => {
      console.log('unmount')
      document.removeEventListener('keydown', handlePressDown)
      document.removeEventListener('keyup', handlePressUp)
      clearInterval(interval)
    }
  }, [currentPlayer])

  console.log('REFRESH')

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
