'use strict';

describe('Factory: syllableCounter', function() {
  beforeEach(module('rhymeNinja'));

  var syllableCounter;

  beforeEach(inject(function(_syllableCounter_){
    syllableCounter = _syllableCounter_;
  }));

  describe('sc.bestGuess()', function() {

    it('takes a string and returns the number of syllables in that word', function() {
      var input = "syllables";
      var output = syllableCounter.bestGuess(input);

      expect(output).toEqual(3);
    });

    it('treats non-word and characters as though they have zero syllables', function() {
      var inputOne = "-";
      var inputTwo = "2";
      var outputOne = syllableCounter.bestGuess(inputOne);
      var outputTwo = syllableCounter.bestGuess(inputTwo);

      expect(outputOne).toEqual(0);
      expect(outputTwo).toEqual(0);
    });
  });

});