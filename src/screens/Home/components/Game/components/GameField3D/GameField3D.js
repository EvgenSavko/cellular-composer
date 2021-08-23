import React, { useRef, useEffect } from 'react'

import { Scene, PerspectiveCamera, WebGLRenderer, PlaneGeometry, DoubleSide, MeshBasicMaterial, Mesh } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const GameField3D = () => {
  const gameDomElement = useRef(null)

  useEffect(() => {
    // Scene
    const scene = new Scene()

    // Camera
    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 22

    // Renderer
    const renderer = new WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    gameDomElement.current.appendChild(renderer.domElement)

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.update()

    // Floor plane
    const geometry = new PlaneGeometry(14, 8)
    const material = new MeshBasicMaterial({ color: 0xd3d3d3, side: DoubleSide })
    const plane = new Mesh(geometry, material)
    plane.rotation.x = 80
    scene.add(plane)

    // Animation
    const animate = function () {
      requestAnimationFrame(animate)

      //   plane.rotation.x += 0.01
      //   plane.rotation.y += 0.01

      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      console.log('unmount 3D Game')
      gameDomElement?.current?.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div>
      <div ref={gameDomElement} id="3d-game"></div>
    </div>
  )
}

export default GameField3D
