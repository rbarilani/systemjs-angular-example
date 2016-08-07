import angular from 'angular';
import fetch from 'whatwg-fetch';
import lazyLoadRouter from  '../lib/lazy-load-router';
import AppModule from './app.module';
import {run, config} from './app.module';

/**
 * Configure AppModule and bootstrap the main angular app
 * @type function
 * @params {Array<Object>} routes - future routes for lazy loading 
 * @return {Promise}
 **/ 
const ngBootstrap = (routes) => {
    
    return new Promise(function (resolve, reject) {
        AppModule.config(lazyLoadRouter(AppModule, routes));
    
        AppModule.config(config);
    
        AppModule.run(run);
    
        angular.element(document).ready(function() {
            try {
                angular.bootstrap(document, [AppModule.name], { strictDi: true });
                resolve(AppModule);    
            } catch(error) {
                reject(error)
            }
        });
    });
}

/**
 * @return {Promise}
 */ 
export default function () {
    let exports = {
        ng: angular
    };
    return fetch('/api/routes.json')
        .then(function (response) {
            return response.json();
        })
        .then(function (routes) {
            exports.routes = angular.copy(routes);
            return ngBootstrap(angular.copy(routes));
        })
        .then(function(ngModule) {
            exports.ngModule = ngModule;
            return exports;
        })
        .catch(function(ex) {
            console.error('An error occured during bootstrap phase of the application', ex)
            throw ex;
        });
}

