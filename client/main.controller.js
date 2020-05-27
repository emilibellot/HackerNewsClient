(function() {
    'use strict';
    angular.module('HackerNews')
    .controller('mainCtrl', MainCtrl);
    
    MainCtrl.$inject = ['$scope', '$http', '$rootScope', '$location'];
    
    function MainCtrl($scope,$http, $rootScope, $location) {
       // Global variables
      $rootScope.baseUrl = 'https://pacific-ravine-23752.herokuapp.com/api';
      $rootScope.currentUser = {
        token: null,
        name: null,
        id: null
      };
      
      $scope.name = null;
      
      $scope.Home = function() {
        $location.path('/');
      };
      
      $scope.Newest = function() {
        $location.path('/newest');
      };
      
      $scope.Threads = function() {
        if ($rootScope.currentUser.id != null){
          $location.path('/threads');
        }
        else{
          $location.path('/login');
        }
      };
      
      $scope.Ask = function() {
        $location.path('/ask');
      };
      
      $scope.Submit = function() {
        $location.path('/submit');
      };
      
      $scope.Profile = function() {
        if ($rootScope.currentUser.id != null){
          $location.path('/profile');
        }
        else{
          $location.path('/login');
        }
      };

      $scope.Comments = function() {
        $location.path('/comments');
      };
     
      $scope.Login = function() {
        $location.path('/login');
      };
    }
})();