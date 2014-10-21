'use strict';

/**
 * @ngdoc function
 * @name yeomanDemoApp.controller:VendorCtrl
 * @description
 * # VendorCtrl
 * Controller of the yeomanDemoApp
 */
angular.module('yeomanDemoApp')
  .controller('VendorCtrl', function ($scope, $wakanda) {

  	var ds = $wakanda.$ds;
    var url = 'ws://localhost:8082/live';


  	// Prefill discount form
  	$scope.title = 'Super AngularJS Discount';
  	$scope.discount = 42;
  	$scope.description = [
  		'Don\'t miss this opportunity to meet awesome AngularJS developers in an awesome ',
  		'event organised by awesome people and proposing awesome talks from awesome speakers!'
	].join('');	

	// load vendor as currentUser
  	ds.Vendor.$find({
  		filter: 'firstName == BILL', 
  		select: 'clients'
  	}).$promise.then(function (event) {

  		$scope.currentUser = event.result[0];
		$scope.clients = $scope.currentUser.clients;
		$scope.clients.$fetch();

		var ws = new WebSocket(url);

		ws.onopen = function () {
		    ws.send('{"action":"connect","user":' + $scope.currentUser.ID + '}');
		};

	    ws.onmessage = function (event) {
		    var data = JSON.parse(event.data);
		    switch (data.type) {
		    case 'connect':
		        $scope.clients.forEach(function (client) {
		        	if (client.ID === data.user) {
		        		client.online = true;
		        	}
		        });
				break;
			case 'discount':
		        $scope.newDiscount = data.body;  
				$scope.$apply('newDiscount');
				break;
		    }		
		};
  	});

    // hardcoded data 
    /*
    $scope.clients = [
    	{firstName: 'Sophie', online: false, photo: {src: 'http://play.wakanda.org/rest/Employee(1)/photo?$imageformat=best&amp;$expand=photo'}},
    	{firstName: 'Thomas', online: true, photo: {src: 'http://play.wakanda.org/rest/Employee(2)/photo?$imageformat=best&amp;$expand=photo'}},
    	{firstName: 'Cindy', online: false, photo: {src: 'http://play.wakanda.org/rest/Employee(10)/photo?$imageformat=best&amp;$expand=photo'}},
    	{firstName: 'Paul', online: false, photo: {src: 'http://play.wakanda.org/rest/Employee(5)/photo?$imageformat=best&amp;$expand=photo'}},
    	{firstName: 'Jane', online: true, photo: {src: 'http://play.wakanda.org/rest/Employee(1)/photo?$imageformat=best&amp;$expand=photo'}},
    	{firstName: 'Luna', online: false, photo: {src: 'http://play.wakanda.org/rest/Employee(18)/photo?$imageformat=best&amp;$expand=photo'}}
    ];
    */

  });
