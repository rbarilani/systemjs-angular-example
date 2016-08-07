import angular from 'angular';
import UiRouterModule from 'angular-ui-router';
import ContactsModule from './contacts/contacts.module';
import HomeModule from './home/home.module';

const run = ($scope) => {
    $scope.text = 'systemjs-angular seed';
};
run.$inject = ['$rootScope'];

const config = ($urlRouterProvider, $stateProvider) => {
     $urlRouterProvider.otherwise('/');
};
config.$inject = ['$urlRouterProvider', '$stateProvider'];

const AppModule = angular.module('app', [
    UiRouterModule,
    HomeModule.name,
    ContactsModule.name
]);

export {run, config};
export default AppModule;
