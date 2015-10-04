(function(angular){
  'use strict';

  angular.module('jsNgWithFirebaseApp')
    .controller('LoginCtrl', function ($scope, $firebaseSimpleLogin, FBURL, $window, $rootScope) {
      var fbRef = new Firebase(FBURL);
      $scope.simpleLogin = $firebaseSimpleLogin(fbRef);
      $scope.errors = [];
      $scope.user = {
        email: '',
        password: ''
      };

      $scope.loginUser = function() {
        $scope.errors.length = 0;
        if(!$scope.user.email) {
          $scope.errors.push('Fill email correctly');
        }
        if(!$scope.user.password) {
          $scope.errors.push('Fill password');
        }

        if($scope.errors.length) {
          return;
        }

        $scope.simpleLogin.$login('password', {
          email: $scope.user.email,
          password: $scope.user.password
        }).then(function(user) {
          $rootScope.user = user;
          $window.location.href = '/#/chat';
        }, function(error) {
          $scope.errors.push(error.message);
        });
      }
    });
})(window.angular);

