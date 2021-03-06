(function() {
    angular.module('HackerNews')
    .controller("submissionUserCtrl", SubmissionUserCtrl);
    
    SubmissionUserCtrl.$inject = ['$scope', '$http', '$rootScope','$mdDialog', '$location'];
    
    function SubmissionUserCtrl($scope, $http, $rootScope, $mdDialog, $location) {
        $http.get($rootScope.baseUrl + "/submissions/user/"+$rootScope.currentUser.id)
        .then(function(response) {
            $scope.submissions = response.data;
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
        
        $scope.ShowSubmission = function(id){
            localStorage.setItem("id_submission", id);
            $location.path('/submissions/'+id);
        };

        $scope.Vote = function(id) {
            
            var body = JSON.stringify({
                apiKey: $rootScope.currentUser.token
            })

            $http.put($rootScope.baseUrl + "/submissions/" + id + "/vote/", body)
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