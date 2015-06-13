'use strict';

describe('Factory: stringMapper', function() {
  beforeEach(module('rhymeNinja'));

  var stringMapper;

  beforeEach(inject(function(_stringMapper_){
    stringMapper = _stringMapper_;
  }));

  describe('sm.mapString()', function() {

    it('accepts a string and returns an array of objects', function() {
      var input = "this is a string";
      var output = stringMapper.mapString(input);

      expect(_.isArray(output)).toEqual(true);
      expect(_.isObject(output[0])).toEqual(true);
    });

    it('breaks each word down into an object with word and position properties', function() {
      var input = "this is a string";
      var output = stringMapper.mapString(input);

      _.forEach(output, function(obj){
        expect(_.keys(obj)).toEqual(['word', 'position'])
      });
    });

    it("makes each array item's word property the original word", function() {
      var input = "this is a string";
      var output = stringMapper.mapString(input);

      expect(output[0].word).toEqual("this")
      expect(output[1].word).toEqual(" ")
      expect(output[2].word).toEqual("is")
    });

    it("makes each array item's position property an array of that words start and end index in the original string", function() {
      var input = "this is a string";
      var output = stringMapper.mapString(input);

      expect(output[0].position).toEqual([0, 3])
      expect(output[1].position).toEqual([4, 4])
      expect(output[2].position).toEqual([5, 6])
    });
  });

});