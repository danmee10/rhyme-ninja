app.controller('theNinjaCtrl', ['$scope', 'Rhyme', '$location', 'rhyme', '$stateParams', 'User', 'angularFlash', function ($scope, Rhyme, $location, rhyme, $stateParams, User, angularFlash){
  'use strict'


  var rhymeById = function(id) {
    return _.find($scope.rhymes, function(r) {
      return r.id == id;
    });
  };

  var fetchRhymes = function() {
    User.rhymes({user_id: id}, function(data) {
      $scope.rhymes = data.rhymes;
      $scope.rhyme = rhymeById($stateParams.rhyme_id);
      if (typeof $scope.rhyme !== 'undefined') {
        $.extend(rhyme, $scope.rhyme);
      } else {
        window.location.hash = '/';
        angularFlash.alertDanger('You can not edit Rhymes that you did not create.');
      }
    });
  }

  if (rhyme.original_text === '') {
    fetchRhymes();
  } else {
    $scope.rhyme = rhyme;
  }

  $scope.alterText = function() {
    var alteredRhyme = $scope.rhyme;
    Rhyme.update({ user_id: alteredRhyme.user_id,
                        id: alteredRhyme.id,
               rhymed_text: alteredRhyme.rhymed_text,
        authenticity_token: token
    });
  };



}]);