app.controller('initNinjaCtrl', ['$scope', 'Rhyme', '$location', '$cookies', function ($scope, Rhyme, $location, $cookies){
  'use strict';

  $scope.rhyme = {
    title: '',
    original_text: '',
    visibility: 'public_rhyme',
    syllable_pattern: '10'
  }

  $scope.initNinja = function() {
    if (anonUser) {
      saveRhymeForAnon();
    } else {
      saveRhymeForUser();
    }
  };

  $scope.anonUser = anonUser;
  if (anonUser) {
    $('.title-box').attr("maxlength", '50');
    $('.init-rhyme-box').attr("maxlength", '700');
  }

  var saveRhymeForUser = function(){
    Rhyme.save({user_id: userId,
                  title: $scope.rhyme.title,
          original_text: $scope.rhyme.original_text,
       syllable_pattern: $scope.rhyme.syllable_pattern,
             visibility: $scope.rhyme.visibility,
     authenticity_token: token}, function(r){
        $location.path('/ninja/' + r.id);
    });
  };

  var saveRhymeForAnon = function() {
    $cookies.put('anonRhymeTitle', $scope.rhyme.title);
    $cookies.put('anonOriginalText', $scope.rhyme.original_text);
    $cookies.put('anonRhymedText', $scope.rhyme.original_text);
    $cookies.put('anonSyllables', $scope.rhyme.syllable_pattern);
    $location.path('/ninja/');
  };
}]);