app.factory('angularFlash', [function(){
  var flash = {
    alertDanger: function (msg) {
      if ($('#js_flash').css('display') === 'none') {
        $('#js_flash').show();
        $('#js_flash').addClass('alert-danger');
        $('#js_flash').append("<span>" + msg + "</span>");
        setTimeout(function(){
          $('#js_flash').fadeOut("slow", function(){
            $("#js_flash > span:last-child").remove();
            $("#js_flash").removeClass('alert-danger alert-success');
          });
        }, 1000);
      }
    },
    alertSuccess: function (msg) {
      if ($('#js_flash').css('display') === 'none') {
        $('#js_flash').show();
        $('#js_flash').addClass('alert-success');
        $('#js_flash').append("<span>" + msg + "</span>");
        setTimeout(function(){
          $('#js_flash').fadeOut("slow", function(){
            $("#js_flash > span:last-child").remove();
            $("#js_flash").removeClass('alert-danger alert-success');
          });
        }, 1000);
      }
    }
  };
  return flash;
}])