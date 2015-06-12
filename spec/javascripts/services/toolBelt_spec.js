'use strict';

describe('Factory: toolBelt', function() {
  beforeEach(module('rhymeNinja'));

  var toolBelt;

  beforeEach(inject(function(_toolBelt_){
    toolBelt = _toolBelt_;
  }));

  describe("tb.processText()", function(){
    it('takes a string and returns a string', function() {
      var returnType = typeof toolBelt.processText("some string");
      // expect(returnType).toEqual('string');
    });

    it('should return a string that contains html', function() {
    //   var val = toolBelt.processText("some string");
    //   expect(val.substring(0, 23)).toEqual("<div class='ninja-text'>");
    //   expect($(val).children().length()).toEqual(1);
    });


  });

});