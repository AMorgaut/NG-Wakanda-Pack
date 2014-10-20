'use strict';

/**
 * @ngdoc function
 * @name yeomanDemoApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the yeomanDemoApp
 */
angular.module('yeomanDemoApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
