import angular from 'angular';
import fetch from 'whatwg-fetch';
import lazyLoadRouter from  '../lib/lazy-load-router';
import AppModule from './app.module';
import {run, config} from './app.module';

const ngBootstrap = (routes) => {
    
    AppModule.config(lazyLoadRouter(AppModule, routes));
    
    AppModule.config(config);
    
    AppModule.run(run);
    
    console.info('NG-BOOTSTRAP');
    
    angular.element(document).ready(function() {
        angular.bootstrap(document, [AppModule.name], { strictDi: true });
    });
}

export default function () {
    
    console.info('EXECUTING APP BOOTSTRAP');

    fetch('/api/routes.json')
        .then(function (response) {
            return response.json();
        }).then(function(routes) {
            console.info('DYNAMIC ROUTES LOADED', routes);
            ngBootstrap(routes);
            console.info('APP BOOTSTRAP COMPLETED');
        }).catch(function(ex) {
            console.error('An error occured during bootstrap phase of the application', ex)
        });
}

