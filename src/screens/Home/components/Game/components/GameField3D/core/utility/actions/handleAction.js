import gsap from 'gsap'

import { UP_KEY, DOWN_KEY, LEFT_KEY, RIGHT_KEY } from '@Shared/constants/constants'

const isMultiAction = (actionsObject) => {
  const actions = Object.values(actionsObject)
  return actions.filter(Boolean).length > 1
}

// Handle pushing buttons.
export const handleAction = (config3D, keys) => {
  return setInterval(() => {
    const currentPlayer = { ...config3D.models.currentPlayer }
    const isMulti = isMultiAction(keys.current)

    // Multi moving
    // UP_KEY RIGHT_KEY
    if (keys.current[UP_KEY] && keys.current[RIGHT_KEY]) {
      gsap.to(currentPlayer.position, {
        duration: 0.35,
        x: currentPlayer.position.x + 0.7,
        y: currentPlayer.position.y,
        z: currentPlayer.position.z + 0.7,
      })
    }

    // UP_KEY LEFT_KEY
    if (keys.current[UP_KEY] && keys.current[LEFT_KEY]) {
      gsap.to(currentPlayer.position, {
        duration: 0.35,
        x: currentPlayer.position.x + 0.7,
        y: currentPlayer.position.y,
        z: currentPlayer.position.z - 0.7,
      })
    }

    // DOWN_KEY LEFT_KEY
    if (keys.current[DOWN_KEY] && keys.current[LEFT_KEY]) {
      gsap.to(currentPlayer.position, {
        duration: 0.35,
        x: currentPlayer.position.x - 0.7,
        y: currentPlayer.position.y,
        z: currentPlayer.position.z - 0.7,
      })
    }

    // DOWN_KEY RIGHT_KEY
    if (keys.current[DOWN_KEY] && keys.current[RIGHT_KEY]) {
      gsap.to(currentPlayer.position, {
        duration: 0.35,
        x: currentPlayer.position.x - 0.7,
        y: currentPlayer.position.y,
        z: currentPlayer.position.z + 0.7,
      })
    }

    // Single moving
    // UP_KEY
    if (keys.current[UP_KEY] && !isMulti) {
      gsap.to(currentPlayer.position, {
        duration: 0.35,
        x: currentPlayer.position.x + 0.7,
        y: currentPlayer.position.y,
        z: currentPlayer.position.z,
      })
    }

    // DOWN_KEY
    if (keys.current[DOWN_KEY] && !isMulti) {
      gsap.to(currentPlayer.position, {
        duration: 0.35,
        x: currentPlayer.position.x - 0.7,
        y: currentPlayer.position.y,
        z: currentPlayer.position.z,
      })
    }

    // RIGHT_KEY
    if (keys.current[RIGHT_KEY] && !isMulti) {
      gsap.to(currentPlayer.position, {
        duration: 0.35,
        x: currentPlayer.position.x,
        y: currentPlayer.position.y,
        z: currentPlayer.position.z + 0.7,
      })
    }

    // LEFT_KEY
    if (keys.current[LEFT_KEY] && !isMulti) {
      gsap.to(currentPlayer.position, {
        duration: 0.35,
        x: currentPlayer.position.x,
        y: currentPlayer.position.y,
        z: currentPlayer.position.z - 0.7,
      })
    }
  }, 50)
}
