﻿angular.module('step5', ['wakConnectorModule']);

function Controller($scope, wakConnectorService) {

    // Create a proxy of the server model
    wakConnectorService.init('Employee').then(function (ds) {
 
        ds.Employee.$find({}).then(function (event) {
            $scope.employees = event.result;
        });

    });

}
