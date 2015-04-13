app.controller('userRhymesCtrl', ['$scope', 'User', function ($scope, User){
  'use strict'


  User.rhymes({user_id: id}, function(data) {
    $scope.rhymes = data.rhymes;
  });


}]);