import 'angular-ui-router';
import 'ui-router-extras/release/modular/ct-ui-router-extras.core';
import 'ui-router-extras/release/modular/ct-ui-router-extras.future';
import 'oclazyload';

const requiredModules = [
  'ui.router',
  'ct.ui.router.extras.core',
  'ct.ui.router.extras.future',
  'oc.lazyLoad'
];

const stateFactory = ['$q', '$ocLazyLoad', 'futureState', function($q, $ocLazyLoad, futureState) {
  let deferred = $q.defer();

  const onError = (originalError) => {
    let error = new LazyLoadRouterError(futureState, originalError);
    console.error(error);
    console.error(originalError);
    deferred.reject(error);
  };

  System['import'](futureState.src).then(function(loaded) {
    let newModule = loaded;
    if (!loaded.name) {
      newModule = loaded[Object.keys(loaded)[0]];
    }
    $ocLazyLoad
      .load(newModule)
      .then(function() { deferred.resolve(); }, onError);
  })
  .catch(onError);

  return deferred.promise;
}];

function LazyLoadRouterError(futureState, previous) {
  this.name = 'LazyLoadRouterError';
  this.previous = previous;
  this.message = this.name + ': ERROR while loading futureState: ' + JSON.stringify({
    stateName: futureState.stateName,
    urlPrefix: futureState.urlPrefix,
    src: futureState.src
  });
  this.stack = (new Error()).stack;
}

LazyLoadRouterError.prototype = Object.create(Error.prototype);
LazyLoadRouterError.prototype.constructor = LazyLoadRouterError;

export {LazyLoadRouterError};

export default function(angularModule, futureRoutes) {

  requiredModules.forEach((moduleId) => {
    if (angularModule.requires.indexOf(moduleId) === -1) {
      angularModule.requires.push(moduleId);
    }
  });

  const RouterConfig = function($futureStateProvider) {
    $futureStateProvider.stateFactory('load', stateFactory);
    futureRoutes.map((futureState) => {
      futureState.type = futureState.type || 'load';
      return futureState;
    }).forEach((futureState) => {
      $futureStateProvider.futureState(futureState);
    });
  };

  RouterConfig.$inject = ['$futureStateProvider'];

  return RouterConfig;
};