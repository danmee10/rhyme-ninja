app.factory('textWrapper', ['metreMachine', function(metreMachine){
  'use strict';

  var tw = {};

  tw.wrapText = function(text, metre) {
    if (_.isUndefined(text) || text ==='') { return "No text."; }
    if (!_.isArray(metre) || metre.length === 0) { return "No metre."; }
    var lineArrs = metreMachine.breakDown(text, metre);

    var wrappedLines = _.map(lineArrs, function(lineArr, index){
      var wrappedLine = _.map(lineArr, function(el) {
        if (/\W/.test(el)) {
          var clickFunction = "nonWordClick($event, " + index + ")";
          var itemClass = "non-word";
        } else {
          var clickFunction = "wordClick($event, " + index + ")";
          var itemClass = "word";
        }

        return "<span ng-click='" + clickFunction + "' class='rhyme-item " + itemClass + "'>" + el + "</span>";
      });

      return "<div class='rhyme-line'>" + wrappedLine.join("") + "</div>";
    });

    return "<div class='rhyme-tool-triggers'>" + wrappedLines.join("") + "</div>";
  };

  return tw;
}]);