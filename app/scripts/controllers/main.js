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
    var messageRef = rootRef.child('message');

    messageRef.on('value', function(snapshot) {
      $timeout(function() { // $timeout used instead of $digest/$apply
        var value = snapshot.val();
        console.log('value on change: ', value);
        $scope.message = value;
      });
    });

    $scope.$watch('message.text', function(newValue) {
      if(!newValue) {
        return;
      }
      messageRef.update({
        text: newValue
      })
    });

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
