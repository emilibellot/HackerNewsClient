(function() {
    angular.module('HackerNews')
    .controller("threadCtrl", ThreadCtrl);
    
    ThreadCtrl.$inject = ['$scope', '$http', '$rootScope','$mdDialog', '$location'];
    
    function ThreadCtrl($scope, $http, $rootScope, $mdDialog, $location) {
        $http.get($rootScope.baseUrl + "/comments/user/"+$rootScope.currentUser.id)
        .then(function(response) {
            $scope.comments = response.data;   
        });
        
        $http.get($rootScope.baseUrl + "/replies/user/"+$rootScope.currentUser.id)
        .then(function(response) {
            $scope.replies = response.data;   
        });

        $scope.VoteComment = function(id) {
            
            var body = JSON.stringify({
                apiKey: $rootScope.currentUser.token
            })

            $http.put($rootScope.baseUrl + "/comments/" + id + "/vote/", body)
                    .then(function(response) {
                        $route.apply();
                    });
        };

        $scope.VoteReply = function(id) {
            
            var body = JSON.stringify({
                apiKey: $rootScope.currentUser.token
            })

            $http.put($rootScope.baseUrl + "/replies/" + id + "/vote/", body)
                    .then(function(response) {
                        $route.apply();
                    });
        };
        

        function DialogController($scope, $mdDialog) {
            $scope.hide = function() {
                $mdDialog.hide();
            };

            $scope.cancel = function() {
                $mdDialog.cancel();
            };

            $scope.answer = function(answer) {
                $mdDialog.hide(answer);
            };
        }
        
    }
})();