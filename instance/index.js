// Create scene
var canvas = document.getElementById('canvas');
var engine = new BABYLON.Engine(canvas, true);

async function init () {

  var scene = new BABYLON.Scene(engine);
  // var spheres = []
  // for(var i = 0;i< 4;i++){
  //     var sphere = BABYLON.Mesh.CreateIcoSphere("sphere", {radius:0.2, flat:true, subdivisions: 1}, this.scene);
  //     sphere.scaling.x = 2
  //     sphere.material = new BABYLON.StandardMaterial("sphere material",scene)
  //     sphere.position.x = i-1.5
  //     sphere.position.z = 5
  //     spheres.push(sphere)
  // }

  var sphere = BABYLON.Mesh.CreateIcoSphere("sphere", {radius:0.2}, this.scene);
  sphere.scaling.x = 2
  // sphere.material = new BABYLON.StandardMaterial("sphere material",scene)
  sphere.position.x = 1.5
  sphere.position.z = 5

  console.log('a')
  var light = new BABYLON.DirectionalLight("light", new BABYLON.Vector3(0, -0.5, 1.0), scene);
  light.position = new BABYLON.Vector3(0, 5, -2);
  // var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 0, 0), scene);
  // camera.attachControl(canvas)
  // scene.createDefaultCamera(true, true, true)

  // Position
  // var gizmo = new BABYLON.AxisDragGizmo(new BABYLON.Vector3(0,1,0), BABYLON.Color3.FromHexString("#00b894"))
  // gizmo.attachedMesh = spheres[0]
  // // Create custom mesh
  // var material = new BABYLON.StandardMaterial("", gizmo.gizmoLayer.utilityLayerScene);
  // material.emissiveColor = BABYLON.Color3.Red()
  // var customMesh = BABYLON.MeshBuilder.CreateBox("", {size: 0.1}, gizmo.gizmoLayer.utilityLayerScene)
  // customMesh.scaling.y = 3
  // customMesh.position.y = 0.15
  // customMesh.material = material
  // gizmo.setCustomMesh(customMesh)

  // // Rotation
  // var gizmo = new BABYLON.PlaneRotationGizmo(new BABYLON.Vector3(0,0,1), BABYLON.Color3.FromHexString("#00b894"))
  // gizmo.attachedMesh = spheres[1]
  // // Create custom mesh
  // var material = new BABYLON.StandardMaterial("", gizmo.gizmoLayer.utilityLayerScene);
  // material.emissiveColor = BABYLON.Color3.Red()
  // var customMesh = BABYLON.MeshBuilder.CreateCylinder("", {height: 0.1, diameter: 0.2}, gizmo.gizmoLayer.utilityLayerScene)
  // customMesh.rotation.x = Math.PI/2
  // customMesh.material = material
  // gizmo.setCustomMesh(customMesh)

  // // Scaling
  // var gizmo = new BABYLON.AxisScaleGizmo(new BABYLON.Vector3(0,1,0), BABYLON.Color3.FromHexString("#00b894"))
  // gizmo.attachedMesh = spheres[2]
  // // Create custom mesh
  // var material = new BABYLON.StandardMaterial("", gizmo.gizmoLayer.utilityLayerScene);
  // material.emissiveColor = BABYLON.Color3.Red()
  // var customMesh = BABYLON.MeshBuilder.CreateBox("", {size: 0.1}, gizmo.gizmoLayer.utilityLayerScene)
  // customMesh.scaling.y = 3
  // customMesh.position.y = 0.15
  // customMesh.material = material
  // gizmo.setCustomMesh(customMesh)

  // spheres[0].dispose()
  // spheres[1].dispose()
  // spheres[2].dispose()

  scene.createDefaultCamera(true, true, true)

  // Multi-gizmo
  var gizmo = new BABYLON.PositionGizmo()
  gizmo.attachedMesh = sphere
  // Create custom mesh
  var material = new BABYLON.StandardMaterial("", gizmo.gizmoLayer.utilityLayerScene);
  material.emissiveColor = BABYLON.Color3.Red()
  // var customMesh = BABYLON.MeshBuilder.CreateBox("", {size: 0.1}, gizmo.gizmoLayer.utilityLayerScene)
  var customMesh = BABYLON.MeshBuilder.CreateBox("", {size: 0.1}, gizmo.gizmoLayer.utilityLayerScene)
  customMesh.scaling.y = 3
  customMesh.position.y = 0.2
  customMesh.material = material
  gizmo.yGizmo.setCustomMesh(customMesh)

  // customMesh.parent = sphere
  

  engine.runRenderLoop(function() {
    scene.render();
  });

  window.addEventListener('resize', function() {
    engine.resize();
  });
};
init();