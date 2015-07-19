app.factory('angularFlash', [function(){
  var flash = {
    alertDanger: function (msg) {
      if ($('#js_flash').css('display') === 'none') {
        $('#js_flash').show();
        $('#js_flash').addClass('alert-danger');
        $('#js_flash').append("<span>" + msg + "</span>");
      }
    },
    alertSuccess: function (msg) {
      if ($('#js_flash').css('display') === 'none') {
        $('#js_flash').show();
        $('#js_flash').addClass('alert-success');
        $('#js_flash').append("<span>" + msg + "</span>");
      }
    }
  };
  return flash;
}])