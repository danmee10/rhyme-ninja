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
    it("sets submitText and submitMethod to 'Temporary Save' and saveToCookies respectively, if anonUser === true.", function(){
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
    it('is retrieved from the $cookies, if anonUser is true', inject(function($cookies){
      $cookies.remove('anonRhymeTitle');
      $cookies.remove('anonOriginalText');
      $cookies.remove('anonRhymedText');
      $cookies.remove('anonSyllables');
      setPageVars(null, null, true);
      var mockRhyme = {
        original_text: "",
        title: ""
      }
      $cookies.put('anonRhymeTitle', 'this is title');
      $cookies.put('anonOriginalText', 'this is original');
      $cookies.put('anonRhymedText', 'this is rhymed');
      $cookies.put('anonSyllables', '1, 2, 3');
      $controller('theNinjaCtrl', { toolBelt: mockToolBelt, $scope: $scope, rhyme: mockRhyme, $cookies: $cookies });

      expect($scope.rhyme.title).toEqual("this is title");
      expect($scope.rhyme.original_text).toEqual("this is original");
      expect($scope.rhyme.rhymed_text).toEqual("this is rhymed");
      expect($scope.rhyme.syllable_pattern).toEqual("1, 2, 3");

      $cookies.remove('anonRhymeTitle');
      $cookies.remove('anonOriginalText');
      $cookies.remove('anonRhymedText');
      $cookies.remove('anonSyllables');
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

  describe('$scope.selectedWord', function() {
    it("is initialized with default values", function(){
      setPageVars(null, null, true);
      $controller('theNinjaCtrl', { toolBelt: mockToolBelt, $scope: $scope });

      expect($scope.selectedWord).toEqual({word:'$@--@inItIaLiZeR@--@%', position:[]});
    });
    it("triggers change in $scope.rhyme.rhymed_text and $scope.toolTriggers when a change to it's word attribute is detectd", function(){
      setPageVars(null, null, true);
      $controller('theNinjaCtrl', { toolBelt: mockToolBelt, $scope: $scope });

      expect($scope.toolTriggers).toEqual();
      $scope.rhyme.rhymed_text = "this is some text";
      $scope.rhyme.syllable_pattern = "10";
      $scope.selectedWord = {word: "change", position: [13, 16]};
      $scope.$apply();
      expect($scope.rhyme.rhymed_text).toEqual("this is some change");
      expect($scope.toolTriggers).toEqual("<div class='rhyme-tool-triggers'><div class='rhyme-line'><span ng-click='wordClick({\"word\":\"this\",\"position\":[0,3]})' ng-class=\"{'selected-word': isSelectedWord([0,3])}\" class='rhyme-item word'>this</span><span ng-click='wordClick({\"word\":\" \",\"position\":[4,4]})' ng-class=\"{'selected-word': isSelectedWord([4,4])}\" class='rhyme-item non-word'> </span><span ng-click='wordClick({\"word\":\"is\",\"position\":[5,6]})' ng-class=\"{'selected-word': isSelectedWord([5,6])}\" class='rhyme-item word'>is</span><span ng-click='wordClick({\"word\":\" \",\"position\":[7,7]})' ng-class=\"{'selected-word': isSelectedWord([7,7])}\" class='rhyme-item non-word'> </span><span ng-click='wordClick({\"word\":\"some\",\"position\":[8,11]})' ng-class=\"{'selected-word': isSelectedWord([8,11])}\" class='rhyme-item word'>some</span><span ng-click='wordClick({\"word\":\" \",\"position\":[12,12]})' ng-class=\"{'selected-word': isSelectedWord([12,12])}\" class='rhyme-item non-word'> </span><span ng-click='wordClick({\"word\":\"change\",\"position\":[13,18]})' ng-class=\"{'selected-word': isSelectedWord([13,18])}\" class='rhyme-item word'>change</span></div></div>");
    });
  });

  describe('$scope.rhyme.syllable_pattern', function(){
    it('triggers a change in $scope.toolTriggers when a change is detected in it', function() {
      setPageVars(null, null, true);
      $controller('theNinjaCtrl', { toolBelt: mockToolBelt, $scope: $scope });

      expect($scope.toolTriggers).toEqual();
      expect($scope.rhyme.syllable_pattern).toEqual();
      $scope.rhyme.rhymed_text = "this";
      $scope.rhyme.syllable_pattern = "1, 2, 3";
      $scope.$apply();
      expect($scope.rhyme.syllable_pattern).toEqual('1, 2, 3');
      expect($scope.toolTriggers).toEqual("<div class='rhyme-tool-triggers'><div class='rhyme-line'><span ng-click='wordClick({\"word\":\"this\",\"position\":[0,3]})' ng-class=\"{'selected-word': isSelectedWord([0,3])}\" class='rhyme-item word'>this</span></div></div>");
    });
  });

  describe('$scope.showTools', function() {
    it('defaults to false', function() {
      setPageVars(null, null, true);
      $controller('theNinjaCtrl', { toolBelt: mockToolBelt, $scope: $scope });

      expect($scope.showTools).toEqual(false);
    });
  });

  describe('$scope.wordClick()', function() {
    var word;
    beforeEach(function(){
      setPageVars(null, null, true);
      $controller('theNinjaCtrl', { toolBelt: mockToolBelt, $scope: $scope });
      word = {word: 'fake', position: [1, 2]}
    });

    it('broadcasts resetNinjaTools', function() {
      spyOn($scope, "$broadcast");

      $scope.wordClick(word);
      expect($scope.$broadcast).toHaveBeenCalledWith("resetNinjaTools");
    });
    it('sets $scope.selectedWord to the object it was passed', function() {
      expect($scope.selectedWord).toEqual({ word: '$@--@inItIaLiZeR@--@%', position: [  ] })

      $scope.wordClick(word);

      expect($scope.selectedWord).toEqual(word);
    });

    it('sets $scope.showTools to true', function() {
      expect($scope.showTools).toEqual(false)

      $scope.wordClick(word);

      expect($scope.showTools).toEqual(true);
    });
  });

  describe('$scope.isSelectedWord', function() {

    it('returns true if the position array it is passed matches the position array of the current $scope.selectedWord', function() {
      setPageVars(null, null, true);
      $controller('theNinjaCtrl', { toolBelt: mockToolBelt, $scope: $scope });

      $scope.selectedWord = {word: '', position: [1, 1]};

      expect($scope.isSelectedWord([1, 2])).toEqual(false);
      expect($scope.isSelectedWord([1, 1])).toEqual(true);
    });
  });

});