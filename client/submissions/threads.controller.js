(function() {
    angular.module('HackerNews')
    .controller("threadCtrl", ThreadCtrl);
    
    ThreadCtrl.$inject = ['$scope', '$http', '$rootScope','$mdDialog', '$location'];
    
    function ThreadCtrl($scope, $http, $rootScope, $mdDialog, $location) {
        $http.get($rootScope.baseUrl + "/comments/user/1", {headers: {'token': $rootScope.currentUser.token}})
        .then(function(response) {
            $scope.comments = response.data;   
        });
        
        $http.get($rootScope.baseUrl + "/replies/user/1", {headers: {'token': $rootScope.currentUser.token}})
        .then(function(response) {
            $scope.replies = response.data;   
        });
        

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