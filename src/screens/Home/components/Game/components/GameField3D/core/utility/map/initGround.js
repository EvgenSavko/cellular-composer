import { PlaneGeometry, DoubleSide, MeshBasicMaterial, Mesh } from 'three'

export const initGround = () => {
  const geometry = new PlaneGeometry(24, 14)
  const material = new MeshBasicMaterial({ color: 0xd3d3d3, side: DoubleSide })
  const ground = new Mesh(geometry, material)
  ground.rotation.x = Math.PI / 2
  return ground
}
