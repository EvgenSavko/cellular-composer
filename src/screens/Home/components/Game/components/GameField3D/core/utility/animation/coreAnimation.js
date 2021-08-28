export const coreAnimation = ({ models, controls, renderer, scene, camera }) => {
  // use models here if you want to control this models in game despite user actions.
  // for example set limit square on field or run somme script
  const { groundField, currentPlayer } = models
  // groundField.rotation.z -= 0.003
  // if (currentPlayer.position.x <= 4) currentPlayer.position.x += 0.01
  // console.log('currentPlayer.position', currentPlayer.position)
  controls.update()
  renderer.render(scene, camera)
}
