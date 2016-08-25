(function(angular) {
  'use strict';

  // 创建正在热映模块
  var module=angular.module(
    'moviecat.movie_list',  
    ['ngRoute','moviecat.services.http']);

  module.config(['$routeProvider',function($routeProvider){

    /*配置路由*/
    $routeProvider.when('/:category/:page',{
      templateUrl:'movie_list/view.html',
      controller:'MoveListController'
    });

  }]);

  module.controller('MoveListController',[
    '$scope',
    '$route',
    '$routeParams',
    'HttpService',/*自定义服务*/
    'AppConfig',
    function($scope,$route,$routeParams,HttpService,AppConfig){

      /*控制器 分为两步：1.绑定数据  2.绑定行为*/
      var count=AppConfig.pageSize;// 每页的条数
      var page=parseInt($routeParams.page);// 当前页码
      var start=parseInt(page-1)*count; //当前页从哪儿开始
       
      $scope.loading=true; //loading
      $scope.subjects=[];
      $scope.title='loading';  // 数据错误提示或提示信息
      $scope.totalCount=0;// 总条数
      $scope.totalPages=0;// 总页数
      $scope.currentPage=page; // 当前页码


      HttpService.jsonp(AppConfig.listApiAddress+$routeParams.category,{start:start,count:count,q:$routeParams.q},function(data){
          $scope.subjects=data.subjects;
          $scope.title=data.title;
          $scope.totalCount=data.total;
          $scope.totalPages=Math.ceil($scope.totalCount/count);
          $scope.currentPage=page; 
          $scope.loading=false;
          //apply的作用就是让指定的表达式重新同步
          $scope.$apply();
         
      });

      /*行为 上一页下一页*/
      $scope.go=function(page){
        if(page>=1 && page<= $scope.totalPages){
           $route.updateParams({page:page}); //更新路由
        };
       
      };




  }
  ]);

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
