/**
 * Created by bangbang93 on 15-4-11.
 */
var app = angular.module('adminApp', ['ngAnimate', 'ngRoute']).config(function ($routeProvider){
  $routeProvider.when('/', {
    templateUrl: 'views/index.html',
    controller: 'IndexCtrl'
  }).when('/admin/server/config/:sid',{
    templateUrl: 'views/server-config.html',
    controller: 'ServerConfigCtrl'
}).otherwise({
    redirectTo: '/'
  });
});
app.factory('secondToDate', function () {
  return function (second){
    if (!second) {
      return 0;
    }
    var time = '';
    if (second >= 24 * 3600) {
      time += parseInt(second / (24 * 3600)) + '天';
      second %= 24 * 3600;
    }
    if (second >= 3600) {
      time += parseInt(second / 3600) + '小时';
      second %= 3600;
    }
    if (second >= 60) {
      time += parseInt(second / 60) + '分钟';
      second %= 60;
    }
    if (second > 0) {
      time += second + '秒';
    }
    return time;
  }
});
