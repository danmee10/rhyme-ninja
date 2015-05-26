app.controller('initNinjaCtrl', ['$scope', 'Rhyme', '$location', 'rhyme', '$cookies', function ($scope, Rhyme, $location, rhyme, $cookies){
  'use strict';

  var setSessionVars = function() {
    $scope.session = {
      user_id: userId,
      authenticity_token: token
    }
  };
  setSessionVars();

  var saveRhymeForUser = function(user_id, val, title, authenticity_token){
      Rhyme.save({user_id: user_id,
                    title: title,
            original_text: val,
       authenticity_token: authenticity_token}, function(r){
          $.extend(rhyme, r);
          $location.path('/ninja/' + r.id);
      });
  };

  var saveRhymeForAnon = function(val, title) {
    $cookies.anonRhymeTitle = title;
    $cookies.anonOriginalText = val;
    $cookies.anonRhymedText = val;
    $location.path('/ninja/');
  };

  $scope.initNinja = function() {
    var user_id = $scope.session.user_id;
    var val = $('textarea.init-rhyme-box').val();
    var title = $('input.title-box').val();
    var authenticity_token = $scope.session.authenticity_token;

    if (user_id === '') {
      saveRhymeForAnon(val, title);
    } else {
      saveRhymeForUser(user_id, val, title, authenticity_token);
    }
  };


}]);