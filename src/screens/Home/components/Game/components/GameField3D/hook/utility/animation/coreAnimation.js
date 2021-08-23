export const coreAnimation = ({ groundField, controls, renderer, scene, camera }) => {
  groundField.rotation.z -= 0.003

  controls.update()
  renderer.render(scene, camera)
}
