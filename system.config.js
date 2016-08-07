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
        'text': './node_modules/systemjs-plugin-text/text.js', // map text plugin - usage: "import text from './text.html!text'"
    
        // deps
        'whatwg-fetch': './node_modules/whatwg-fetch/fetch.js',
        'angular': './node_modules/angular/angular.js',
        'angular-ui-router': './node_modules/angular-ui-router/release/angular-ui-router.js',
        'oclazyload': './node_modules/oclazyload/dist/ocLazyLoad.js'
    },
    paths: {
        'app/*': './src/app/*',
        
        // deps
        'ui-router-extras/*': './node_modules/ui-router-extras/*'
    },
    meta: {
        'angular': {
            'format': 'global',
            'exports': 'angular'
        },
        'oclazyload': {
            'format': 'global'
        },
        'whatwg-fetch': {
            'format': 'global',
            'exports': 'fetch'
        }
    }
});