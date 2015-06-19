app.factory('textWrapper', ['metreMachine', function(metreMachine){
  'use strict';

  var tw = {};

  tw.wrapText = function(text, metre) {
    if (_.isUndefined(text) || text ==='') { return "No text."; }
    if (!_.isArray(metre) || metre.length === 0) { return "No metre."; }
    var lineArrs = metreMachine.breakDown(text, metre);

    var wrappedLines = _.map(lineArrs, function(lineArr){
      var wrappedLine = _.map(lineArr, function(el) {
        var clickFunction = "wordClick(" + JSON.stringify(el) + ")";
        if (/\W/.test(el.word)) {
          var itemClass = "non-word";
        } else {
          var itemClass = "word";
        }

        var pos = JSON.stringify(el.position)
        return "<span ng-click='" + clickFunction + "' ng-class=\"{'selected-word': isSelectedWord(" + pos + ")}\" class='rhyme-item " + itemClass + "'>" + el.word + "</span>";
      });

      return "<div class='rhyme-line'>" + wrappedLine.join("") + "</div>";
    });

    return "<div class='rhyme-tool-triggers'>" + wrappedLines.join("") + "</div>";
  };

  return tw;
}]);