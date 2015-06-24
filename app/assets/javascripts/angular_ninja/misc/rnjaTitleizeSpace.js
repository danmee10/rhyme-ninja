app.filter('rnjaTitleizeSpace', function() {
  return function(input) {
    if (input === " ") {
      return "White Space";
    } else {
      return input;
    }
  };
});