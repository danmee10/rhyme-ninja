app.controller('theNinjaCtrl', ['$scope', 'Rhyme', '$location', '$stateParams', 'User', 'angularFlash', '$cookies', 'textWrapper', function ($scope, Rhyme, $location, $stateParams, User, angularFlash, $cookies, textWrapper){
  'use strict';

  var saveToCookies = function saveToCookies() {
    $cookies.put('anonRhymeTitle', $scope.rhyme.title);
    $cookies.put('anonRhymedText', $scope.rhyme.rhymed_text);
    $cookies.put('anonSyllables', $scope.rhyme.syllable_pattern);
  };

  var alterText = function alterText() {
    var alteredRhyme = $scope.rhyme;
    Rhyme.update({ user_id: alteredRhyme.user_id,
                        id: alteredRhyme.id,
                     title: alteredRhyme.title,
               rhymed_text: alteredRhyme.rhymed_text,
        authenticity_token: token
    });
  };

  if (anonUser) {
    $scope.rhymeFields = {
      submitText: "Temporary Save",
      submitMethod: saveToCookies
    }
    $scope.anonUser = true;
  } else {
    $scope.rhymeFields = {
      submitText: "Save",
      submitMethod: alterText
    }
    $scope.anonUser = false;
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
      if (!_.isUndefined($scope.rhyme)) {
        var sylls = _.map($scope.rhyme.syllable_pattern.split(", "), function(n){
          return parseInt(n);
        });
        $scope.toolTriggers = textWrapper.wrapText($scope.rhyme.rhymed_text, sylls);
      }
    }
  );

  $scope.$watch('rhyme.syllable_pattern',
    function(newWord){
      if (!_.isUndefined($scope.rhyme)) {
        var sylls = _.map($scope.rhyme.syllable_pattern.split(", "), function(n){
          return parseInt(n);
        });
        $scope.toolTriggers = textWrapper.wrapText($scope.rhyme.rhymed_text, sylls);
      }
    }
  );

  $scope.showTools = false;

  $scope.wordClick = function(wordObj) {
    $scope.$broadcast('resetNinjaTools');
    setSelectedWord(wordObj);
    $scope.showTools = true;
  };

  $scope.nonWordClick = function(wordObj) {
    console.log("nonWordClick")
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