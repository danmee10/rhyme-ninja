app.controller('userRhymesCtrl', ['$scope', 'User', 'rhyme', function ($scope, User, rhyme){
  'use strict'


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