(function(angular){
  'use strict';

  angular.module('jsNgWithFirebaseApp')
    .controller('LogoutCtrl', function ($scope, $firebaseSimpleLogin, FBURL, $window, $rootScope) {
      var fbRef = new Firebase(FBURL);
      $firebaseSimpleLogin(fbRef).$logout();
      $rootScope.user = null;
      $window.location.href = '/#/';
    });
})(window.angular);

