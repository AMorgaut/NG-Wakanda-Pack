'use strict';

/**
 * @ngdoc function
 * @name yeomanDemoApp.controller:DemoCtrl
 * @description
 * # DemoCtrl
 * Controller of the yeomanDemoApp
 */
angular.module('yeomanDemoApp')
  .controller('DemoCtrl', function ($scope, $wakanda) {
    $scope.employees = $wakanda.$ds.Employee.$find({select: 'company'}); 
  });
