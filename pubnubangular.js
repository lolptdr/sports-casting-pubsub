var app = angular.module('PubNubAngularApp', ["pubnub.angular.service"]);

app.controller("MainCtrl", function($rootScope, $scope, PubNub){
  $scope.userId = "User " + Math.round(Math.random()*1000);
  $scope.channel = 'Gamecast Game';

  if (!$rootScope.initialized){
    PubNub.init({
      subscribe_key: 'demo',
      publish_key: 'demo',
      uuid: $scope.userId
    });
    $rootScope.initialized = true;
  }

  $scope.reset = function() {
    $scope.state = {
      home_team: "Home team",
      away_team: "Away team",
      home_score: 0,
      away_score: 0,
      inning: "",
      first_bases: [false, false],
      second_bases: [false, false],
      third_bases: [false, false],
      balls: [false, false, false, false],
      strikes: [false, false, false],
      outs: [false, false, false],
      last_play: ""
    };
    $scope.count = {
      first_bases: 0,
      second_bases: 0,
      third_bases: 0,
      balls: 0,
      strikes: 0,
      outs: 0
    };
  }

  $scope.reset();

  $scope.click = function(type) {
    $scope.count[type] = ($scope.count[type] + 1) % $scope.state[type].length;
    for (var i = 0; i < $scope.state[type].length; i++){
      $scope.state[type][i] = (i < $scope.count[type]);
    }
  }

  $scope.publish = function() {
    PubNub.ngPublish({
      channel: $scope.channel,
      message: $scope.state
    });
  }
});
