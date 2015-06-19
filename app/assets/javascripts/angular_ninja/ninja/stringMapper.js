app.factory('stringMapper', [function(){
  'use strict';

  var sm = {};

  sm.mapString = function(string) {
    var arr = string.split(/(\W)/);

    _.remove(arr, function(w){
      return w === '';
    });

    var wOA = _.map(arr, function(word, index, coll){
      if (index === 0) {
        var startIndex = 0;
        var endIndex = word.length - 1;
      } else {
        var startIndex = coll.slice(0, index).join('').length;
        var endIndex = startIndex + (word.length - 1);
      }

      var position = [startIndex, endIndex];

      if (/\'|\"/.test(word)){
        word = "\""
      }
      return {word: word, position: position};
    });

    return wOA;
  }

  return sm;
}]);