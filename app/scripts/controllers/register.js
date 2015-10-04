(function(angular){
  'use strict';

  angular.module('jsNgWithFirebaseApp')
    .controller('RegisterCtrl', function ($scope, $firebaseSimpleLogin, FBURL, $window, $rootScope) {
      var fbRef = new Firebase(FBURL);
      $scope.errors = [];
      $scope.simpleLogin = $firebaseSimpleLogin(fbRef);
      $scope.registerUser = {
        email: '1111',
        password: '',
        confirmPassword: ''
      };

      $scope.registerNewUser = function() {
        var errors = [];
        var user = $scope.registerUser;
        if(!user.password.length) {
          errors.push('Please specify password');
        } else if(user.password !== user.confirmPassword) {
          errors.push('Please confirm password correctly')
        }
        if(user.email === '') {
          errors.push('Please enter email');
        }


        if(errors.length) {
          $scope.errors = errors;
          return;
        }

        $scope.simpleLogin
          .$createUser($scope.registerUser.email, $scope.registerUser.password)
          .then(function(user){
            $rootScope.user = user;
            $window.location.href = '/#/home'
          }, function(error) {
            errors.push(error.message);
          });
      }
    });
})(window.angular);

