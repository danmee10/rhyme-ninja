app.controller('theNinjaCtrl', ['$scope', 'Rhyme', '$location', 'rhyme', 'session', function ($scope, Rhyme, $location, rhyme, session){
  'use strict'


  $scope.rhyme = rhyme;

  $scope.alterText = function() {
    Rhyme.update({ user_id: rhyme.user_id, id: rhyme.id, rhyme: rhyme, authenticity_token: session.authenticity_token })
  };


}]);