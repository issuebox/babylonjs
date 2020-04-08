var canvas = document.getElementById('canvas')
var engine = new BABYLON.Engine(canvas, true)
var scene = new BABYLON.Scene(engine)
BABYLON.Database.IDBStorageEnabled = true
scene.clearColor = false
async function init() {

  const { meshes: products } = await BABYLON.SceneLoader.ImportMeshAsync(
    '',
    './',
    'wns.glb',
    scene
  )
  window.products = products

  const { meshes } = await BABYLON.SceneLoader.ImportMeshAsync(
    '',
    './',
    'sphere.glb',
    scene
  )
  window.meshes = meshes
  const mesh = meshes[1]


  mesh.isVisible = false

  const mesh1 = mesh.clone('i1', null)
  const mesh2 = mesh.clone('i2', null)
  mesh2.position.y = -5
  

  scene.debugLayer.show()

  scene.createDefaultCamera(true, true, true)
  engine.runRenderLoop(function() {
    scene.render()
  })
  const hdrTexture = await new Promise(resolve => {
    const hdr = new BABYLON.HDRCubeTexture(
      './product.hdr',
      scene,
      32,
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

  window.addEventListener('resize', function() {
    engine.resize()
  })
}
init()
