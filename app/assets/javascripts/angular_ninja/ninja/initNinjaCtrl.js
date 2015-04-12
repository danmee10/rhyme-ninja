app.controller('initNinjaCtrl', ['$scope', 'Rhyme', '$location', 'rhyme', function ($scope, Rhyme, $location, rhyme){
  'use strict'

  // id & token from page @
  var setSessionVars = function() {
    if (typeof id === 'undefined' || typeof token === 'undefined') {
      return;
    }
    $scope.session = {
      user_id: id,
      authenticity_token: token
    }
  };
  setSessionVars();

  $scope.initNinja = function() {
    var val = $('textarea.init-rhyme-box').val();
    var user_id = $scope.session.user_id
    var authenticity_token = $scope.session.authenticity_token
    Rhyme.save({user_id: user_id, original_text: val, authenticity_token: authenticity_token}, function(r){
        $.extend(rhyme, r)
        $location.path('/ninja/' + r.id);
    });
  };


}]);