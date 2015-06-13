'use strict';

describe('Factory: textWrapper', function() {
  beforeEach(module('rhymeNinja'));

  var textWrapper;

  beforeEach(inject(function(_textWrapper_){
    textWrapper = _textWrapper_;
  }));

  describe("tb.wrapText()", function(){
    it('takes a string and returns a string', function() {
      var returnType = typeof textWrapper.wrapText("some string", [1]);
      expect(returnType).toEqual('string');
    });

    it('should return a string that contains html', function() {
      var val = textWrapper.wrapText("some string", [1]);
      expect(val.substring(0, 33)).toEqual("<div class='rhyme-tool-triggers'>");
      expect($(val).children().length).toEqual(2);
    });

    it('should not break if called with no arguments', function() {
      expect(textWrapper.wrapText()).toEqual('No text.')
      expect(textWrapper.wrapText('text')).toEqual('No metre.')
    });
  });

});