/* global SystemJS */

SystemJS.config({
	baseURL: '/',
	defaultJSExtensions: true,
    transpiler: 'plugin-babel',
    map: {
        // dev deps
        // babel
        'plugin-babel': './node_modules/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': './node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',
    
        // deps
        'angular': './node_modules/angular/angular.js'
    },
    paths: {
        'app/*': './src/app/*'
    },
    meta: {
        'angular': {
            'format': 'global',
            'exports': 'angular'
        }
    }
});