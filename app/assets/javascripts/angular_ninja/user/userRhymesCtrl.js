app.controller('userRhymesCtrl', ['$scope', 'User', 'rhyme', 'angularFlash', function ($scope, User, rhyme, angularFlash){
  'use strict'

  if (userType === 'anon') {
    window.location.hash = '/';
    angularFlash.alertDanger('Create account to view your saved rhymes!');
  }

  User.rhymes({user_id: id}, function(data) {
    $scope.rhymes = data.rhymes;
  });

  $scope.setRhyme = function(id) {
    var selection = _.find($scope.rhymes, function(r) {
      return r.id === id;
    });
    $.extend(rhyme, selection)
  };


}]);