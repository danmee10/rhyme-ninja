'use strict';

describe('factory: toolBelt', function() {
  beforeEach(module('rhymeNinja'));

  var toolBelt;

  beforeEach(inject(function(_toolBelt_){
    toolBelt = _toolBelt_;
  }));

  describe("toolBelt.processText()", function(){
    it('takes a string and returns a string', function() {
      var returnType = typeof toolBelt.processText("some string");
      expect(returnType).toEqual('string')
    });
  });

});