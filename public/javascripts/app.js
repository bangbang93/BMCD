'use strict';

/**
 * @ngdoc overview
 * @name bmcdApp
 * @description
 * # bmcdApp
 *
 * Main module of the application.
 */
angular
  .module('bmcdApp', [
    'ngAnimate',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html'
      }).when('/server/:sid', {
        templateUrl: '/views/server/info.html',
        controller: 'ServerInfoCtrl'
      }).when('/server/:sid/console', {
        templateUrl: '/views/server/console.html',
        controller: 'ServerConsoleCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .factory('io', function ($rootScope) {
    return io;
  });
