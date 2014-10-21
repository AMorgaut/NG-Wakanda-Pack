'use strict';

/**
 * @ngdoc function
 * @name yeomanDemoApp.controller:InvoicesCtrl
 * @description
 * # InvoicesCtrl
 * Controller of the yeomanDemoApp
 */
angular.module('yeomanDemoApp')
  .controller('InvoicesCtrl', function ($scope, $wakanda) {

  	var ds = $wakanda.$ds;
    var url = 'ws://localhost:8082/live';

    $scope.newDiscount = null;

	// load Thomas as currentUser
  	ds.Employee.$find({filter: 'firstName == THOMAS'}).$promise.then(function (event) {

  		$scope.currentUser = event.result[0];

		var ws = new WebSocket(url);

		ws.onopen = function () {
		    ws.send('{"action":"connect","user":' + $scope.currentUser.ID + '}');
		};

	    ws.onmessage = function (event) {
		    var data = JSON.parse(event.data);
		    if (data.type === 'discount') {
		        $scope.newDiscount = data.body;  
				$scope.$apply('newDiscount');
		    }		
		};

  	});

    $scope.invoices = [
      {id: 'FR1234567', date: '2012/11/23', total: 234456},
      {id: 'US636I2O4', date: '2013/05/05', total: 78486},
      {id: 'ES5357826', date: '2014/01/17', total: 543546},
      {id: 'JP2356835', date: '2014/07/30', total: 9867}
    ]; 

  });
