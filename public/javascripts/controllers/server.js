/**
 * Created by bangbang93 on 15-4-11.
 */
angular.module('bmcdApp').controller('ServerInfoCtrl', function ($scope, $http, $route){
  $scope.$on('$routeChangeSuccess', function (ev, current, prev){
    $http.get('/server/info/' + current.params.sid).success(function (data){
      $scope.server = data;
    });
    $http.get('/server/status/' + current.params.sid).success(function (data) {
      var status = {
        on: '正常',
        off: '关闭',
        dead: '无响应',
        timed: '关闭'
      };
      $scope.server.statusName = status[data.status];
      var keys = Object.keys(data);
      keys.forEach(function (e) {
        $scope.server[e] = data[e];
      })
    })
  });
  $scope.start = function (){
    $http.get('/server/start/' + $route.current.params.sid).success(function (data){

    })
  }
});
