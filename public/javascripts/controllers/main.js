'use strict';

/**
 * @ngdoc function
 * @name bmcdApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bmcdApp
 */
angular.module('bmcdApp')
  .controller('HeaderCtrl', function ($scope, $http) {
    $http.get('/user/status').success(function (data){
      if (!data.success){
        window.location = '/user/login.html';
      } else {
        $scope.username = data.username;
      }
    });
    $scope.logout = function (){
      $http.get('/user/logout').success(function (){
        window.location = '/user/login.html';
      })
    }
  }).controller('ServerCtrl', function ($scope, $http, $route){
    $http.get('/server/list').success(function (data){
      $scope.servers = data;
    });
    $scope.$on('$routeChangeSuccess', function (ev, current, prev){
      $scope.selected = current.params.sid;
    });
  });
