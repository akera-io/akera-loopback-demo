var app = angular.module('AkeraDemos', ['ui.router', 'ui.ace', 'akera-dependencies']);

app.config(['$stateProvider', function($state) {
    $.get('./config.json', function(res) {
        if (res.akera_demos) {
            var demos = res.akera_demos;
            for (var demo in demos) {
                var views = {}
                views[demos[demo].view] = {
                    path: '/' + demos[demo].view,
                    templateUrl: demos[demo].templateUrl
                }
                var dm = {
                    views: views,
                    data: {
                        crtState: demo
                    }
                };
                $state
                    .state(demo, dm)
            }
        }
    })
}]);
app
    .controller('MainCtrl', ['$scope', '$state', '$http', function($scope, $state, $http) {

        $scope.$state = $state;

        $scope.$on('$stateChangeSuccess', function() {
            $scope.currentDemo = $scope.demos[$state.current.data.crtState];
            $scope.demoView = 'result';
        })

        $scope.aceLoaded = function(editor) {
            editor.getSession().setUseWorker(false);
            $scope.editor = editor;
            $scope.changeMode = function() {
                editor.getSession().setMode('ace/mode/' + $scope.getLoadedFileMode());
            }
            $scope.changeMode();
        }


        $scope.viewResult = function() {
            console.log('switching to result view');
            $scope.demoView = 'result';
        }

        $scope.viewSource = function(file) {
            $http.get(file.path).success(function(res) {
                $scope.sourceView = {
                    file: file.path,
                    content: res
                };
                $scope.demoView = 'source';
                if ($scope.changeMode)
                    $scope.changeMode();
            });
        }

        $scope.getLoadedFileMode = function() {
            var tokens = $scope.sourceView.file.split('.');
            var extension = tokens[tokens.length - 1];
            console.log(extension);
            switch (extension) {
                case 'html':
                    {
                        return 'html';
                    }
                case 'js':
                    {
                        return 'javascript';
                    }
                case 'css':
                    {
                        return 'css';
                    }
                default:
                    {
                        return 'html';
                    }
            }
        }

        $http.get('./config.json').success(function(res) {
            if (res.akera_demos) {
                $scope.demos = res.akera_demos;
            }
        })
    }])
