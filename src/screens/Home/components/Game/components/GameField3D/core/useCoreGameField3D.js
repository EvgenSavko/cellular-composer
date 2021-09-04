import { useRef, useEffect, useState } from 'react'

import { Scene, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'

import { useAuth } from '@Shared/context/AuthContext'
import { initCamera, initGround, coreAnimation, initHelpers, creatPlayer, handleAction } from './utility'

const useCoreGameField3D = ({ gamesCollection, queryGames }) => {
  const {
    currentUser: { uid },
  } = useAuth()

  const gameDomElement = useRef(null)
  const [config3D, setConfig3D] = useState(null)

  const currentPlayer = gamesCollection?.find((player) => player.uid === uid)

  const keys = useRef({})
  const frameId = useRef(null)

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

    if (currentPlayer && config3D) interval = handleAction(config3D, keys)

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
    const currentPlayer = creatPlayer({ color: 'red', position: { x: 1, y: 1 } })
    scene.add(currentPlayer)

    //Axes helper
    const axesHelper = initHelpers(scene)
    scene.add(axesHelper)

    // Collection of models
    const models = {
      groundField,
      currentPlayer,
    }

    setConfig3D({ models, controls, renderer, scene, camera, otherPlayers: {} })

    return () => {
      console.log('unmount 3D Game')
      gameDomElement?.current?.removeChild(renderer.domElement)
    }
  }, [])

  const submitPackageActionCurrentPlayer = () => {
    return setInterval(() => {
      // console.log('packageActionCurrentPlayer')
      const currentPlayerLocal = { ...config3D.models.currentPlayer }
      const x = currentPlayerLocal.position.x
      const z = currentPlayerLocal.position.z
      const y = currentPlayerLocal.position.y

      if (currentPlayer?.positionX !== x || currentPlayer?.positionY !== y || currentPlayer?.positionZ !== z) {
        queryGames.doc(uid).update({
          positionX: x,
          positionY: y,
          positionZ: z,
        })
      }
    }, 100)
  }

  // Interval for sending users package
  useEffect(() => {
    let interval = submitPackageActionCurrentPlayer()
    return () => {
      clearInterval(interval)
    }
  }, [currentPlayer])

  useEffect(() => {
    if (config3D && gamesCollection?.length) {
      gamesCollection.forEach((user) => {
        if (user.uid !== uid) {
          if (!config3D.otherPlayers.hasOwnProperty(user.uid)) {
            const { scene } = config3D
            const otherPlayer = creatPlayer({
              color: 'blue',
              position: { x: user.positionX || 1, y: user.positionY || 1, z: user.positionZ },
            })
            scene.add(otherPlayer)

            setConfig3D({ ...config3D, otherPlayers: { ...config3D.otherPlayers, [user.uid]: otherPlayer } })
          } else if (config3D.otherPlayers.hasOwnProperty(user.uid)) {
            gsap.to(config3D.otherPlayers[user.uid].position, {
              duration: 0.35,
              x: user.positionX,
              y: user.positionY,
              z: user.positionZ,
            })
          }
        }
      })
    }
  }, [gamesCollection])

  // console.log('REFRESH')
  // console.log('gamesCollection', gamesCollection)
  // console.log('config3D', config3D)

  return { gameDomElement }
}

export default useCoreGameField3D
