/**
 * Created by SAAD on 07/12/2014.
 */

var demoApp1 = angular.module("demoApp1", ["ngwakUpload"]);

demoApp1.controller("demoCtrl", ["$scope", function($scope){
    $scope.upOk = function(){
        alert("ok")
    };

    $scope.upKo = function(){
        alert("there is a problem !");
    };

}]);