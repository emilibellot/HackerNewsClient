(function() {
  'use strict';
  angular.module('HackerNews', ['ngMaterial', 'ngRoute', 'googleplus'])
    .config(function($mdThemingProvider, $routeProvider, GooglePlusProvider) {
      // Colors configuration
      $mdThemingProvider.theme('hacker')
        .primaryPalette('orange', {
          'default': '800', // by default use shade 400 from the pink palette for primary intentions
          'hue-1': '700', // use shade 100 for the <code>md-hue-1</code> class
          'hue-2': '500' // use shade 600 for the <code>md-hue-2</code> class
        })
        // If you specify less than all of the keys, it will inherit from the
        // default shades
        .accentPalette('brown', {
          'default': 'A200' // use shade 200 for default, and keep all other shades the same
        })
        
        .backgroundPalette('grey', {
          'default': '200'
        });
        
      // Routing configuration
      $routeProvider
        .when('/', {
            templateUrl: 'submissions/submissions.html'
        })
        .when('/newest', {
            templateUrl: 'submissions/newest.html'
        })
        .when('/threads', {
            templateUrl: 'submissions/threads.html'
        })
        .when('/submit', {
            templateUrl: 'submissions/submit.html'
        })
        .when('/ask', {
            templateUrl: 'submissions/ask.html'
        })
        .when('/submissions/:id', {
            templateUrl: 'submissions/detail.html'
        })
        .when('/comments/:id', {
            templateUrl: 'submissions/reply.html'
        })
        .when('/comments/', {
          templateUrl: 'submissions/comments.html'
        })
        .when('/submissionUser/', {
          templateUrl: 'submissions/submissionUser.html'
        })
        .when('/profile/', {
            templateUrl: 'submissions/profile.html'
        })
        .when('/login/', {
            templateUrl: 'submissions/login.html'
        })
        .otherwise({
            redirectTo: '/'
        });
  });
  
})();
