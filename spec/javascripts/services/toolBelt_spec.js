'use strict';

describe('Factory: toolBelt', function() {
  beforeEach(module('rhymeNinja'));

  var toolBelt;

  beforeEach(inject(function(_toolBelt_){
    toolBelt = _toolBelt_;
  }));

  describe("tb.wrapText()", function(){
    it('takes a string and returns a string', function() {
      var returnType = typeof toolBelt.wrapText("some string", [1]);
      expect(returnType).toEqual('string');
    });

    it('should return a string that contains html', function() {
      var val = toolBelt.wrapText("some string", [1]);
      expect(val.substring(0, 25)).toEqual("<div class='rhyme-tools'>");
      expect($(val).children().length).toEqual(2);
    });

    it('should not break if called with no arguments', function() {
      expect(toolBelt.wrapText()).toEqual('No text.')
      expect(toolBelt.wrapText('text')).toEqual('No metre.')
    });
  });

});