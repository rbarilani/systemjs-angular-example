import angular from 'angular';
import fetch from 'whatwg-fetch';
import lazyLoadRouter from  '../lib/lazy-load-router';
import AppModule from './app.module';
import {run, config} from './app.module';

/**
 * Configure AppModule and bootstrap the main angular app
 * @type function
 * @params {Array<Object>} routes - future routes for lazy loading 
 * @return void
 **/ 
const ngBootstrap = (routes) => {
    
    AppModule.config(lazyLoadRouter(AppModule, routes));
    
    AppModule.config(config);
    
    AppModule.run(run);
    
    angular.element(document).ready(function() {
        angular.bootstrap(document, [AppModule.name], { strictDi: true });
    });
    
    return AppModule;
}

/**
 * @return {Promise}
 */ 
export default function () {
    return fetch('/api/routes.json')
        .then(function (response) {
            return response.json();
        }).then(function(routes) {
            return {
                ng: angular,
                ngModule: ngBootstrap(routes),
                routes: routes
            };
        }).catch(function(ex) {
            console.error('An error occured during bootstrap phase of the application', ex)
            return ex;
        });
}

