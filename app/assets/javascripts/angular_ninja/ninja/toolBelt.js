app.factory('toolBelt', [function(){
  var processText = function(text) {
    return text;
  };

  var tb = {
    processText: processText
  }
  return tb;
}]);