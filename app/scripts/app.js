'use strict';

/**
 * @ngdoc overview
 * @name jsNgWithFirebaseApp
 * @description
 * # jsNgWithFirebaseApp
 *
 * Main module of the application.
 */
angular
  .module('jsNgWithFirebaseApp', [
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'firebase'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/chat', {
        templateUrl: 'views/chat.html',
        controller: 'ChatCtrl',
        controllerAs: 'chat'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/logout', {
        template: 'Loggin out',
        controller: 'LogoutCtrl',
        controllerAs: 'logout'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'register'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .constant('FBURL', 'https://intense-torch-8090.firebaseio.com/');
