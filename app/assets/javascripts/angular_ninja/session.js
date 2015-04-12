app.factory('session', [function(){
  var s = {
    user_id: '',
    authenticity_token: ''
  };
  return s;
}])