$(document).ready(function(){

    // FORM VALIDATION
    $("#entry_form").validate({
    
    submitHandler: function(form) {
        $(".btn-primary.submit").val('Please wait...').addClass('disabled');
        form.submit();
    }
    
    });

  // AJAXIFY LIKE BUTTONS
  $('.action-like').click(function(){

    var button = this;

    $(this).addClass('disabled');

    $.post($(this).attr('the_link'), function(data) {
      if(data.valid){
        $(button).removeClass('disabled');
        $(button).addClass('on');
      }else{
        alert(data.message);
        $(button).removeClass('disabled');
      }
    }, 'json');
  });


  $('#idea_content').limit('200','#charsLeft');

  $('#comment_body.logged-out').on('focus', function() {
    $('#social-login-user').reveal();
  })
  
  // assign the slider to a variable
  var slider = $('#gallery .carousel').bxSlider({
    childSelector: '.slide',
    mode: 'fade',
    controls: false
  });
  
  // assign a click event to the external thumbnails
  $('.thumbs a').click(function(){
    var thumbIndex = $('.thumbs a').index(this);
  // call the "goToSlide" public function
  slider.goToSlide(thumbIndex);
  
  // remove all active classes
  $('.thumbs a').removeClass('pager-active');
  // assisgn "pager-active" to clicked thumb
  $(this).addClass('pager-active');
  // very important! you must kill the links default behavior
  return false;
});
  
  // assign "pager-active" class to the first thumb
  $('.thumbs a:first').addClass('pager-active');


  function geocodeAddress(address) {

    GMaps.geocode({
      address: address,
      region: 'GB',
      callback: function(results, status) {
        if (status == 'OK') {
          console.log(results[0].formatted_address)
          var latlng = results[0].geometry.location;

          $('#addressLat').val(latlng.lat())
          $('#addressLng').val(latlng.lng())

          miniMap.setCenter(latlng.lat(), latlng.lng());
          miniMap.setZoom(16);
          miniMap.addMarker({
            lat: latlng.lat(),
            lng: latlng.lng()
          });
        }
      }
    });
  }

  var miniMap = new GMaps({
      lat: 51.45,
      lng: -2.58,
      zoom: 12,
      div: '#miniMap'
  })
  
  $('#address').bind('keypress', function(e){
    var code = (e.keyCode ? e.keyCode : e.which);
    if(code == 13) {
      e.preventDefault();
      geocodeAddress($('#address').val());
    }
  });

  $('#addressBtn').click(function(e){
    geocodeAddress($('#address').val());
  });


});