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
        $scope.messages.push(getSnapshotsMessage(snapshot));
      });
    });

    messagesRef.on('child_changed', function(snapshot) {
      $timeout(function() { // $timeout used instead of $digest/$apply
        var value = snapshot.val();
        var message = findMessageByName(snapshot.name());
        if(message) {
          message.text = value.text;
          message.user = value.user;
        } else {
          $scope.messages.push(getSnapshotsMessage(snapshot));
        }
      });
    });

    function getSnapshotsMessage(snapshot){
      var value = snapshot.val();
      return {
        text: value.text,
        user: value.user,
        name: snapshot.name()
      };
    }

    function findMessageByName(name) {
      for(var i = 0; i < $scope.messages.length; i++) {
        var currentMessage = $scope.messages[i];
        if(name === currentMessage.name) {
          return currentMessage;
        }
      }
    }

    $scope.sendMessage = function() {
      messagesRef.push({
        user: $scope.currentUser,
        text: $scope.currentText
      });
    };
  });
