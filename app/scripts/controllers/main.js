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
  .controller('MainCtrl', function ($scope, $timeout) {
    var rootRef = new Firebase('https://intense-torch-8090.firebaseio.com/');
    var messagesRef = rootRef.child('messages');

    $scope.messages = [];
    $scope.currentUser = null;
    $scope.currentText = null;

    messagesRef.on('child_added', function(snapshot) {
      $timeout(function() { // $timeout used instead of $digest/$apply
        var value = snapshot.val();
        $scope.messages.push(value);
      });
    });

    $scope.sendMessage = function() {
      messagesRef.push({
        user: $scope.currentUser,
        text: $scope.currentText
      });
    };
  });
