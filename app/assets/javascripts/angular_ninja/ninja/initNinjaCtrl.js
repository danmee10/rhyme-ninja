app.controller('initNinjaCtrl', ['$scope', 'Rhyme', '$location', 'rhyme', 'session', function ($scope, Rhyme, $location, rhyme, session){
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
    $.extend(session, $scope.session)
  };
  setSessionVars();

  $scope.initNinja = function() {
    var val = $('textarea.init-rhyme-box').val();
    var user_id = session.user_id
    var authenticity_token = session.authenticity_token
    Rhyme.save({user_id: user_id, original_text: val, authenticity_token: authenticity_token}, function(r){
        $.extend(rhyme, r)
        $location.path('/ninja');
    });
  };


}]);