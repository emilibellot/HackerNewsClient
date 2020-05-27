(function() {
    angular.module('HackerNews')
    .controller("replyCtrl", ReplyCtrl);
    
    ReplyCtrl.$inject = ['$scope', '$http', '$rootScope','$mdDialog', '$route','$location'];
    
    function ReplyCtrl($scope, $http, $rootScope, $mdDialog, $route,$location){
        
        $scope.new_comment = '';
 
        $http.get($rootScope.baseUrl + "/comments/"+localStorage.getItem("id_comment"))
        .then(function(response) {
            $scope.comment = response.data;   
        });
        
        $http.get($rootScope.baseUrl + "/replies/comment/"+localStorage.getItem("id_comment"))
        .then(function(response) {
            $scope.replies = response.data;   
        });

        $scope.showPrompt = function(ev, id_comment) {
            var confirm = $mdDialog.prompt()
              .title('Add a reply')
              .initialValue('')
              .targetEvent(ev)
              .ok('Reply')
              .cancel('Cancel');
        
            $mdDialog.show(confirm).then(function(result) {
                var body = JSON.stringify({
        			"content": result
    		    });
                $http.post($rootScope.baseUrl + "/replies?user_id=4&comment_id="+id_comment,body, {headers: {'token': $rootScope.currentUser.token}})
                .then(function(response) {
                    
                });
            }, function() {});
        };
        
        $scope.isUrl = function(text) {
            var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
            return regexp.test(text);
        };
        
        $scope.addReply = function(id_comment) {
            if($scope.new_comment==0){
                alert("Content is empty");
            }
            else{
                var body = JSON.stringify({
        			id: id_comment,
                    content: $scope.new_comment,
                    apiKey: $rootScope.currentUser.token
    		    });
                $http.post($rootScope.baseUrl + "/replies/", body)
                .then(function onSuccess(response) {
                    $route.reload();
                })
                .catch(function onError(response) {
                    $location.path('/login');
                });
            }
        };

        $scope.Vote = function(id) {
            
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
                console.log("Hola2");
                $mdDialog.hide();
            };

            $scope.cancel = function() {
                $mdDialog.cancel();
            };

            $scope.answer = function(answer) {
                console.log("Hola2");
                $mdDialog.hide(answer);
            };
        }
    }
})();