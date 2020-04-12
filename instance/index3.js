// Create scene
var canvas = document.getElementById('canvas');
var engine = new BABYLON.Engine(canvas, true);

async function init () {

  const scene = new BABYLON.Scene(engine);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);


    const product1 = BABYLON.MeshBuilder.CreateBox('product1', { size: 2 }, scene)

    const product2 = BABYLON.MeshBuilder.CreateBox('product2', { size: 2 }, scene)
    product2.position.y = 2.2


    const [sphere1, mainSphere1, sphere2, mainSphere2] = await new Promise(resolve => {
        BABYLON.SceneLoader.LoadAssetContainer("https://raw.githubusercontent.com/issuebox/babylonjs/master/instance/", "sphere.glb", scene, function (container) {

            container.addAllToScene();

            const entries1 = container.instantiateModelsToScene()
            const sphere1 = entries1.rootNodes[0]
            sphere1.parent = product1
            sphere1.position.x = -0.75
            sphere1.position.z = -1.2

            const mainSphere1 = sphere1.getChildMeshes()[0]
            mainSphere1.actionManager = new BABYLON.ActionManager(scene)
            mainSphere1.actionManager.registerAction(
                new BABYLON.ExecuteCodeAction(
                    BABYLON.ActionManager.OnPickTrigger,
                    () => {
                        alert('customer B --- product3 -- description!')
                    }
                )
            )

            const entries2 = container.instantiateModelsToScene()
            const sphere2 = entries2.rootNodes[0]
            sphere2.parent = product2
            sphere2.position.x = 0.75
            sphere2.position.z = -1.2

            const mainSphere2 = sphere2.getChildMeshes()[0]
            mainSphere2.actionManager = new BABYLON.ActionManager(scene)
            mainSphere2.actionManager.registerAction(
                new BABYLON.ExecuteCodeAction(
                    BABYLON.ActionManager.OnPickTrigger,
                    () => {
                        alert('customer B --- product3 -- description!')
                    }
                )
            )

            for (let group of entries1.animationGroups) {
                group.play(true);
            }

            for (let group of entries2.animationGroups) {
                group.play(true);
            }

            resolve([sphere1, mainSphere1, sphere2, mainSphere2])

            // resolve([spehre1, sphere2])
        });
    })
    window.sphere1 = sphere1
    window.mainSphere1 = mainSphere1
    

    const minSphere1 = sphere1.getChildMeshes()[1]
    window.minSphere1 = minSphere1
    mainSphere1.showBoundingBox = true
    // sphere1.getChildMeshes()[1].doNotSyncBoundingInfo = true

    // create a camera
    scene.createDefaultCamera(true, true, true)

    const camera = scene.activeCamera

    // TODO: how to keep the sphere1 and sphere2 same pixel on the screen ?
    // get the distance from camera to sphere1
    function getDistance() {
        return camera.position.subtract(sphere1.position).length()
    }
    const defaultDistance = getDistance()
    const defaultScaling = sphere1.scaling
    scene.registerAfterRender(() => {
        const currentDistance = getDistance()
        const times = currentDistance / defaultDistance
        sphere1.scaling = defaultScaling.scale(times)
    })

    

  function getBoundingScreenSize(sphere) {
    const meshVectors = sphere.getBoundingInfo().boundingBox.vectors
    
    const worldMatrix = sphere.getWorldMatrix()
    const transformMatrix = scene.getTransformMatrix()
    const viewport = scene.activeCamera.viewport.toGlobal(
        engine.getRenderWidth(true),
        engine.getRenderHeight(true)
    )
    
    const coordinates = meshVectors.map(v => {
        const proj = BABYLON.Vector3.Project(
            v,
            worldMatrix,
            transformMatrix,
            viewport
        )
        console.log(proj)
        return proj.x
    })
    console.log(coordinates)
    const minX = Math.min(...coordinates)
    const maxX = Math.max(...coordinates)
    const length = maxX - minX
    
    return length
}
scene.render();
// setTimeout(() => {
    var l = getBoundingScreenSize(sphere1)
    console.log(l)
// }, 0)
    

  engine.runRenderLoop(function() {
    scene.render();
  });

  window.addEventListener('resize', function() {
    engine.resize();
  });

  
};
init();