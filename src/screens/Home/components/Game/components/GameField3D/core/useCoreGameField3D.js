import { useRef, useEffect, useState } from 'react'

import { Scene, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { initCamera, initGround, coreAnimation, initHelpers } from './utility'

const useCoreGameField3D = () => {
  const gameDomElement = useRef(null)
  const [config3D, setConfig3D] = useState(null)

  useEffect(() => {
    // Animation
    const animate = () => {
      requestAnimationFrame(animate)
      coreAnimation(config3D)
    }

    config3D && animate()
  }, [config3D])

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

    //Axes helper
    const axesHelper = initHelpers(scene)
    scene.add(axesHelper)

    // Collection of models
    const models = {
      groundField,
    }

    setConfig3D({ models, controls, renderer, scene, camera })

    return () => {
      console.log('unmount 3D Game')
      gameDomElement?.current?.removeChild(renderer.domElement)
    }
  }, [])

  return { gameDomElement }
}

export default useCoreGameField3D
