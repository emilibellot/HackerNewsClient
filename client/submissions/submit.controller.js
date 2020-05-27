(function() {
    angular.module('HackerNews')
    .controller("submitCtrl", SubmitCtrl);

    SubmitCtrl.$inject = ['$scope', '$http', '$rootScope','$mdDialog', '$location'];

    function SubmitCtrl($scope, $http, $rootScope, $mdDialog, $location) {

        $scope.new_title_submission = null;
        $scope.new_url_submission = null;
        $scope.new_content_submission = null;

        $scope.addSubmission = function() {

            var title = $scope.new_title_submission;
            var url = $scope.new_url_submission;
            var content = $scope.new_content_submission;

            if (title==null || title=='') {
                dialogGeneral('Title must not be blank.');
            } else if ((url==null || url=='') && (content==null || content=='')) {
                dialogGeneral('Bad request. Url or content must be set.');
            } else if ((url!=null) && (content!=null)) {
                dialogGeneral('Conflict on creating submission. It cannot have content and url.');
            } else {
                var body = JSON.stringify({
                        title: $scope.new_title_submission,
                        content: $scope.new_content_submission,
                        url: $scope.new_url_submission,
                        apiKey: $rootScope.currentUser.token
                    });
                $http.post($rootScope.baseUrl + "/submissions", body)
                .then(function onSuccess(response) {
                    $location.path('/newest');
                })
                .catch(function onError(response) {
                    $location.path('/login');
                });
            }

        };

        function dialogGeneral(msg) {
            var confirm = $mdDialog.alert()
                .title('Error!')
                .contentContent(msg)
                .ok('OK');

                $mdDialog.show(confirm).then(function(result) {
                    $scope.new_url_submission = null;
                    $scope.new_content_submission = null;
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
