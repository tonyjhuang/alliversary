require.config({
  baseUrl: './scripts',
  packages: [
  {
    name: 'physicsjs',
    location: 'helpers',
    main: 'physics'
  }
  ],
});

function cropPicture(img) {
  console.log('original: wxh: ' + 
    img.naturalWidth + ',' + img.naturalHeight);
  var aspectRatio = img.naturalHeight / img.naturalWidth;
  var ratio = 100 / img.naturalHeight;
  img.width /= 2;
  img.height /= 2;
  //img.width = img.naturalWidth * ratio;
  //img.height = img.width * aspectRatio;
}

requirejs(["jquery", "helpers/physics"], function($, Physics) {

  var canvas = $("#viewport");
  console.log(canvas.height());
    //This function is called when scripts/helper/util.js is loaded.
    //If util.js calls define(), then this function is not fired until
    //util's dependencies have loaded, and the util argument will hold
    //the module value for "helper/util".
    Physics({
    // set the timestep
    timestep: 1000.0 / 160,
    // maximum number of iterations per step
    maxIPF: 16,
    // set the integrator (may also be set with world.add())
    integrator: 'verlet'
  }, function(world){
    world.add(Physics.renderer('canvas', {
      el: 'viewport'
    }));
    //world.add( Physics.behavior('constant-acceleration') );
    var img = new Image();
    img.src = 'img/alli.png';
    cropPicture(img);
    console.log(img.width + ',' + img.height);
    var square = Physics.body('rectangle', {
      x: 100,
      y: 100,
      vx: 0,
      vy: 0,
      width: img.width,
      height: img.height,
      view: img
    });
    world.add( square );
    world.render();


    // subscribe to ticker to advance the simulation
    Physics.util.ticker.on(function( time, dt ){
      world.step( time );
    });

    // start the ticker
    Physics.util.ticker.start();

    world.on('step', function(){
      world.render();
    });
  });
});