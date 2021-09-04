import { PerspectiveCamera } from 'three'

export const initCamera = () => {
  const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.z = 17
  camera.position.y = 5
  return camera
}
