app.controller('initNinjaCtrl', ['$scope', 'Rhyme', '$location', 'rhyme', '$cookies', function ($scope, Rhyme, $location, rhyme, $cookies){
  'use strict';

  $scope.rhyme = {
    title: '',
    originalText: ''
  }

  $scope.initNinja = function() {
    if (anonUser) {
      saveRhymeForAnon();
    } else {
      saveRhymeForUser();
    }
  };

  if (anonUser) {
    $scope.anonUser = true;
    $('.title-box').attr("maxlength", '50');
    $('.init-rhyme-box').attr("maxlength", '700');
  }

  var saveRhymeForUser = function(){
    Rhyme.save({user_id: userId,
                  title: $scope.rhyme.title,
          original_text: $scope.rhyme.originalText,
     authenticity_token: token}, function(r){
        $.extend(rhyme, r);
        $location.path('/ninja/' + r.id);
    });
  };

  var saveRhymeForAnon = function() {
    $cookies.put('anonRhymeTitle', $scope.rhyme.title);
    $cookies.put('anonOriginalText', $scope.rhyme.originalText);
    $cookies.put('anonRhymedText', $scope.rhyme.originalText);
    $location.path('/ninja/');
  };
}]);