/**
 * Created by SAAD on 07/12/2014.
 */
var ngwakUpload = angular.module('ngwakUpload', ['wakanda']);

ngwakUpload.directive("ngwakUpload", ["$http", function ($http) {
    return {
        restrict : "E",
        scope:{
            onUploadSuccess: '&',
            onUploadError : '&'
        },
        template : '<div class="input-group">\
                        <span class="input-group-addon">File</span>\
                        <input type="file" class="form-control">\
                            <div class="input-group-btn">\
                            <button ng-click="upload()" ng-show="!uploaded &amp;&amp; showUploadButton" type="button" class="btn btn-default ng-binding ng-hide">{{uploadButtonText}}</button>\
                        </div>\
                    </div>',
        link : function (scope, element, attributes) {

            scope.upload = function(){
                scope.uploadButtonText = "Uploading ...";
                var form = new FormData();
                form.append('filesToUpload', scope.file);
                form.append('config','{"folder":"'+scope.folderUpload+'", "replace":true}');

                $http.post('/waUpload/upload', form , {
                    transformRequest : angular.identity,
                    headers : {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .success(function(data){
                        scope.data = data;
                        scope.onUploadSuccess(data);
                        scope.uploaded = true;
                        console.log(data);
                    })
                    .error(function(err, status){
                        scope.err = err;
                        var errMsg = "Unknown error status "+status;
                        if(status = 500){
                            errMsg = "you must activate upload service and/or authorize upload for the connected user (http://doc.wakanda.org/GUI-Designer/GUI-Designer-Widgets/File-Upload.300-939929.en.html)"
                        }
                        scope.uploadButtonText = "Retry";
                        scope.uploaded = false;
                        scope.onUploadError();
                        console.log(errMsg);
                    });

            };

            var inputElement = element.find("input");
            inputElement.bind('change', function () {

                scope.folderUpload = attributes.folder || "tmp";
                scope.file =  inputElement[0].files[0];

                scope.showUploadButton = !!scope.file;
                scope.uploaded = false;
                scope.uploadButtonText = "Upload";

                scope.$apply();
            })
        }
    };
}]);
