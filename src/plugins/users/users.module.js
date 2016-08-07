import angular from 'angular';
import uiRouterModule from 'angular-ui-router';
import usersTpl from './users.tpl.html!text';
import UsersService from './users.service.js';

//
// STATES 
//
const usersStateConfig = {
    url: '/users',
    controller: ['UsersService', function(service) { 
        this.loading = 'Loading users...';
        service.getUsers().then((users) => {
            this.users = users;
        })
        .finally(() => {
            this.loading = null;
        });
    }],
    controllerAs: 'vm',
    template: usersTpl 
};

//
// CONFIG
//
const config = ($stateProvider) => {
    $stateProvider.state('users', usersStateConfig);
};    
config.$inject = ['$stateProvider'];

//
// MODULE
//
const UsersModule = angular.module('plugin.users', [ uiRouterModule ]);
UsersModule.config(config);

//
// SERVICES
//
UsersModule.service('UsersService', UsersService);

export default UsersModule;