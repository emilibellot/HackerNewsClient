(function() {
    angular.module('HackerNews')
    .controller("profileCtrl", AskCtrl);
    
    AskCtrl.$inject = ['$scope', '$http', '$rootScope','$mdDialog', '$location'];
    
    function AskCtrl($scope, $http, $rootScope, $mdDialog, $location) {
        $http.get($rootScope.baseUrl + "/user")
        .then(function(response) {
            $scope.user = response.data;
        });
        
        $scope.showPrompt = function(ev, id_submission) {
            var confirm = $mdDialog.prompt()
              .title('Add a comment')
              .initialValue('')
              .targetEvent(ev)
              .theme('hacker')
              .ok('Comment')
              .cancel('Cancel');
        
            $mdDialog.show(confirm).then(function(result) {
                if(result==null){
                    alert("Content is empty");
                }
                else{
                    var body = JSON.stringify({
            			"content": result
        		    });
                    $http.post($rootScope.baseUrl + "/comments?user_id=4&submission_id="+id_submission,body, {headers: {'token': $rootScope.currentUser.token}})
                    .then(function(response) {
                        localStorage.setItem("id_submission", id_submission);
                        $location.path('/submissions/'+ id_submission);
                    });
                }
            }, function() {});
        };
        
        $scope.ShowUser = function(id){
            localStorage.setItem("id_submission", id);
            $location.path('/submissions/'+id);
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