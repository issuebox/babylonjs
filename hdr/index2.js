var canvas = document.getElementById('canvas')
var engine = new BABYLON.Engine(canvas, true)
var scene = new BABYLON.Scene(engine)
// BABYLON.Database.IDBStorageEnabled = true
scene.clearColor = false
async function init() {

  // const camera = new BABYLON.UniversalCamera(
  //   'DEFAULT CAMERA',
  //   new BABYLON.Vector3(0, 10, -1000),
  //   scene
  // )
  // camera.speed = 100
  // camera.attachControl(canvas)

  // const hdrTexture = await new Promise(resolve => {
  //   const hdr = new BABYLON.HDRCubeTexture(
  //     'https://playground.babylonjs.com/textures/parking.hdr',
  //     scene,
  //     512,
  //     null,
  //     null,
  //     true,
  //     null,
  //     function() {
  //       resolve(hdr)
  //     }
  //   )
  // })
  // scene.environmentTexture = hdrTexture


  // scene.environmentTexture = new BABYLON.CubeTexture("./parking.env", scene);
  scene.environmentTexture = new BABYLON.CubeTexture("./product.env", scene);

  await BABYLON.SceneLoader.ImportMeshAsync(
    '',
    // 'https://playground.babylonjs.com/scenes/',
    // 'BoomBox.glb',
    'https://hall.cn.gcimg.net/models/zozen/szl/',
    'szl.glb',
    scene
  )
  scene.createDefaultCamera(true, true, true)
  


  engine.runRenderLoop(function() {
    scene.render()
  })

  window.addEventListener('resize', function() {
    engine.resize()
  })
}
init()
