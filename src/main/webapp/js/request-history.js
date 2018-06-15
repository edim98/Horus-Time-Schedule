$(document).ready(function() {
  $('.show-info').click(function(event){
    event.stopPropagation();
    var closest_tr = $(this).closest('tr');
    var hidden_tr = $(closest_tr).next('.hidden-info');
    hidden_tr.slideToggle('fast');
  });
});
