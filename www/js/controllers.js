angular.module('starter.controllers', []).controller('AppCtrl', function($scope, $ionicModal, $timeout) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});
    // Form data for the login modal
    $scope.loginData = {};
    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });
    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
        $scope.modal.hide();
    };
    // Open the login modal
    $scope.login = function() {
        $scope.modal.show();
    };
    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
        console.log('Doing login', $scope.loginData);
        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function() {
            $scope.closeLogin();
        }, 1000);
    };
    // Create the badges modal that we will use later
    $ionicModal.fromTemplateUrl('templates/tab-badges.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });
    // Triggered in the badges modal to close it
    $scope.closeBadges = function() {
        $scope.modal.hide();
    };
    // Open the badges modal
    $scope.badges = function() {
        $scope.modal.show();
    };
}).controller('PlaylistsCtrl', function($scope) {
    $scope.playlists = [{
        title: 'Reggae',
        id: 1
    }, {
        title: 'Chill',
        id: 2
    }, {
        title: 'Dubstep',
        id: 3
    }, {
        title: 'Indie',
        id: 4
    }, {
        title: 'Rap',
        id: 5
    }, {
        title: 'Cowbell',
        id: 6
    }];
}).controller('PlaylistCtrl', function($scope, $stateParams) {}).controller('StartCtrl', function($scope, $state, $stateParams, Routes) {
    $scope.search = function(query) {
        Routes.search({
            "search": query
        }, function(data) {
            console.log(data);
            $scope.routes = data.results;
        });
    };
    $scope.route_id = "";
    $scope.change_route = function(id) {
        $scope.route_id = id;
        console.log($scope.route_id);
    };
    $scope.search("");
    $scope.info = function(choice) {
        console.log($scope.route_id);
        $state.go('app.browse', {
            id: $scope.route_id
        });
    };
}).controller('TripCtrl', ['$scope', '$state', '$stateParams', '$cordovaGeolocation', '$localStorage', 'Socket', 'Status', '$timeout',
    function($scope, $state, $stateParams, $cordovaGeolocation, $localStorage, Socket, Status, $timeout) {
        console.log($stateParams.id);
        var vm = $scope;
        function callAtTimeout() {
            var notifications = [];
            Status.page({
                size: 100,
                page: 0,
                route: $stateParams.id
            }, function(status) {
                status.hits.forEach(function(item) {
                    notifications.push(item._source);
                });
            });
            $scope.notifications = notifications;
            console.log('lol');
        }
        callAtTimeout();
        $timeout(callAtTimeout, 5000);

        vm.complaint = function() {
            watchId.clearWatch();
            $state.go('app.complaints');
        };
    }
]).controller('TripStatsCtrl', function($scope, $state, $stateParams) {
    $scope.stop = function() {
        $state.go('app.browse');
    };
}).controller('NotificationCtrl', function($scope, $state, $stateParams, $timeout, Status) {
    function callAtTimeout() {
        var notifications = [];
        Status.page({
            size: 100,
            page: 0
        }, function(status) {
            status.hits.forEach(function(item) {
                notifications.push(item._source);
            });
        });
        $scope.notifications = notifications;
        console.log('lol');
    }
    callAtTimeout();
    $timeout(callAtTimeout, 5000);
});