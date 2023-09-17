/*
 * Title:   Travelo - Travel, Tour Booking HTML5 Template - Custom Javascript file
 * Author:  http://themeforest.net/user/soaptheme
 */

tjq(document).ready(function() {
    // UI Form Element
});
tjq("input[name=time]").clockTimePicker({
    placement: 'bottom',
    align: 'left',
    autoclose: true,
    default: 'now',
    donetext: "Select",
    init: function() { 
                              console.log("colorpicker initiated");
                          },
                          beforeShow: function() {
                              console.log("before show");
                          },
                          afterShow: function() {
                              console.log("after show");
                          },
                          beforeHide: function() {
                              console.log("before hide");
                          },
                          afterHide: function() {
                              console.log("after hide");
                          },
                          beforeHourSelect: function() {
                              console.log("before hour selected");
                          },
                          afterHourSelect: function() {
                              console.log("after hour selected");
                          },
                          beforeDone: function() {
                              console.log("before done");
                          },
                          afterDone: function() {
                              console.log("after done");
                          }
  });
  