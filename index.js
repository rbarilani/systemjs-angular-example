(function() {

  var onBootedLogDebugInfos = function(exports) {
    // FIXME: replace with something more configurable
    let activePlugins = exports.plugins.active.map((p) => p.name);
    console.group('The App was booted!');
    console.info('angular version:', exports.ng.version.full);
    console.info('active plugins:', activePlugins.length ? '"' + activePlugins.join(', ') + '"' : '(none)');
    console.info('future routes:', exports.routes.length ? '"' + JSON.stringify(exports.routes) + '"' : '(none)');
    console.info('ng app module requires:', '"' + exports.ngModule.requires.join(', ') + '"');
    console.groupEnd();
  };

  /* global SystemJS */
  SystemJS.import('app/bootstrap')
    .then(function(module) {
      return module.default; // es6 module default export
    })
    .then(function(bootstrap) {
      return bootstrap();
    })
    .then(function(exports) {
      // remove loading
      exports.ng.element(document.querySelector('.boostrap-cloak')).remove();

      // catch eventual errors while logging infos to prevent fake fatal error to be raised
      // just warn the developer
      try {
        onBootedLogDebugInfos(exports);
      }
      catch (error) {
        console.warn(error);
      }
    })
    .catch(function(error) {
      // fatal error
      console.error(error);

      // replace loading with fatal error message
      document.querySelector('.boostrap-cloak').innerHTML = 'SOMETHING WENT TERRIBLY WRONG, TRY AGAIN LATER.';
    });
})();
