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

    it('treats non-word characters as though they have zero syllables', function() {
      var input = "-";
      var output = syllableCounter.bestGuess(input);

      expect(output).toEqual(0);
    });
  });

});