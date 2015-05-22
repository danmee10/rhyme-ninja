app.controller('rhymesCtrl', ['$scope', '$stateParams', '$http', function ($scope, $stateParams, $http){
  'use strict';

  // right now I don't see any reason to create a new angular
  // resource for public rhymes...
  $http.get('/public_rhymes.json').success(function(data){
    $scope.allRhymes = data;
    filterRhymes();
  });

  var filterRhymes = function() {
    if (typeof $stateParams.titleQuery !== 'undefined' || $stateParams.titleQuery !== '') {
      $scope.filteredRhymes = _.filter($scope.allRhymes, function(r){
        var re = new RegExp($stateParams.titleQuery);
        return re.test(r.title)
      });
    } else {
      $scope.filteredRhymes = $scope.allRhymes;
    }
  }

}]);