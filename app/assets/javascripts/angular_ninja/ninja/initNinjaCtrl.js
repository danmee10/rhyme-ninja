app.controller('initNinjaCtrl', ['$scope', 'Rhyme', '$location', 'rhyme', 'angularFlash', function ($scope, Rhyme, $location, rhyme, angularFlash){
  'use strict'

  var maxlengthAnonRhyme = 300;

  if (userType === 'anon') {
    $("textarea.init-rhyme-box").attr("maxlength", maxlengthAnonRhyme);
    $("textarea.init-rhyme-box").keypress(function() {
        if ($(this).val().length >= maxlengthAnonRhyme)  {
          angularFlash.alertDanger('Login or create a free account to write longer Rhymes.');
        }
    });
    $("textarea.init-rhyme-box").unbind('paste')
    $("textarea.init-rhyme-box").bind('paste', function() {
      var self = $(this);
      setTimeout(function(){
        if (self.val().length === maxlengthAnonRhyme) {
          angularFlash.alertDanger('Login or create a free account to write longer Rhymes.');
        }
      }, 0);
    });
  }

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
    var title = $('input.title-box').val();
    var user_id = $scope.session.user_id
    var authenticity_token = $scope.session.authenticity_token
    Rhyme.save({user_id: user_id, title: title, original_text: val, authenticity_token: authenticity_token}, function(r){
        $.extend(rhyme, r)
        $location.path('/ninja/' + r.id);
    });
  };


}]);