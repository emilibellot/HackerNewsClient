(function() {
    'use strict';
    angular.module('HackerNews')
    .controller('mainCtrl', MainCtrl);
    
    MainCtrl.$inject = ['$scope', '$http', '$rootScope', '$location'];
    
    function MainCtrl($scope,$http, $rootScope, $location) {
       // Global variables
      $rootScope.baseUrl = 'https://pacific-ravine-23752.herokuapp.com/api';
      $rootScope.currentUser = {
        token: '1_cP4UHYapB2CSjhdPCN6LPQ',
        name: null,
        id: 1
      };
      
      $scope.name = null;
      
      $scope.Home = function() {
        $location.path('/');
      };
      
      $scope.Newest = function() {
        $location.path('/newest');
      };
      
      $scope.Threads = function() {
        $location.path('/threads');
      };
      
      $scope.Ask = function() {
        $location.path('/ask');
      };
      
      $scope.Submit = function() {
        $location.path('/submit');
      };
      
      $scope.Profile = function() {
        $location.path('/profile');
      };
    }
})();