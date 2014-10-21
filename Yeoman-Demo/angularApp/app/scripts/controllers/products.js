'use strict';

/**
 * @ngdoc function
 * @name yeomanDemoApp.controller:ProductsCtrl
 * @description
 * # ProductsCtrl
 * Controller of the yeomanDemoApp
 */
angular.module('yeomanDemoApp')
  .controller('ProductsCtrl', function ($scope, $wakanda) {

  	var ds = $wakanda.$ds;
    var url = 'ws://localhost:8082/live';

    $scope.newDiscount = null;

	// load Jane as currentUser
  	ds.Employee.$find({filter: 'firstName == JANE'}).$promise.then(function (event) {

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
    
    $scope.products = [
      {name: '123 CRM', price: 12345},
      {name: 'Mega CMS Pro', price: 2345},
      {name: 'World Mail Business', price: 6789}
    ];


  });
