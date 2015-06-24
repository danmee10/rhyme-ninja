app.controller('userRhymesCtrl', ['$scope', 'User', 'angularFlash', 'Rhyme', function ($scope, User, angularFlash, Rhyme){
  'use strict'

  if (anonUser) {
    window.location.hash = '/';
    angularFlash.alertDanger('Create account to view your saved rhymes!');
  }

  User.rhymes({user_id: userId}, function(data) {
    $scope.rhymes = data.rhymes;
  });

  $scope.setRhyme = function(id) {
    var selection = _.find($scope.rhymes, function(r) {
      return r.id === id;
    });
  };

  $scope.deleteRhyme = function(rhymeId) {
    if (confirm("Clicking OK will permanently delete your Rhyme. Are you sure?")) {
      Rhyme.delete({user_id: userId, id: rhymeId, authenticity_token: token}, function(response){
        angularFlash.alertSuccess('Rhyme successfully deleted!');
        $scope.rhymes = _.reject($scope.rhymes, function(r){
          return r.id === rhymeId;
        });
      });
    }
  };


}]);