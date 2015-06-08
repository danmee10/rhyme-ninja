app.controller('theNinjaCtrl', ['$scope', 'Rhyme', '$location', 'rhyme', '$stateParams', 'User', 'angularFlash', '$cookies', function ($scope, Rhyme, $location, rhyme, $stateParams, User, angularFlash, $cookies){
  'use strict';

  var saveToCookies = function() {
    $cookies.anonRhymeTitle = $scope.rhyme.title;
    $cookies.anonRhymedText = $scope.rhyme.rhymed_text;
  };

  var alterText = function() {
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
    $scope.showCreateAccountButton = true;
  } else {
    $scope.rhymeFields = {
      submitText: "Save",
      submitMethod: alterText
    }
    $scope.showCreateAccountButton = false;
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
    $scope.rhyme = {title: $cookies.anonRhymeTitle,
            original_text: $cookies.anonOriginalText,
              rhymed_text: $cookies.anonRhymedText};
  };

  var fetchRhymes = function() {
    if (anonUser) {
      fetchAnonRhyme();
    } else {
      fetchUserRhymes();
    }
  }

  if (rhyme.original_text === '') {
    fetchRhymes();
  } else {
    $scope.rhyme = rhyme;
  }


  $scope.redirectToCreateAccount = function() {
    window.location.hash = "";
    window.location.pathname = "/create_account";
  };

}]);