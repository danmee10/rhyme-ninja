app.controller('rhymeShowCtrl', ['$scope', '$stateParams', '$http', function ($scope, $stateParams, $http){
  'use strict';

  var rhymeId = $stateParams.rhyme_id;
  $http.get('/public_rhyme_show/' + rhymeId).success(function(data){
    $scope.rhyme = data;
  });
}]);