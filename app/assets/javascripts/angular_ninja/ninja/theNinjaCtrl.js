app.controller('theNinjaCtrl', ['$scope', 'Rhyme', '$location', 'rhyme', '$stateParams', 'User', 'angularFlash', '$cookies', 'toolBelt', function ($scope, Rhyme, $location, rhyme, $stateParams, User, angularFlash, $cookies, toolBelt){
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
      if (typeof $scope.rhyme !== 'undefined') {
        $.extend(rhyme, $scope.rhyme);
      } else {
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

  if (rhyme.originalText === '') {
    fetchRhymes();
  } else {
    $scope.rhyme = rhyme;
  }

  $scope.rhymeTools = toolBelt.processText($scope.rhymedText);

  $scope.redirectToCreateAccount = function() {
    window.location.hash = "";
    window.location.pathname = "/create_account";
  };

}]);