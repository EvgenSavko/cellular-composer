import { BoxGeometry, MeshBasicMaterial, Mesh } from 'three'

export const creatPlayer = ({ color = 'black', position }) => {
  const geometry = new BoxGeometry(0.5, 2, 1)
  const material = new MeshBasicMaterial({ color })
  const player = new Mesh(geometry, material)
  player.position.y = position.y || 0
  player.position.x = position.x || 0
  player.position.z = position.z || 0
  return player
}
