/**
 * Created by bangbang93 on 15-4-11.
 */
angular.module('adminApp')
  .controller('IndexCtrl', function ($scope, $http, secondToDate){
    $scope.$emit('changeTitle', 'BMCD');
    $http.get('/admin/status').success(function (data){
      $scope.bmcd = data;
      $scope.bmcd.upDate = secondToDate(data.uptime);
    })
})
  .controller('HeaderCtrl', function ($scope, $http, $route){
  $http.get('/server/list').success(function (data){
    $scope.servers = data;
  });
  $http.get('/user/status').success(function (data) {
    $scope.username = data.username;
  });
  $scope.$on('$routeChangeSuccess', function (ev, current, prev){

  });
})
  .controller('TitleCtrl', function ($scope, $http){
  $scope.$on('changeTitle', function (e, title){
    $scope.title = title;
  });
})
  .controller('ServerConfigCtrl', function ($scope, $http, $route){
  $scope.newArg = '';
  $scope.nowArg = '';
    $scope.canCreate = true;
  $http.get('/admin/configure').success(function (data) {
    data.forEach(function (e) {
      if (e.key == 'java'){
        $scope.java = e.value;
      }
    })
  });
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
  };
    $scope.submit = function (){
      $scope.canCreate = false;
      $http.post('/admin/server/edit', $scope.server).success(function (){
        $scope.dialog = {
          title: '保存成功',
          content: '保存服务器' + $scope.server.name + '成功'
        };
        AJS.dialog2('#returnDialog').show().on('hide', function (){
          $window.location.reload();
        });
      }).error(function (data, status){
        $scope.dialog = {
          title: '创建失败',
          content: '创建服务器' + $scope.server.name + '失败，由于服务器内部错误：' + JSON.stringify(data)
        };
        AJS.dialog2('#returnDialog').show();
        $scope.canCreate = true;
      })
    }
})
  .controller('ServerCreateCtrl', function ($scope, $http, AJS, $window){
    $scope.canCreate = true;
    $scope.$emit('changeTitle', '创建服务器');
    $scope.server = {};
    $http.get('/admin/configure').success(function (data) {
      $scope.java = data.java;
    });
    $scope.submit = function (){
      $scope.canCreate = false;
      $http.post('/admin/server/create', $scope.server).success(function (){
        $scope.dialog = {
          title: '创建成功',
          content: '创建服务器' + $scope.server.name + '成功'
        };
        AJS.dialog2('#returnDialog').show().on('hide', function (){
          $window.location.reload();
        });
      }).error(function (data, status){
        if (status == 404){
          $scope.dialog = {
            title: '创建失败',
            content: '创建服务器' + $scope.server.name + '失败，由于输入的路径不存在'
          };
        } else {
          $scope.dialog = {
            title: '创建失败',
            content: '创建服务器' + $scope.server.name + '失败，由于服务器内部错误：' + JSON.stringify(data)
          };
        }
        AJS.dialog2('#returnDialog').show();
        $scope.canCreate = true;
      })
    }
})
  .controller('ConfigCtrl', function ($scope, $http, AJS, $window){
    $scope.newJava = '';
    $scope.nowJava = '';
    $scope.$emit('changeTitle', 'BMCD参数设置');
    $http.get('/admin/configure').success(function (data){
      data.forEach(function (e){
        $scope[e.key] = e.value;
      });
    });
    $scope.addJava = function (){
      if (!$scope.newJava){
        return;
      }
      $scope.java.push($scope.newJava);
      $scope.newJava = '';
    };
    $scope.delJava = function (){
      var java = $scope['java'];
      for(var i in java){
        if (java[i] == $scope.nowJava){
          break;
        }
      }
      java.splice(i,1);
    };
    $scope.submit = function (){
      $http.post('/admin/configure', {
        java: $scope.java
      }).success(function (data){
        $scope.dialog = {
          title: '保存配置',
          content: '成功'
        };
        AJS.dialog2('#returnDialog').show().on('hide', function (){
          $window.location.reload();
        });
      })
    }
  });
