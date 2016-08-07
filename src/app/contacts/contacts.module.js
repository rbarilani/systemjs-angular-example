import angular from 'angular';
import uiRouterModule from 'angular-ui-router';
import contactsTpl from './contacts.tpl.html!text';

//
// CONFIG
//
const config = ($stateProvider) => {
  $stateProvider.state('contacts', {
    url: '/contacts',
    template: contactsTpl
  });
};
config.$inject = ['$stateProvider'];

//
// MODULE
//
const ContactsModule = angular
  .module('app.contacts', [uiRouterModule]);

ContactsModule.config(config);

//
// EXPORT
//
export default ContactsModule;