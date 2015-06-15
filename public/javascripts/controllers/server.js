/**
 * Created by bangbang93 on 15-4-11.
 */
angular.module('bmcdApp')
  .controller('ServerInfoCtrl', function ($scope, $http, $route){
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
  $scope.goto = function (type) {
    switch (type){
      case 'console':
        console.log($route);
        window.location = '#/server/' + $scope.server._id + '/console';
    }
  };
  $scope.start = function (){
    $http.get('/server/start/' + $route.current.params.sid).success(function (data){

    })
  }
})
  .controller('ServerConsoleCtrl', function ($scope, $http, $route, io) {
    var socket = io('/server');
    $scope.$on('$routeChangeSuccess', function (ev, current, prev) {
      socket.emit('getServerConsole', {
        server: current.params.sid
      })
    });
    socket.on('console', function (data){
      console.log(data);
      $scope.console.append(data);
      //textareaConsole.scrollTop = textareaConsole.scrollHeight;
    });
    socket.on('history', function (data){
      var str = '';
      data.forEach(function (e){
        str += data;
      });
      $scope.console.append(str);
      //textareaConsole.scrollTop = textareaConsole.scrollHeight;
    });
    $(document).ready(function (){
      var $command = $('#command');
      var $console = $('#console');
      var $submit = $('#submit');
      var textareaConsole = document.getElementById('console');
      $submit.on('click', function (){
        var command = $command.val();
        if (!command){
          return;
        }
        socket.emit('command', command);
        $console.append('\n' + new Date().toLocaleString() + '  执行命令：' + command + '\n');
        $command.val('');
      });
      $command.on('keydown', function (key){
        if (key.which == 13){
          $submit.click();
        }
      });
    })
  })
