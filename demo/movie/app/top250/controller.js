(function(angular) {
  'use strict';

  // 创建正在热映模块
  var module = angular.module('moviecat.top250', ['ngRoute']);
  // 配置模块的路由
  module.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/top250', {
      templateUrl: 'top250/view.html',
      controller: 'Top250Controller'
    });
  }]);

  module.controller('Top250Controller', [
    '$scope',
    '$http',
    function($scope,$http){

      /*控制器 分为两步：1.绑定数据  2.绑定行为*/
      $scope.subjects=[];
      $scope.message='';

      $http.get('/app/datas/top250.json').then(function(res){
        if(res.status==200) {
            $scope.subjects=res.data.subjects;
        }else{
           $scope.message='获取数据错误，错误信息：'+res.statusText;
        }
      },function(err) {
          $scope.message='获取数据错误，错误信息：'+err.statusText;
      })


    }]);
})(angular)
