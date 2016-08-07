import angular from 'angular';
import UiRouterModule from 'angular-ui-router';
import ContactsModule from './contacts/contacts.module';
import HomeModule from './home/home.module';

//
// CONFIG
//
const config = ($urlRouterProvider, $stateProvider) => {
    $urlRouterProvider.otherwise(function ($injector, $location) {
        console.info('Redirect to "/"');
        return '/'; 
    });
};
config.$inject = ['$urlRouterProvider', '$stateProvider'];

//
// RUN
//
const run = ($scope) => {
    $scope.text = 'systemjs-angular-example';
};
run.$inject = ['$rootScope'];

//
// MODULE
//
const AppModule = angular.module('app', [
    UiRouterModule,
    HomeModule.name,
    ContactsModule.name
]);

//
// EXPORT
//
export {run, config};
export default AppModule;
