app.controller('userRhymesCtrl', ['$scope', 'User', function ($scope, User){
  'use strict'

  console.log("userRhymesCtrl")


  User.rhymes({user_id: id}, function(data) {
    console.log("rhymes --> ", data.rhymes)
    $scope.rhymes = data.rhymes;
  });


}]);