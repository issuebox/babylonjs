var canvas = document.getElementById('canvas')
var engine = new BABYLON.Engine(canvas, true)
var scene = new BABYLON.Scene(engine)
// BABYLON.Database.IDBStorageEnabled = true
scene.clearColor = false
async function init() {

  const hdrTexture = await new Promise(resolve => {
    const hdr = new BABYLON.HDRCubeTexture(
      './parking.hdr',
      scene,
      512,
      null,
      null,
      true,
      null,
      function() {
        resolve(hdr)
      }
    )
  })
  scene.environmentTexture = hdrTexture


  // scene.environmentTexture = new BABYLON.CubeTexture("https://playground.babylonjs.com/textures/parking.env", scene);

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
