$('.logout').on('click', function(event){
  event.stopPropagation();
  url = '../login.html';
  Cookies.remove('relevantData');
  $(location).attr('href', url);
});
