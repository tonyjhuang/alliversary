require.config({
    baseUrl: './',
    packages: [
        {
          name: 'physicsjs',
          location: 'helpers',
          main: 'physics'
        }
    ],
});

requirejs(["helpers/physics"], function(physics) {
    //This function is called when scripts/helper/util.js is loaded.
    //If util.js calls define(), then this function is not fired until
    //util's dependencies have loaded, and the util argument will hold
    //the module value for "helper/util".
});