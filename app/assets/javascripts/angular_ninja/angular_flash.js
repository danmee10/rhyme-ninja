app.factory('angularFlash', [function(){
  var flash = {
    alertDanger: function (msg) {
      $('#js_flash').show();
      $('#js_flash').addClass('alert-danger');
      $('#js_flash').append(msg);
    }
  };
  return flash;
}])