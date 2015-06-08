'use strict';

describe('Controller: ninja/initNinjaCtrl', function(){
  beforeEach(module('rhymeNinja'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
  }));

  var setPageVars = function(uid, token, anonUser) {
    window.userId = uid;
    window.token = token;
    window.anonUser = anonUser;
  }

  describe('$scope.rhyme', function(){
    it('sets the initial value of the title and original_text of the rhyme to empty string.', function(){
      var $scope = {};
      setPageVars(null, null, true);
      $controller('initNinjaCtrl', { $scope: $scope });

      expect($scope.rhyme.title).toEqual('');
      expect($scope.rhyme.originalText).toEqual('');
    });
  });
});