app.controller('theNinjaCtrl', ['$scope', 'Rhyme', '$location', 'rhyme', '$stateParams', 'User', 'angularFlash', function ($scope, Rhyme, $location, rhyme, $stateParams, User, angularFlash){
  'use strict';


  var redirectToCreateAccount = function() {
    window.location.pathname = "/create_account";
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

  if (userType === 'anon') {
    $scope.rhymeFields = {
      submitText: "Create free account to save work",
      submitMethod: redirectToCreateAccount
    }
  } else {
    $scope.rhymeFields = {
      submitText: "Save",
      submitMethod: alterText
    }
  }

  var rhymeById = function(id) {
    return _.find($scope.rhymes, function(r) {
      return r.id == id;
    });
  };

  var fetchRhymes = function() {
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
  }

  if (rhyme.original_text === '') {
    fetchRhymes();
  } else {
    $scope.rhyme = rhyme;
  }

}]);