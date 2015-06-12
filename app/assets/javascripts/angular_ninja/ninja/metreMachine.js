app.factory('metreMachine', ['syllableCounter', function(syllableCounter){
  'use strict';

  var mm = {};

  var buildLine = function(subWordArr, lineSyls) {
    var lineSylCount = -1;
    var line = _.takeWhile(subWordArr, function(word) {
      lineSylCount += syllableCounter.bestGuess(word);
      return lineSylCount < lineSyls;
    });
    return line;
  };

  mm.breakDown = function(text, sylCount) {
    var collection = [];
    var wordArr = text.split(/(\W)/);

    var sylIndex = 0;
    while (wordArr.length > 0) {
      var newLine = buildLine(wordArr, sylCount[sylIndex]);
      if (sylIndex < (sylCount.length - 1)) {
        sylIndex++;
      } else {
        sylIndex = 0;
      }

      wordArr.splice(0, newLine.length);
      collection.push(newLine);
    };

    return collection;
  };

  return mm;
}]);
