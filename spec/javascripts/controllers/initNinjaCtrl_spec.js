'use strict';

describe('Controller: ninja/initNinjaCtrl', function(){
  beforeEach(module('rhymeNinja'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
  }));

  var setPageVars = function(uid, token) {
    window.userId = uid;
    window.token = token;
  }

  describe('$scope.session', function(){
    it('contains the userId and authenticity token from the page.', function(){
      var $scope = {};
      setPageVars(null, null);
      $controller('initNinjaCtrl', { $scope: $scope })

      expect($scope.session.user_id).toEqual(null)
      expect($scope.session.authenticity_token).toEqual(null)
    });
  });

});