'use strict';

/**
 * @ngdoc function
 * @name yeomanDemoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yeomanDemoApp
 */
angular.module('yeomanDemoApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
