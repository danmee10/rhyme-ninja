app.controller('theNinjaCtrl', ['$scope', 'Rhyme', '$location', '$stateParams', 'User', 'angularFlash', '$cookies', 'textWrapper', function ($scope, Rhyme, $location, $stateParams, User, angularFlash, $cookies, textWrapper){
  'use strict';

  var saveToCookies = function saveToCookies() {
    if (validSyllPattern()) {
      $cookies.put('anonRhymeTitle', $scope.rhyme.title);
      $cookies.put('anonRhymedText', $scope.rhyme.rhymed_text);
      $cookies.put('anonSyllables', $scope.rhyme.syllable_pattern);
      angularFlash.alertSuccess("Rhyme saved to cookies!");
    } else {
      angularFlash.alertDanger("Invalid Syllable Pattern");
    }
  };

  var alterText = function alterText() {
    if (validSyllPattern()) {
      var alteredRhyme = $scope.rhyme;
      Rhyme.update({ user_id: alteredRhyme.user_id,
                          id: alteredRhyme.id,
                       title: alteredRhyme.title,
                 rhymed_text: alteredRhyme.rhymed_text,
            syllable_pattern: alteredRhyme.syllable_pattern,
                  visibility: alteredRhyme.visibility,
          authenticity_token: token
      }, function(resp){
        angularFlash.alertSuccess("Rhyme saved!");
      }, function(err){
        angularFlash.alertDanger("Error saving, please contact support.");
      });
    } else {
      angularFlash.alertDanger("Invalid Syllable Pattern");
    }
  };

  $scope.anonUser = anonUser;
  if (anonUser) {
    $scope.rhymeFields = {
      submitText: "Temporary Save",
      submitMethod: saveToCookies
    }
  } else {
    $scope.rhymeFields = {
      submitText: "Save",
      submitMethod: alterText
    }
  }

  var validSyllPattern = function() {
    var match = $scope.rhyme.syllable_pattern.match(/[\d+,\s]+|\d+/);
    return match != null && $scope.rhyme.syllable_pattern == match[0];
  }

  var rhymeById = function(id) {
    return _.find($scope.rhymes, function(r) {
      return r.id == id;
    });
  };

  var fetchUserRhymes = function() {
    User.rhymes({user_id: userId}, function(data) {
      $scope.rhymes = data.rhymes;
      $scope.rhyme = rhymeById($stateParams.rhyme_id);
      if (_.isUndefined($scope.rhyme)) {
        window.location.hash = '/';
        angularFlash.alertDanger('You can not edit Rhymes that you did not create.');
      }
    });
  };

  var fetchAnonRhyme = function() {
    $scope.rhyme = {title: $cookies.get('anonRhymeTitle'),
            original_text: $cookies.get('anonOriginalText'),
              rhymed_text: $cookies.get('anonRhymedText'),
         syllable_pattern: $cookies.get('anonSyllables')};
  };

  var fetchRhymes = function() {
    if (anonUser) {
      fetchAnonRhyme();
    } else {
      fetchUserRhymes();
    }
  }
  fetchRhymes();

  $scope.selectedWord = {word:'$@--@inItIaLiZeR@--@%', position:[]};
  $scope.$watch('selectedWord.word',
    function(newWord, oldWord){
      if (newWord === "$@--@inItIaLiZeR@--@%") {return;}
      var sInd = $scope.selectedWord.position[0];
      var eInd = $scope.selectedWord.position[1] + 1;
      var end = $scope.rhyme.rhymed_text.length;

      var pre = $scope.rhyme.rhymed_text.slice(0, sInd);
      var post = $scope.rhyme.rhymed_text.slice(eInd, end);

      $scope.rhyme.rhymed_text = (pre + newWord + post);
    }
  );

  $scope.$watch('rhyme.rhymed_text',
    function(newWord){
      if (!_.isUndefined($scope.rhyme) && validSyllPattern()) {
        var sylls = _.map($scope.rhyme.syllable_pattern.split(", "), function(n){
          return parseInt(n);
        });
        $scope.toolTriggers = textWrapper.wrapText($scope.rhyme.rhymed_text, sylls);
      }
    }
  );

  $scope.$watch('rhyme.syllable_pattern',
    function(newWord){
      if (!_.isUndefined($scope.rhyme) && !_.isUndefined($scope.rhyme.syllable_pattern)) {
        if (validSyllPattern()) {
          var sylls = _.map($scope.rhyme.syllable_pattern.split(", "), function(n){
            return +n;
          });
          $scope.toolTriggers = textWrapper.wrapText($scope.rhyme.rhymed_text, sylls);
        }
      }
    }
  );

  $scope.showTools = false;

  $scope.wordClick = function(wordObj) {
    $scope.$broadcast('resetNinjaTools');
    setSelectedWord(wordObj);
    $scope.showTools = true;
  };

  $scope.isSelectedWord = function(position) {
    return (position[0] === $scope.selectedWord.position[0] && position[1] === $scope.selectedWord.position[1]);
  };

  var setSelectedWord = function(wordObj) {
    $scope.selectedWord = {
      word: wordObj.word,
      position: wordObj.position
    }
  };

  $scope.redirectToCreateAccount = function() {
    window.location.hash = "";
    window.location.pathname = "/create_account";
  };

}]);