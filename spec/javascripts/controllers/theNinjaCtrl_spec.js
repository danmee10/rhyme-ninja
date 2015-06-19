'use strict';

describe('Controller: ninja/theNinjaCtrl', function(){
  beforeEach(module('rhymeNinja'));

  var $controller, $rootScope, $scope, mockToolBelt;

  beforeEach(inject(function(_$controller_, _$rootScope_){
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
  }));

  beforeEach(function(){
    mockToolBelt = {
      wrapText: function(a, b){ return; }
    }
    $scope.rhyme = {rhymed_text: ""};
  });

  var setPageVars = function(uid, token, anonUser) {
    window.userId = uid;
    window.token = token;
    window.anonUser = anonUser;
  }

  describe('$scope.rhymeFields', function(){
    it("if anonUser true, sets submitText and submitMethod to 'Temporary Save' and saveToCookies respectively.", function(){
      setPageVars(null, null, true);
      $controller('theNinjaCtrl', { toolBelt: mockToolBelt, $scope: $scope });

      expect($scope.rhymeFields.submitText).toEqual('Temporary Save');
      expect($scope.rhymeFields.submitMethod.name).toEqual('saveToCookies');
    });
    it("if anonUser false, sets submitText and submitMethod to 'Save' and alterText respectively.", function(){
      setPageVars(null, null, false);
      $controller('theNinjaCtrl', { toolBelt: mockToolBelt, $scope: $scope });

      expect($scope.rhymeFields.submitText).toEqual('Save');
      expect($scope.rhymeFields.submitMethod.name).toEqual('alterText');
    });
  });

  describe('$scope.anonUser', function() {
    it("is true if window.anonUser is true.", function(){
      setPageVars(null, null, true);
      $controller('theNinjaCtrl', { toolBelt: mockToolBelt, $scope: $scope });

      expect($scope.anonUser).toEqual(true);
    });
    it("is false if window.anonUser is false.", function(){
      setPageVars(null, null, false);
      $controller('theNinjaCtrl', { toolBelt: mockToolBelt, $scope: $scope });

      expect($scope.anonUser).toEqual(false);
    });
  });

  describe('$scope.rhyme', function() {
    it('is retrieved from the $cookies, if rhyme service is empty and anonUser is true', inject(function($cookies){
      $cookies.remove('anonRhymeTitle');
      $cookies.remove('anonOriginalText');
      $cookies.remove('anonRhymedText');
      setPageVars(null, null, true);
      var mockRhyme = {
        original_text: "",
        title: ""
      }
      $cookies.put('anonRhymeTitle', 'this is title');
      $cookies.put('anonOriginalText', 'this is original');
      $cookies.put('anonRhymedText', 'this is rhymed');
      $controller('theNinjaCtrl', { toolBelt: mockToolBelt, $scope: $scope, rhyme: mockRhyme, $cookies: $cookies });

      expect($scope.rhyme.title).toEqual("this is title");
      expect($scope.rhyme.original_text).toEqual("this is original");
      expect($scope.rhyme.rhymed_text).toEqual("this is rhymed");

      $cookies.remove('anonRhymeTitle');
      $cookies.remove('anonOriginalText');
      $cookies.remove('anonRhymedText');
    }));
    it('is the rhyme with the id equal to the rhyme_id stateParam if that rhyme belongs to the user', function(){
      setPageVars(1, null, false);
      var mockRhyme = {
        original_text: "",
        title: ""
      }
      var mockUserApi = {
        rhymes: function() {
          $scope.rhyme = {title: 'user rhyme'}
          return;
        }
      }
      $controller('theNinjaCtrl', { toolBelt: mockToolBelt, $scope: $scope, rhyme: mockRhyme, User: mockUserApi });

      expect($scope.rhyme.title).toEqual('user rhyme');
    });
  });

});