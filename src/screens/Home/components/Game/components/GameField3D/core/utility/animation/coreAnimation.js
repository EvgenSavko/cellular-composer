export const coreAnimation = ({ models, controls, renderer, scene, camera }) => {
  const { groundField } = models
  groundField.rotation.z -= 0.003

  controls.update()
  renderer.render(scene, camera)
}
