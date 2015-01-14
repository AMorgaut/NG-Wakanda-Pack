/**
 * Created by SAAD on 07/12/2014.
 */
var ngwakUpload = angular.module('ngwakUpload', ['wakanda']);

ngwakUpload.directive("ngwakUpload", ["$http", "$q", function ($http, $q) {
    return {
        restrict : "E",
        scope:{
            onUploadSuccess: '&',
            onUploadError : '&'
        },
        template : '<div class="input-group">\
                        <span class="input-group-addon">{{label}}</span>\
                        <input type="file" class="form-control">\
                            <div class="input-group-btn">\
                            <button ng-click="upload()" ng-show="!uploaded &amp;&amp; showUploadButton" type="button" class="btn btn-default ng-binding ng-hide">{{uploadButtonText}}</button>\
                            <button ng-click="qAskUser.resolve(true)" ng-show="showVerif" type="button" class="btn btn-default ng-binding ng-hide">Replace</button>\
                            <button ng-click="qAskUser.resolve(false)" ng-show="showVerif" type="button" class="btn btn-default ng-binding ng-hide">Rename</button>\
                        </div>\
                    </div>',
        link : function (scope, element, attributes) {

            scope.label = attributes.label || "File";


            var uploadFile = function (args) {

                var argFile = args.file,
                    argFolder = args.folder,
                    argReplace = args.replace;

                var qDeferer = $q.defer();

                var form = new FormData();
                form.append('filesToUpload', argFile);
                form.append('config', '{"folder":"' + argFolder + '", "replace":'+ argReplace +'}');

                $http.post('/waUpload/upload', form, {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .success(function (data) {
                        qDeferer.resolve(data);
                    })
                    .error(function (err, status) {
                        qDeferer.reject(err, status);
                    });

                return qDeferer.promise;

            };

            var verify = function(args){
                var aFiles = args.files,
                    aFolder = args.folder;

                var qDef = $q.defer();

                $http.post('/waUpload/verify',{
                    'filesInfo': JSON.stringify({
                        folder : aFolder,
                        files : aFiles
                    })
                },{
                    transformRequest: function(obj) {
                        var str = [];
                        for(var p in obj)
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                    },
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                    .success(function (data) {
                        qDef.resolve(data);
                    })
                    .error(function (err, status) {
                        qDef.reject(err, status);
                    });

                return qDef.promise;

            };

            scope.upload = function(){
                scope.uploadButtonText = "Uploading ...";

                scope.showUploadButton = false;

                scope.qAskUser = $q.defer();

                if(attributes.onConflict == "replace"){
                    scope.qAskUser.resolve(true);
                }
                else if(attributes.onConflict == "rename"){
                    scope.qAskUser.resolve(false);
                }
                else{   // if(attributes.onConflict == "ask")
                    verify({
                        files : [inputElement[0].files[0]],
                        folder : attributes.folder
                    })
                        .then(function (data) {

                            if(data.conflicts.length !== 0){
                                scope.showVerif = true;
                            }
                            else{
                                scope.qAskUser.resolve(true);
                            }

                            console.log(data);
                        },function(err){
                            scope.qAskUser.reject(err);
                        });
                }

                scope.qAskUser.promise.then(function(replace){

                    scope.uploadButtonText = "Uploading ...";

                    uploadFile({
                        file : scope.file,
                        folder : scope.folderUpload,
                        replace : replace
                    }).then(function uploaded(data){
                        if(data.error){
                            scope.onUploadError();
                            scope.uploadButtonText = "Retry";
                            scope.uploaded = false;
                        }
                        else{
                            scope.onUploadSuccess();
                            scope.uploaded = true;
                            console.log(data);
                        }

                    }, function error(err, status){
                        var errMsg = "Unknown error status "+status;
                        if(status = 500){
                            errMsg = "you must activate upload service and/or authorize upload for the connected user (http://doc.wakanda.org/GUI-Designer/GUI-Designer-Widgets/File-Upload.300-939929.en.html)"
                        }
                        scope.uploadButtonText = "Retry";
                        scope.uploaded = false;
                        scope.onUploadError();
                        console.log(errMsg);
                    });

                    scope.showVerif = false;
                    scope.showUploadButton = true;
                },function(err){
                    console.log("error in verify !");
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
