/**
 * Created by bangbang93 on 15-4-11.
 */
angular.module('bmcdApp').controller('ServerInfoCtrl', function ($scope, $http, $route){
  $scope.$on('$routeChangeSuccess', function (ev, current, prev){
    $http.get('/server/info/' + current.params.sid).success(function (data){
      $scope.server = data;
    })
  });
});
