/* global Firebase */
'use strict';

/**
 * @ngdoc function
 * @name jsNgWithFirebaseApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jsNgWithFirebaseApp
 */
angular.module('jsNgWithFirebaseApp')
  .controller('MainCtrl', function ($scope) {
    var rootRef = new Firebase('https://intense-torch-8090.firebaseio.com/');
    var messageRef = rootRef.child('message');

    $scope.setMessage = function() {
      messageRef.set({
        user: 'VVS',
        text: 'Hi!'
      })
    };

    $scope.updateMessage = function() {
      messageRef.update({
        text: 'Bye'
      });
    };

    $scope.deleteMessage = function() {
      messageRef.remove();
    }
  });
