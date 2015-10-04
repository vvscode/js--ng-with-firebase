'use strict';

/**
 * @ngdoc function
 * @name jsNgWithFirebaseApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jsNgWithFirebaseApp
 */
angular.module('jsNgWithFirebaseApp')
  .controller('MainCtrl', function ($scope, $timeout, MessageService) {
    $scope.messages = [];
    $scope.currentUser = null;
    $scope.currentText = null;

    MessageService.childAdded(3, function(addedMessage) {
      $timeout(function() { // $timeout used instead of $digest/$apply
        $scope.messages.push(addedMessage);
      });
    });

    MessageService.childChanged(function(changedMessage) {
      $timeout(function() { // $timeout used instead of $digest/$apply
        var message = findMessageByName(changedMessage.name);
        if(message) {
          message.text = changedMessage.text;
          message.user = changedMessage.user;
        } else {
          $scope.messages.push(changedMessage);
        }
      });
    });

    MessageService.childRemoved(function(deletedMessage) {
      $timeout(function() { // $timeout used instead of $digest/$apply
        deleteMessageByName(deletedMessage.name);
      });
    });

    function findMessageByName(name) {
      for(var i = 0; i < $scope.messages.length; i++) {
        var currentMessage = $scope.messages[i];
        if(name === currentMessage.name) {
          return currentMessage;
        }
      }
    }

    function deleteMessageByName(name) {
      for(var i = 0; i < $scope.messages.length; i++) {
        var currentMessage = $scope.messages[i];
        if(name === currentMessage.name) {
          $scope.messages.splice(i, 1);
          return;
        }
      }
    }

    $scope.sendMessage = function() {
      MessageService.sendMessage({
        user: $scope.currentUser,
        text: $scope.currentText
      });
    };

    $scope.turnFeedOff = function() {
      MessageService.off();
    };
  });
