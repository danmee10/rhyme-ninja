'use strict';

describe('Factory: metreMachine', function() {
  beforeEach(module('rhymeNinja'));

  var metreMachine;

  beforeEach(inject(function(_metreMachine_){
    metreMachine = _metreMachine_;
  }));

  describe('mm.breakDown()', function() {

    it('takes a string and returns an array of arrays that contain objects', function() {
      var input = "this is a string";
      var output = metreMachine.breakDown(input, [1]);

      expect(_.isArray(output)).toEqual(true);
      _.forEach(output, function(a){
        expect(_.isArray(a)).toEqual(true);
        _.forEach(a, function(subA){
          expect(_.isObject(subA)).toEqual(true);
        });
      });
    });

    it('creates the sub-arrays such that they contain strings with a maximum number of syllables defined in the second arg', inject(function(syllableCounter) {
      var input = "this is more input so that we can ensure that the breakDown function is respecting the syllable arg";
      var output = metreMachine.breakDown(input, [3]);

      _.forEach(output, function(o){
        var sylCount = 0;
        _.forEach(o, function(obj){
          sylCount += syllableCounter.bestGuess(obj.word);
        });
        expect(sylCount <= 3).toEqual(true);
      });

      expect(output.length).toEqual(10);
    }));

    it('uses each syllable count in the second arg for a line in order and then repeats if more words remain', inject(function(syllableCounter) {
      var input = "this is more input so that we can ensure that the breakDown function is respecting the syllable arg";
      var syllPattern = [3, 2, 1, 4];
      var output = metreMachine.breakDown(input, syllPattern);

      var index = 0;
      _.forEach(output, function(o){
        var sylCount = 0;
        _.forEach(o, function(obj){
          sylCount += syllableCounter.bestGuess(obj.word);
        });
        expect(sylCount <= syllPattern[index]).toEqual(true);

        if (index < 3){
          index ++;
        } else {
          index = 0;
        }
      });

      expect(output.length).toEqual(14);
    }));

  });

});