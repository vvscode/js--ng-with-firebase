/* global Firebase */
(function(angular) {
  'use strict';

  angular.module('jsNgWithFirebaseApp').service('MessageService', function(FBURL, $q) {
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
        messagesRef.startAt().limit(limitNumber).on('child_added', function(snapshot){
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
      },

      pageNext: function pageNext(name, numberOfItems) {
        var deferred = $q.defer();
        var messages = [];

        messagesRef.startAt(null, name).limit(numberOfItems).once('value', function(snapshot) {
          snapshot.forEach(function(item) {
            messages.push(getSnapshotsMessage(item));
          });
          deferred.resolve(messages);
        });

        return deferred.promise;
      },

      pageBack: function pageBack(name, numberOfItems) {
        var deferred = $q.defer();
        var messages = [];

        messagesRef.endAt(null, name).limit(numberOfItems).once('value', function(snapshot) {
          snapshot.forEach(function(item) {
            messages.push(getSnapshotsMessage(item));
          });
          deferred.resolve(messages);
        });

        return deferred.promise;
      }
    };
  });
})(window.angular);
