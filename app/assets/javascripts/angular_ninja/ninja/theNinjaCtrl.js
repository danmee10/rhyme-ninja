app.controller('theNinjaCtrl', ['$scope', 'Rhyme', '$location', 'rhyme', '$stateParams', 'User', '$http', function ($scope, Rhyme, $location, rhyme, $stateParams, User, $http){
  'use strict'


  var rhymeById = function(id) {
    return _.find($scope.rhymes, function(r) {
      return r.id == id;
    });
  };

  if (rhyme.original_text === '') {
    User.rhymes({user_id: id}, function(data) {
      $scope.rhymes = data.rhymes;
      $scope.rhyme = rhymeById($stateParams.rhyme_id);
      if (typeof $scope.rhyme !== 'undefined') {
        $.extend(rhyme, $scope.rhyme);
      } else {
        // angular flash
        window.location.hash = '/';
        console.log("http1 --> ", "Angualr flash")
        alert("broken")
      }
    });
  } else {
    $scope.rhyme = rhyme;
  }

  $scope.alterText = function() {
    Rhyme.update({ user_id: rhyme.user_id, id: rhyme.id, rhymed_text: rhyme.rhymed_text, authenticity_token: token });
  };



}]);