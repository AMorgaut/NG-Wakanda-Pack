'use strict';

/**
 * @ngdoc overview
 * @name yeomanDemoApp
 * @description
 * # yeomanDemoApp
 *
 * Main module of the application.
 */
angular
  .module('yeomanDemoApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'wakanda'
  ])
  .config(function ($routeProvider) {

    var routeResolver = {
      app : ['$wakanda', function($wakanda){
        return $wakanda.init();
      }]
    };

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/demo', {
        templateUrl: 'views/demo.html',
        controller: 'DemoCtrl',
        resolve: routeResolver
      })
      .when('/vendor', {
        templateUrl: 'views/vendor.html',
        controller: 'VendorCtrl',
        resolve: routeResolver
      })
      .when('/products', {
        templateUrl: 'views/products.html',
        controller: 'ProductsCtrl',
        resolve: routeResolver
      })
      .when('/invoices', {
        templateUrl: 'views/invoices.html',
        controller: 'InvoicesCtrl',
        resolve: routeResolver
      })
      .otherwise({
        redirectTo: '/'
      });
  })
.controller('NavCtrl', ['$scope', '$route', function($scope, $route) {
    $scope.route = $route;
}]);
