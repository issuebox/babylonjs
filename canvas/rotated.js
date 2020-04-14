(function() {
  const $window = $(window)
  const $container = $('#container')

  function resize() {
    const winWidth = $window.width()
    const winHeight = $window.height()
    const isVertical = winHeight > winWidth
    if (isVertical) {
      $container.css({
        width: winHeight,
        height: winWidth,
        transform: 'rotate(90deg)',
        transformOrigin: '0 0',
        left: winWidth
      })
  
    } else {
      $container.css({
        transform: 'rotate(0deg)',
        width: winWidth,
        height: winHeight,
        left: 0
      })
    }
  }

  
  $window.on('resize', resize)
  resize()


  var canvas = document.getElementById('canvas')
  var engine = new BABYLON.Engine(canvas, true)
  var scene = new BABYLON.Scene(engine)
  BABYLON.SceneLoader.ImportMesh(
    '',
    'https://www.babylonjs-playground.com/scenes/',
    'Rabbit.babylon',
    scene,
    function() {
      scene.createDefaultLight(true)
      scene.createDefaultCamera(true, true, true)

      engine.runRenderLoop(function() {
        scene.render()
      })

      window.addEventListener('resize', function() {
        engine.resize()
      })
      
    }
  )

})()