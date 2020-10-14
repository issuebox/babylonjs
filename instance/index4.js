// Create scene
var canvas = document.getElementById("canvas");
var engine = new BABYLON.Engine(canvas, true);

async function init() {
  var scene = new BABYLON.Scene(engine);

  await BABYLON.SceneLoader.ImportMeshAsync(
    "",
    "./assets/",
    "ylw-thumb.glb",

    scene
  );
  alert("file loaded!");
  scene.createDefaultCameraOrLight(true, true, true);
  engine.runRenderLoop(function () {
    scene.render();
  });

  window.addEventListener("resize", function () {
    engine.resize();
  });
}
init();
