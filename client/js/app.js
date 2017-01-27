import angular from 'angular';
import ngRoute from 'angular-ui-router';
import appServices from './services/index';
import appDirectives from './directives/index';
import appControllers from './controllers/index';

function config($stateProvider, $urlRouterProvider) {
  $stateProvider
      .state('login', {
        url: '/login',
        template: '<login></login>',
      })
      .state('room', {
        url: '/room',
        template: '<chat-room></chat-room>',
      });

  $urlRouterProvider.when('/', 'login');
  $urlRouterProvider.otherwise('/');
}

config.$inject = ['$stateProvider', '$urlRouterProvider'];

const mainModule =
angular.module('nodeChat', [
  ngRoute,
  appServices,
  appDirectives,
  appControllers,
])
.config(config);

export default mainModule;
