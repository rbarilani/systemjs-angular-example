import angular from 'angular';
import uiRouterModule from 'angular-ui-router';
import usersTpl from './users.tpl.html!text';
import userDetailTpl from './user-detail.tpl.html!text';
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

const userDetailStateConfig = {
  url: '/users/:userId',
  controller: ['UsersService', '$stateParams', function(service, params) {
    this.loading = 'Loading user...';
    service.getUser(params.userId).then((user) => {
        this.user = user;
      })
      .catch((error) => {
        this.error = error;
      })
      .finally(() => {
        this.loading = null;
      });
  }],
  controllerAs: 'vm',
  template: userDetailTpl
};

//
// CONFIG
//
const config = ($stateProvider) => {
  $stateProvider.state('users', usersStateConfig);
  $stateProvider.state('userDetail', userDetailStateConfig);
};
config.$inject = ['$stateProvider'];

//
// MODULE
//
const UsersModule = angular.module('plugin.users', [uiRouterModule]);
UsersModule.config(config);

//
// SERVICES
//
UsersModule.service('UsersService', UsersService);

export default UsersModule;