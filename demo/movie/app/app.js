(function(angular){

'use strict';

// Declare app level module which depends on views, and components
angular.module('moviecat', [
  'ngRoute',
  'moviecat.movie_detail',
  'moviecat.movie_list',
  'moviecat.directives.auto_focus'
])
//配置常量
.constant('AppConfig',{
	pageSize:10,
	detailApiAddress:'http://api.douban.com//v2/movie/subject/',
	listApiAddress:'http://api.douban.com//v2/movie/'
})
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({ redirectTo: '/in_theaters/1' });
}]).controller('SearchController',['$scope','$route',function($scope,$route){

	$scope.input='';
	$scope.search=function(){	
		$route.updateParams({q:$scope.input,category:'search'})
	};

}])










})(angular);




// .controller('NavController', [
//   '$scope',
//   '$location',
//   function($scope, $location) {
//     $scope.$location = $location;
//     $scope.$watch('$location.path()', function(now) {
//       if (now.startsWith('/in_theaters')) {
//         $scope.type = 'in_theaters';
//       } else if (now.startsWith('/coming_soon')) {
//         $scope.type = 'coming_soon';
//       } else if (now.startsWith('/top250')) {
//         $scope.type = 'top250';
//       }
//       console.log($scope.type);
//     });
//   }
// ])
