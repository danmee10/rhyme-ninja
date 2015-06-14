app.controller('theNinjaCtrl', ['$scope', 'Rhyme', '$location', '$stateParams', 'User', 'angularFlash', '$cookies', 'textWrapper', function ($scope, Rhyme, $location, $stateParams, User, angularFlash, $cookies, textWrapper){
  'use strict';

  var saveToCookies = function saveToCookies() {
    $cookies.put('anonRhymeTitle', $scope.rhyme.title);
    $cookies.put('anonRhymedText', $scope.rhyme.rhymedText);
  };

  var alterText = function alterText() {
    var alteredRhyme = $scope.rhyme;
    Rhyme.update({ user_id: alteredRhyme.user_id,
                        id: alteredRhyme.id,
                     title: alteredRhyme.title,
               rhymed_text: alteredRhyme.rhymedText,
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
            originalText: $cookies.get('anonOriginalText'),
              rhymedText: $cookies.get('anonRhymedText')};
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
      var end = $scope.rhyme.rhymedText.length - 1;

      var pre = $scope.rhyme.rhymedText.slice(0, sInd);
      var post = $scope.rhyme.rhymedText.slice(eInd, end);

      $scope.rhyme.rhymedText = (pre + newWord + post);
    }
  );

  $scope.$watch('rhyme.rhymedText',
    function(newWord){
      $scope.toolTriggers = textWrapper.wrapText($scope.rhyme.rhymedText, [5, 3]);
    }
  );

  $scope.showTools = false;

  $scope.wordClick = function(wordObj) {
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