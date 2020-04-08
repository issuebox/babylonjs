var canvas = document.getElementById('canvas')
var engine = new BABYLON.Engine(canvas, true)
var scene = new BABYLON.Scene(engine)
// BABYLON.Database.IDBStorageEnabled = true
scene.clearColor = false
async function init() {


  const hdrTexture = await new Promise(resolve => {
    const hdr = new BABYLON.HDRCubeTexture(
      './product.hdr',
      // 'https://playground.babylonjs.com/textures/parking.hdr',
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

  const { meshes: products } = await BABYLON.SceneLoader.ImportMeshAsync(
    '',
    // './',
    // 'wns.glb',
    'https://www.babylonjs-playground.com/scenes/',
    // 'BoomBox.glb',
    'seagulf.glb',
    scene
  )
  window.products = products

  scene.createDefaultCamera(true, true, true)
  engine.runRenderLoop(function() {
    scene.render()
  })

  window.addEventListener('resize', function() {
    engine.resize()
  })
}
init()
