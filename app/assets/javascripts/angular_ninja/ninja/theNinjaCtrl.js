app.controller('theNinjaCtrl', ['$scope', 'Rhyme', '$location', 'rhyme', '$stateParams', function ($scope, Rhyme, $location, rhyme, $stateParams){
  'use strict'


  if (rhyme.original_text === '') {
    Rhyme.get({user_id: id, id: $stateParams.rhyme_id, authenticity_token: token}, function(r) {
        $.extend(rhyme, r);
        $scope.rhyme = rhyme;
    });
  } else {
    $scope.rhyme = rhyme;
  }

  $scope.alterText = function() {
    Rhyme.update({ user_id: rhyme.user_id, id: rhyme.id, rhymed_text: rhyme.rhymed_text, authenticity_token: token });
  };



}]);