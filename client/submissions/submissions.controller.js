(function() {
    angular.module('HackerNews')
    .controller("submissionCtrl", SubmissionCtrl);
    
    SubmissionCtrl.$inject = ['$scope', '$http', '$rootScope','$mdDialog', '$location'];
    
    function SubmissionCtrl($scope, $http, $rootScope, $mdDialog, $location) {
        
        console.log("Arrivo");
        
        $http.get($rootScope.baseUrl + "/submissions")
        .then(function(response) {
            $scope.submissions = response.data;   
        });
        
        //$http.get($rootScope.baseUrl + "/votes?type=contributions", {headers: {'token': $rootScope.currentUser.token}})
        //.then(function(response) {
        //     $scope.votes = response.data;   
        //});
        
        $scope.showPrompt = function(ev, id_submission) {
            var confirm = $mdDialog.prompt()
              .title('Add a comment')
              .initialValue('')
              .targetEvent(ev)
              .theme('hacker')
              .ok('Comment')
              .cancel('Cancel');
        
            $mdDialog.show(confirm).then(function(result) {
                console.log(result);
                if(result==null){
                    alert("Content is empty");
                }
                else{
                    var body = JSON.stringify({
            			"content": result
        		    });
                    $http.post($rootScope.baseUrl + "/comments/"+id_submission,body, {headers: {'token': $rootScope.currentUser.token}})
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