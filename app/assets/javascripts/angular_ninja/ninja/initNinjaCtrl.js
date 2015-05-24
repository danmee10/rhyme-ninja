app.controller('initNinjaCtrl', ['$scope', 'Rhyme', '$location', 'rhyme', function ($scope, Rhyme, $location, rhyme){
  'use strict';

  var setSessionVars = function() {
    if (typeof userId === 'undefined' || typeof token === 'undefined') {
      return;
    }
    $scope.session = {
      user_id: userId,
      authenticity_token: token
    }
  };
  setSessionVars();

  $scope.initNinja = function() {
    var val = $('textarea.init-rhyme-box').val();
    var title = $('input.title-box').val();
    var user_id = $scope.session.user_id;
    var authenticity_token = $scope.session.authenticity_token;
    Rhyme.save({user_id: user_id, title: title, original_text: val, authenticity_token: authenticity_token}, function(r){
        $.extend(rhyme, r);
        $location.path('/ninja/' + r.id);
    });
  };


}]);