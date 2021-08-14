import React, { useEffect, memo, useState, useRef } from 'react'
import PropTypes from 'prop-types'

import gsap from 'gsap'

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

    return { x: pX, y: pY * -1, duration: 1 }
  }

  useEffect(() => {
    gsap.to(`.player--color-${indexToColor[index]}`, getStyle({ positionX: left, positionY: bottom }, index))
  })

  return <div className={`player player--color-${indexToColor[index]}`}></div>
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

  const [localPosition, setLocalPosition] = useState({ x: 0, y: 0 })
  const position = useRef({
    x: 0,
    y: 0,
  })

  const keys = useRef({})

  const handleAction = () => {
    return setInterval(function () {
      if (keys.current[UP_KEY]) {
        position.current.y += 10
        setLocalPosition({ ...localPosition, y: (localPosition.y += 10) })
      }
      if (keys.current[DOWN_KEY]) {
        position.current.y -= 10
        setLocalPosition({ ...localPosition, y: (localPosition.y -= 10) })
      }
      if (keys.current[RIGHT_KEY]) {
        position.current.x += 10
        setLocalPosition({ ...localPosition, x: (localPosition.x += 10) })
      }
      if (keys.current[LEFT_KEY]) {
        position.current.x -= 10
        setLocalPosition({ ...localPosition, x: (localPosition.x -= 10) })
      }
    }, 50)
  }

  const submitPackageActionCurrentPlayer = () => {
    return setInterval(function () {
      // console.log('packageActionCurrentPlayer')

      if (currentPlayer?.positionX !== localPosition.x || currentPlayer?.positionY !== localPosition.y) {
        // console.log('SUBMIT', localPosition.x)
        queryGames.doc(uid).update({
          positionX: localPosition.x,
          positionY: localPosition.y,
        })
      }
    }, 300)
  }

  const handlePressDown = (e) => {
    // console.log('handlePressDown')
    keys.current[e.keyCode] = true
  }
  const handlePressUp = (e) => {
    keys.current[e.keyCode] = false
  }

  // Interval (Frame) for actions push buttons
  useEffect(() => {
    // console.log('useEffect ')
    document.addEventListener('keydown', handlePressDown)
    document.addEventListener('keyup', handlePressUp)

    let interval
    if (currentPlayer) interval = handleAction()

    return () => {
      // console.log('unmount')
      document.removeEventListener('keydown', handlePressDown)
      document.removeEventListener('keyup', handlePressUp)
      clearInterval(interval)
    }
  }, [currentPlayer])

  // Interval for sending users package
  useEffect(() => {
    let interval = submitPackageActionCurrentPlayer()
    return () => {
      // console.log('unmount 2')
      clearInterval(interval)
    }
  }, [currentPlayer])

  // console.log('REFRESH')

  return (
    <div className="game-field">
      game-field
      {loadingGame && <LoadingAlert message="Creating game..." description="Wait for users to join." />}
      {gamesCollection?.map(
        (player, index) =>
          player.uid !== uid && (
            <Player key={player.id} index={index + 1} left={player.positionX} bottom={player.positionY} />
          )
      )}
      <Player index={0} left={localPosition.x} bottom={localPosition.y} />
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
