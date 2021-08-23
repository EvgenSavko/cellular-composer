import { PlaneGeometry, DoubleSide, MeshBasicMaterial, Mesh } from 'three'

export const initGround = () => {
  const geometry = new PlaneGeometry(14, 8)
  const material = new MeshBasicMaterial({ color: 0xd3d3d3, side: DoubleSide })
  const plane = new Mesh(geometry, material)
  plane.rotation.x = Math.PI / 2
  return plane
}
