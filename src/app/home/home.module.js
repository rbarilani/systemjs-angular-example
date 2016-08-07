import angular from 'angular';
import UiRouterModule from 'angular-ui-router';
import homeTpl from './home.tpl.html!text';

//
// CONFIG
//
const config = ($stateProvider) => {
    $stateProvider.state('home', {
        url: '/',
        template: homeTpl
    });
};
config.$inject = ['$stateProvider'];

//
// MODULE
//
const HomeModule = angular
    .module('app.home', [UiRouterModule]);
    
HomeModule.config(config);

export default HomeModule;    