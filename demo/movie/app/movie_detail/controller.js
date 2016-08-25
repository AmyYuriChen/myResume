(function(angular) {
  'use strict';

  // 创建正在热映模块
  var module=angular.module(
    'moviecat.movie_detail',  
    ['ngRoute','moviecat.services.http']);

  module.config(['$routeProvider',function($routeProvider){

    /*配置路由*/
    $routeProvider.when('/detail/:id',{
      templateUrl:'movie_detail/view.html',
      controller:'MovieDetailController'
    });

  }]);

  module.controller('MovieDetailController',[
    '$scope',
    '$route',
    '$routeParams',
    'HttpService',/*自定义服务*/
    'AppConfig',
    function($scope,$route,$routeParams,HttpService,AppConfig){

      /*控制器 分为两步：1.绑定数据  2.绑定行为*/

      $scope.loading=true; //loading
      $scope.movie={};
      var id=$routeParams.id;

      var apiAddress=AppConfig.detailApiAddress+id;

      HttpService.jsonp(apiAddress,{},function(data){
          $scope.movie=data;     
          $scope.loading=false;
          // apply的作用就是让指定的表达式重新同步
          $scope.$apply();      
      });

  }]);

})(angular);





// var doubanApiAddress = 'http://api.douban.com/v2/movie/in_theaters';
// // 测试$http服务
// // 在Angular中使用JSONP的方式做跨域请求，
// // 就必须给当前地址加上一个参数 callback=JSON_CALLBACK
// $http.jsonp(doubanApiAddress+'?callback=JSON_CALLBACK').then(function(res) {
//   // 此处代码是在异步请求完成过后才执行（需要等一段时间）
//   if (res.status == 200) {
//     $scope.subjects = res.data.subjects;
//   } else {
//     $scope.message = '获取数据错误，错误信息：' + res.statusText;
//   }
// }, function(err) {
//   console.log(err);
//   $scope.message = '获取数据错误，错误信息：' + err.statusText;
// });
