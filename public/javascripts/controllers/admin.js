/**
 * Created by bangbang93 on 15-4-11.
 */
angular.module('adminApp')
  .controller('IndexCtrl', function ($scope, $http, secondToDate){
  $http.get('/admin/status').success(function (data){
    $scope.bmcd = data;
    $scope.bmcd.upDate = secondToDate(data.uptime);
  })
})
  .controller('NavCtrl', function ($scope, $http, $route){
  $http.get('/server/list').success(function (data){
    $scope.servers = data;
  });
  $scope.$on('$routeChangeSuccess', function (ev, current, prev){
    console.log(current);
  });
})
  .controller('HeaderCtrl', function ($scope){
  $scope.$on('changeTitle', function (e, title){
    $scope.title = title;
  })
})
  .controller('ServerConfigCtrl', function ($scope, $http, $route){
  $scope.newArg = '';
  $scope.nowArg = '';
  $scope.$on('$routeChangeSuccess', function (ev, current, prev){
    var sid = current.params.sid;
    $http.get('/server/info/' + sid).success(function (data){
      $scope.server = data;
    });
  });
  $scope.addArg = function (){
    for(var i in $scope.server.args){
      if ($scope.server.args[i] == $scope.newArg){
        return;
      }
    }
    if ($scope.newArg){
      $scope.server.args.push($scope.newArg);
    }
    $scope.newArg = '';
  };
  $scope.delArg = function (){
    for(var i in $scope.server.args){
      if ($scope.server.args[i] == $scope.nowArg){
        break;
      }
    }
    $scope.server.args.splice(i, 1);
  }
})
  .controller('ServerCreateCtrl', function ($scope, $http){
  $scope.$emit('changeTitle', '创建服务器');
  $scope.server = {};
  $scope.submit = function (){
    console.log($scope.server);
  }
});
