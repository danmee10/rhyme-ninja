'use strict';

describe('Controller: ninja/initNinjaCtrl', function(){
  beforeEach(module('rhymeNinja'));

  var $controller, $rootScope, $scope;

  beforeEach(inject(function(_$controller_, _$rootScope_){
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
  }));

  var setPageVars = function(uid, token, anonUser) {
    window.userId = uid;
    window.token = token;
    window.anonUser = anonUser;
  }

  describe('$scope.rhyme', function(){
    it('sets the initial value of the title and original_text of the rhyme to empty string.', function(){
      setPageVars(null, null, true);
      $controller('initNinjaCtrl', { $scope: $scope });

      expect($scope.rhyme.title).toEqual('');
      expect($scope.rhyme.originalText).toEqual('');
    });
  });

  describe('$scope.initNinja', function(){
    var $cookies;

    it('saves rhyme input on $cookies if anonUser is true', inject(function($cookies){
      $cookies.remove('anonOriginalText');
      setPageVars(null, null, true);
      $controller('initNinjaCtrl', { $scope: $scope, $cookies: $cookies });

      expect($cookies.get('anonOriginalText')).not.toBeDefined();
      $scope.rhyme.originalText = "This is some originalText";
      $scope.initNinja();
      expect($cookies.get('anonOriginalText')).toEqual("This is some originalText");
      $cookies.remove('anonOriginalText');
    }));

    it('saves rhyme input through the Rhyme API if anonUser is false', function(){
      var mockRhyme = {
        save: function() {
          return {id: 1};
        }
      }
      spyOn(mockRhyme, 'save');
      setPageVars(null, null, false);

      $controller('initNinjaCtrl', { $scope: $scope, Rhyme: mockRhyme });
      $scope.initNinja();

      expect(mockRhyme.save).toHaveBeenCalled();
    });
  });
});