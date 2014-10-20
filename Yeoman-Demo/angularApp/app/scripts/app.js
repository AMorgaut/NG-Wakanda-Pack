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
      app : ['$wakanda',function($wakanda){
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
      .otherwise({
        redirectTo: '/'
      });
  });
