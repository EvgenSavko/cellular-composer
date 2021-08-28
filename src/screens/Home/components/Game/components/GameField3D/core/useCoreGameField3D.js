import { useRef, useEffect, useState } from 'react'

import { Scene, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'

import { initCamera, initGround, coreAnimation, initHelpers, creatPlayer } from './utility'
import { UP_KEY, DOWN_KEY, LEFT_KEY, RIGHT_KEY } from '@Shared/constants/constants'

const useCoreGameField3D = () => {
  const gameDomElement = useRef(null)
  const [config3D, setConfig3D] = useState(null)

  const currentPlayer = true // TODO get from Firebase

  const keys = useRef({})
  const frameId = useRef(null)

  const isMultiAction = (actionsObject) => {
    const actions = Object.values(actionsObject)
    return actions.filter(Boolean).length > 1
  }

  // Handle pushing buttons.
  const handleAction = () => {
    return setInterval(() => {
      const currentPlayer = { ...config3D.models.currentPlayer }
      const isMulti = isMultiAction(keys.current)

      // Multi moving
      // UP_KEY RIGHT_KEY
      if (keys.current[UP_KEY] && keys.current[RIGHT_KEY]) {
        gsap.to(currentPlayer.position, {
          duration: 0.5,
          x: currentPlayer.position.x + 0.7,
          y: currentPlayer.position.y,
          z: currentPlayer.position.z + 0.7,
        })
      }

      // UP_KEY LEFT_KEY
      if (keys.current[UP_KEY] && keys.current[LEFT_KEY]) {
        gsap.to(currentPlayer.position, {
          duration: 0.5,
          x: currentPlayer.position.x + 0.7,
          y: currentPlayer.position.y,
          z: currentPlayer.position.z - 0.7,
        })
      }

      // DOWN_KEY LEFT_KEY
      if (keys.current[DOWN_KEY] && keys.current[LEFT_KEY]) {
        gsap.to(currentPlayer.position, {
          duration: 0.5,
          x: currentPlayer.position.x - 0.7,
          y: currentPlayer.position.y,
          z: currentPlayer.position.z - 0.7,
        })
      }

      // DOWN_KEY RIGHT_KEY
      if (keys.current[DOWN_KEY] && keys.current[RIGHT_KEY]) {
        gsap.to(currentPlayer.position, {
          duration: 0.5,
          x: currentPlayer.position.x - 0.7,
          y: currentPlayer.position.y,
          z: currentPlayer.position.z + 0.7,
        })
      }

      // Single moving
      // UP_KEY
      if (keys.current[UP_KEY] && !isMulti) {
        gsap.to(currentPlayer.position, {
          duration: 0.5,
          x: currentPlayer.position.x + 0.7,
          y: currentPlayer.position.y,
          z: currentPlayer.position.z,
        })
      }

      // DOWN_KEY
      if (keys.current[DOWN_KEY] && !isMulti) {
        gsap.to(currentPlayer.position, {
          duration: 0.5,
          x: currentPlayer.position.x - 0.7,
          y: currentPlayer.position.y,
          z: currentPlayer.position.z,
        })
      }

      // RIGHT_KEY
      if (keys.current[RIGHT_KEY] && !isMulti) {
        gsap.to(currentPlayer.position, {
          duration: 0.5,
          x: currentPlayer.position.x,
          y: currentPlayer.position.y,
          z: currentPlayer.position.z + 0.7,
        })
      }

      // LEFT_KEY
      if (keys.current[LEFT_KEY] && !isMulti) {
        gsap.to(currentPlayer.position, {
          duration: 0.5,
          x: currentPlayer.position.x,
          y: currentPlayer.position.y,
          z: currentPlayer.position.z - 0.7,
        })
      }
    }, 150) //50
  }

  // Actions buttons.
  const handlePressDown = (e) => {
    keys.current[e.keyCode] = true
  }
  const handlePressUp = (e) => {
    keys.current[e.keyCode] = false
  }

  // Interval (update frame) for actions push buttons.
  useEffect(() => {
    document.addEventListener('keydown', handlePressDown)
    document.addEventListener('keyup', handlePressUp)

    let interval

    if (currentPlayer && config3D) interval = handleAction()

    return () => {
      // console.log('unmount keydown keyup')
      document.removeEventListener('keydown', handlePressDown)
      document.removeEventListener('keyup', handlePressUp)
      clearInterval(interval)
    }
  }, [config3D, currentPlayer])

  // Three.js animation (update frame)
  useEffect(() => {
    // Animation
    console.log('update config3D', config3D)
    const animate = () => {
      frameId.current = requestAnimationFrame(animate)
      coreAnimation(config3D)
    }

    config3D && animate()

    return () => {
      cancelAnimationFrame(frameId.current)
    }
  }, [config3D])

  // Init Three.js
  useEffect(() => {
    // Scene
    const scene = new Scene()

    // Camera
    const camera = initCamera()

    // Renderer
    const renderer = new WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    gameDomElement.current.appendChild(renderer.domElement)

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.update()

    // Ground field "plane"
    const groundField = initGround()
    scene.add(groundField)

    //Init current player
    const currentPlayer = creatPlayer({ color: 'red', position: { x: 1 } })
    scene.add(currentPlayer)

    //Axes helper
    const axesHelper = initHelpers(scene)
    scene.add(axesHelper)

    // Collection of models
    const models = {
      groundField,
      currentPlayer,
    }

    setConfig3D({ models, controls, renderer, scene, camera })

    return () => {
      console.log('unmount 3D Game')
      gameDomElement?.current?.removeChild(renderer.domElement)
    }
  }, [])

  console.log('REFRESH')

  return { gameDomElement }
}

export default useCoreGameField3D
