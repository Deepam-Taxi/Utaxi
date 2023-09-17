$(document).ready(function () {
    $(".numberOnly").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            // Allow: Ctrl+A, Command+A
            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
            // Allow: home, end, left, right, down, up
            (e.keyCode >= 35 && e.keyCode <= 40)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });

    $(".alphaOnly").keydown(function (e) {
        return this.optional(element) || value == value.match(/^[a-zA-Z\s]+$/);
    });
	 
	 var timeoutID;

   $('#dropPlaceSearch').bind('input', function() {
      clearTimeout(timeoutID);
      var $this = $(this);
	  $("#li_drop_loc").html('');
      timeoutID = setTimeout(function() {
         var pickup = $this.val();
         if (pickup.length > 2) {
			$("#li_drop_loc").show();
            var html = '';
            $.ajax({
               type: 'POST',
			   url: 'https://www.deepamtaxi.com/template/deepamcabs_get_location/',
               data: {
                  'pickup': pickup,
				  'pickup_flag': false
               },
               dataType: 'json',
               success: function(data) {
                     $.each(data, function(key, value) {
                        html += "<li onClick='dropFunction(\"" + value.pickup_area_name + "\")'>" + value.pickup_area_name + "</li>";

                     });
                     $('#li_drop_loc').html(html);
               }

            });
         }
      }, 1000);
   });

   $('#pickupPlaceSearch').bind('input', function() {
      clearTimeout(timeoutID);
      var $this = $(this);
	  $("#li_pick_loc").html('');
      timeoutID = setTimeout(function() {
         var pickup = $this.val();
         if (pickup.length > 2) {
			$('#li_pick_loc').show();
            var html = '';
            $.ajax({
               type: 'POST',
			   url: 'https://www.deepamtaxi.com/template/deepamcabs_get_location/',
               data: {
                  'pickup': pickup,
				  'pickup_flag': true
               },
               dataType: 'json',
               success: function(data) {
                     $.each(data, function(key, value) {
                        html += "<li onClick='pickFunction(\"" + value.pickup_area_name + "\")'>" + value.pickup_area_name + "</li>";

                     });
                     $('#li_pick_loc').html(html);
               }

            });
         }
      }, 1000);
   });
});

function pickFunction(s){
var html ='';
 $("#pickupPlaceSearch").val(s);
 $("#pickupPlace").html(s);
 $("#li_pick_loc").hide();	  
 $('#li_pick_loc').html(html);
} 
function dropFunction(s){
var html ='';
 $("#dropPlaceSearch").val(s);
 $("#dropPlace").html(s);
 $("#li_drop_loc").hide();	  
 $('#li_drop_loc').html(html);
} 