(function() {
    angular.module('HackerNews')
    .controller("loginCtrl", LoginCtrl);

    LoginCtrl.$inject = ['$scope', '$http', '$rootScope','$mdDialog', '$location'];

    function LoginCtrl($scope, $http, $rootScope, $mdDialog, $location) {

        $scope.email = null;
        $scope.password = null;

        $scope.addSession = function() {

            var input_email = $scope.email;
            var input_password = $scope.password;

            if (input_email==null) {
                dialogGeneral('Please introduce a valid email.');
            } else if ((input_password==null)) {
                dialogGeneral('Please introduce a valid password.');
            } else {
                var body = JSON.stringify({
                        email: $scope.email,
                        password: $scope.password,
                    });
                $http.post($rootScope.baseUrl + "/login", body)
                .then(function(response){
                    $location.path('/profile');  
                    $rootScope.currentUser.token = response.data.apiKey;
                    $rootScope.currentUser.name = response.data.username;
                    $rootScope.currentUser.id = response.data.id;
                });
            }

            };

        function dialogGeneral(msg) {
            var confirm = $mdDialog.alert()
                .title('Error!')
                .contentContent(msg)
                .ok('OK');

                $mdDialog.show(confirm).then(function(result) {
                    $scope.email = null;
                    $scope.password = null;
                }, function() {});
        }

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
