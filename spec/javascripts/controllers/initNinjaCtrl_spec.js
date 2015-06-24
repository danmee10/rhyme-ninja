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
      expect($scope.rhyme.original_text).toEqual('');
      expect($scope.rhyme.visibility).toEqual('public_rhyme');
      expect($scope.rhyme.syllable_pattern).toEqual('10');
    });
  });

  describe('$scope.initNinja', function(){
    var $cookies;

    it('saves rhyme input on $cookies if anonUser is true', inject(function($cookies){
      $cookies.remove('anonOriginalText');
      setPageVars(null, null, true);
      $controller('initNinjaCtrl', { $scope: $scope, $cookies: $cookies });


      expect($cookies.get('anonRhymeTitle')).not.toBeDefined();
      expect($cookies.get('anonOriginalText')).not.toBeDefined();
      expect($cookies.get('anonRhymedText')).not.toBeDefined();
      expect($cookies.get('anonSyllables')).not.toBeDefined();

      $scope.rhyme.original_text = "This is some original_text";
      $scope.rhyme.title = "title";
      $scope.rhyme.syllable_pattern = "10, 2, 4";


      $scope.initNinja();
      expect($cookies.get('anonRhymeTitle')).toEqual("title");
      expect($cookies.get('anonOriginalText')).toEqual("This is some original_text");
      expect($cookies.get('anonRhymedText')).toEqual("This is some original_text");
      expect($cookies.get('anonSyllables')).toEqual("10, 2, 4");
      $cookies.remove('anonRhymeTitle');
      $cookies.remove('anonOriginalText');
      $cookies.remove('anonRhymedText');
      $cookies.remove('anonSyllables');
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

  describe('$scope.anonUser', function() {
    it('Equals false if the global var anonUser === false', function(){
      setPageVars(null, null, false);
      $controller('initNinjaCtrl', { $scope: $scope });

      expect($scope.anonUser).toEqual(false);
    });

    it('Equals true if the global var anonUser === true', function(){
      setPageVars(null, null, true);
      $controller('initNinjaCtrl', { $scope: $scope });

      expect($scope.anonUser).toEqual(true);
    });
  });
});