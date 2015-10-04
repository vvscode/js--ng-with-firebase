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
    'ngSanitize'
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
      .otherwise({
        redirectTo: '/'
      });
  })
  .constant('FBURL', 'https://intense-torch-8090.firebaseio.com/');
