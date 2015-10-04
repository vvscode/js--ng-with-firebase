/* global Firebase */
(function(angular) {
  'use strict';

  angular.module('jsNgWithFirebaseApp').service('MessageService', function(FBURL) {
    var messagesRef = new Firebase(FBURL).child('messages');

    function getSnapshotsMessage(snapshot){
      var value = snapshot.val();
      return {
        text: value.text,
        user: value.user,
        name: snapshot.name()
      };
    }

    return {
      childAdded: function childAdded(limitNumber, cb) {
        messagesRef.limit(limitNumber).on('child_added', function(snapshot){
          cb.call(this, getSnapshotsMessage(snapshot));
        });
      },

      childChanged: function childChanged(cb) {
        messagesRef.on('child_changed', function(snapshot){
          cb.call(this, getSnapshotsMessage(snapshot));
        });
      },

      childRemoved: function childRemoved(cb) {
        messagesRef.on('child_removed', function(snapshot){
          cb.call(this, getSnapshotsMessage(snapshot));
        });
      },

      sendMessage: function(message) {
        messagesRef.push(message);
      },

      off: function() {
        messagesRef.off();
      }
    };
  });
})(window.angular);
