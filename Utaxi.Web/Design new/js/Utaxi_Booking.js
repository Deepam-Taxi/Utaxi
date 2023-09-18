
var GAreaID = "0";

tjq(document).ready(function () {

    //loadPackages_V1();

    tjq('#pickupPlace').show();
    tjq('#dropPlace').show();

    tjq('#pickupdatepicker, #dropdatepicker').datepicker({ minDate: 0 });
    tjq('#pickuptimepicker, #droptimepicker').mdtimepicker();
    tjq('.errorMsg, .errorMsgOTP, .errorMsgBooking').hide();

    //tjq('#divBooking').hide();
    //tjq('#divOTP').hide();
    //tjq('#divBookingSuccess').hide();

    tjq('.searchCabsection').show();
    tjq('.divVehiclesList').hide();
    tjq('.divBookingPanel').hide();
    tjq('.divEditDetails').hide();    

    tjq('#btnSubmit').click(function () {
        ;
        searchRates();
    });

    tjq('#btnConfirmBooking').click(function () {
        ;

        if (isEmptyText('.bookingName') && isEmptyText('.bookingMobileNumber') && isEmptyText('.bookingEmailID') && isEmptyText('.bookingAddress')) {

            if (tjq('#chkTerms').prop('checked')) {
                booknow();
            } else {
                tjq('.errorMsgBooking').show().html('Agree terms and conditions');
            }
        } else {
            tjq('.errorMsgBooking').show().html('Correct the errors');
        }
    });

    tjq('#btnOTPVerify').click(function () {
        verifyOTP();
    });
});

function searchRates() {
    ;
    var pickupDate = tjq('#datepicker').val() + " " + tjq('#timepicker').val();
    var pickupDateValue = new Date(pickupDate);
    var d2 = new Date();

    if (isEmptyText('#pickupPlaceSearch') && isEmptyText('#dropPlaceSearch') && isEmptyText('#datepicker') && isEmptyText('#timepicker')) {
        if (compareDates(pickupDateValue, d2) == false) {
            tjq('.errorMsg').show().html('Previous time will not be allowed');
        } else {
            tjq('.errorMsg').hide().html('Correct the errors');

            tjq('#hdnServiceTypeID').val("1");

            tjq('#hdnpickupPlaceSearch').val(tjq('#pickupPlaceSearch').val());
            tjq('#hdndropPlaceSearch').val(tjq('#dropPlaceSearch').val());
            tjq('#hdnpickupdatepicker').val(tjq('#datepicker').val());
            tjq('#hdnpickuptimepicker').val(tjq('#timepicker').val());

            loadAirportRates();
        }
    } else {
        tjq('.errorMsg').show().html('Correct the errors');
        tjq('#divAvailableRides').hide();
    }
}

function loadAirportRates() {
    ;

    //if (tjq('#hdnServiceTypeID').val() == 1) {
    //    tjq('#pickupPlace').val("Kempegowda International Airport (BLR), Devanahalli, Bengaluru, Karnataka 560300, India");
    //} else {
    //    tjq('#dropPlace').val('Kempegowda International Airport (BLR), Devanahalli, Bengaluru, Karnataka 560300, India');
    //    tjq('#pickupPlace').val();
    //}

    var BookingDate = tjq('#datepicker').val() + ' ' + tjq('#timepicker').val();

    var today = new Date();
    var TripDate = new Date(BookingDate);

    var diffMs = (TripDate - today); // milliseconds between now & BookingDate
    var diffDays = Math.floor(diffMs / 86400000); // days
    var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours 

    var date = new Date(tjq('#datepicker').val());
    var d = date.getDate();
    var m = date.getMonth() + 1; //Month from 0 to 11
    var y = date.getFullYear();
    var pickupDate = '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);

    var time = tjq("#timepicker").val();
    var hours = Number(time.match(/^(\d+)/)[1]);
    var minutes = Number(time.match(/:(\d+)/)[1]);
    var AMPM = time.match(/\s(.*)$/)[1];
    if (AMPM == "PM" && hours < 12) hours = hours + 12;
    if (AMPM == "AM" && hours == 12) hours = hours - 12;
    var sHours = hours.toString();
    var sMinutes = minutes.toString();
    if (hours < 10) sHours = "0" + sHours;
    if (minutes < 10) sMinutes = "0" + sMinutes;
    var pickuptime = sHours + ":" + sMinutes + ":00";

    var fd = new FormData();
    fd.append('trip_type', "1");
    fd.append('airport_pickup', tjq('#pickupPlaceSearch').val());
    fd.append('airport_dropoff', tjq('#dropPlaceSearch').val());
    fd.append('airport_pickupdate', pickupDate);
    fd.append('airport_pickuptime', pickuptime);
    console.log(fd);

    tjq.ajax({
        url: 'https://deepamtaxi.com/admin/web_api/airport_price_details',
        data: fd,
        processData: false,
        contentType: false,
        type: 'POST',
        success: function (data) {
            ;

            var obj;
            if (data.pick_latitude == undefined) {
                obj = JSON.parse(data);
            } else {
                obj = data;
            }

            tjq('#hdnpick_latitude').val(obj.pick_latitude);
            tjq('#hdnpick_longitude').val(obj.pick_longitude);
            tjq('#hdndrop_latitude').val(obj.drop_latitude);
            tjq('#hdndrop_longitude').val(obj.drop_longitude);

            tjq('#pickupplaceEdit').val(tjq('#pickupPlaceSearch').val());
            tjq('#dropplaceEdit').val(tjq('#dropPlaceSearch').val());
            tjq('#datepickerEdit').val(tjq('#datepicker').val());
            tjq('#timepickerEdit').val(tjq('#timepicker').val());

            tjq('#pickupPlaceSearchEdit').val(tjq('#pickupPlaceSearch').val());
            tjq('#dropPlaceSearchEdit').val(tjq('#dropPlaceSearch').val());

            tjq('.ddPickupplace').html(tjq('#pickupPlaceSearch').val());
            tjq('.ddDropplace').html(tjq('#dropPlaceSearch').val());
            tjq('.ddPickupDateTime').html(tjq('#datepicker').val() + " " + tjq('#timepicker').val());

            ;

            tjq('.ratelist').html('');
            var noOfRecords = 0;

            tjq.each(obj.response, function () {

                ;

                noOfRecords += 1;

                tjq("#hdnEstimatedDistance").val(this.distance);

                var appendRateText = "<article class='box'>";

                //Car image block
                appendRateText += "<figure class='col-xs-3'>";
                appendRateText += "<span><img alt='' src='../Design New/images/Car Image/car1.png'></span>";
                appendRateText += "</figure>";

                //Details block
                appendRateText += "<div class='details col-xs-9 clearfix'>";
                appendRateText += "<div class='col-sm-8'>";

                //Car name & Amenties begin block
                appendRateText += "<div class='clearfix'>";

                //Car name block
                appendRateText += "<h4 class='box-title'>" + getCategorybyIDDisplay(this.category_id) + "<small>bmw mini</small></h4>";
                appendRateText += "<div class='logo'>";
                appendRateText += "<img src='' alt='' />";
                appendRateText += "</div>";
                appendRateText += "</div>";

                //amenties block
                appendRateText += "<div class='amenities'>";
                appendRateText += "<ul>";
                appendRateText += "<li><i class='soap-icon-user circle'></i>4</li>";
                appendRateText += "<li><i class='soap-icon-suitcase circle'></i>3</li>";
                appendRateText += "<li><i class='soap-icon-aircon circle'></i>AC</li>";
                appendRateText += "<li><i class='soap-icon-fueltank circle'></i>12</li>";
                appendRateText += "<li><i class='soap-icon-fmstereo circle'></i>YES</li>";
                appendRateText += "</ul>";
                appendRateText += "</div>";

                //Car name & Amenties end block
                appendRateText += "</div>";

                //Price block begin
                appendRateText += "<div class='col-xs-6 col-sm-2 character'>";
                appendRateText += "<dl class=''>";
                appendRateText += "<dt style='font-size:18px;text-decoration: line-through;' class='skin-color'> ₹ " + this.ac_price + "/- </dt>";
                appendRateText += "<dd style='font-size:9px;border-bottom:1px solid #f5f5f5;padding-bottom:12px;'>Regular Price</dd>";
                appendRateText += "<dt style='font-size:22px;' class='skin-color'>₹ " + this.discont_price_ac +"</dt>";
                appendRateText += "<dd style='font-size:14px;font-weight:bold;'>Save</dd>";
                appendRateText += "</dl>";
                appendRateText += "</div>";
                //Price block end

                //Actual price block begin
                appendRateText += "<div class='action col-xs-6 col-sm-2'>";
                appendRateText += "<span style='font-size:18px;' class='price'><small>Actual Price</small>₹ " + this.final_price_ac + "/- </span>";
                appendRateText += "<button type='button' class='button btn-small full-width' data-toggle='modal' data-target='#myModalFare" + noOfRecords +"'>Details</button>";
                appendRateText += "<button type='button' class='button btn-small full-width' data-toggle='modal' data-target='#myModalPhone" + noOfRecords + "' onclick=chooseVehicle(" + this.category_id + ",1," + this.final_price_ac + ",'','')>Select</button>";
                appendRateText += "</div>";
                //Actual price block end

                //Modal popup block begin
                appendRateText += "<div class='container'>";

                //Mobile number block begin
                appendRateText += "<div class='modal fade' id='myModalPhone" + noOfRecords +"' role='dialog'>";
                appendRateText += "<div class='modal-dialog'>";
                appendRateText += "<div class='modal-content'>";
                appendRateText += "<div class='modal-header'>";
                appendRateText += "<button type='button' class='close' data-dismiss='modal'>&times;</button>";
                appendRateText += "<div class='mohe'>";
                appendRateText += "<h5 style='font-size:20px;' class='modal-title'>What's Your Number?</h5>";
                appendRateText += "</div>";
                appendRateText += "</div>";
                appendRateText += "<div class='modal-body'>";
                appendRateText += "<fieldset>";
                appendRateText += "<div class='row' style='padding-left:20px;padding-right:20px;'>";
                appendRateText += "<div class='form-group' style='margin-top:10px;padding-bottom:20px;'>";
                appendRateText += "<div class='row'>";
                appendRateText += "<div class='col-xs-1' style='margin-left:80px;'>";
                appendRateText += "<div class=''>";
                appendRateText += "<input style='width: auto !important;border:2px solid gold;margin-right:0;padding-left:12px;padding-bottom:11.5px;padding-top:10px;' type='text' placeholder='+91'>";
                appendRateText += "</div>";
                appendRateText += "</div>";
                appendRateText += "<div class='col-xs-8'>";
                appendRateText += "<input class='mobilenumber" + noOfRecords + "' style='border:2px solid gold;padding:10px;margin-left:0;padding-bottom:12px;width:80%;font-size:17px;' type='text' placeholder='Phone Number'>";
                appendRateText += "</div>";
                appendRateText += "<div class='col-xs-1'>";
                appendRateText += "</div>";
                appendRateText += "</div>";
                appendRateText += "</div>";

                appendRateText += `<div class="form-group mt-2">
                                        <div class="alert alert-error hide errorMsgOTP">
                                            Correct the errors
                                        </div>
                                    </div>`;

                appendRateText += "</div>";
                appendRateText += "</fieldset>";
                appendRateText += "<fieldset>";
                appendRateText += "<button class='buutton button3 otpSubmit' onclick='submitOTP(\"mobilenumber" + noOfRecords + "\")'>SUBMIT</button>";
                appendRateText += "</fieldset>";
                appendRateText += "</div>";
                appendRateText += "</div>";
                appendRateText += "</div>";
                appendRateText += "</div>";
                //Mobile number block end

                appendRateText += "</div>";
                //Modal popup block end

                appendRateText += `<div class="modal fade" id="myModalFare` + noOfRecords +`" role="dialog">
                    <!-- modal dialog -->
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <!-- modal header -->
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                <div class="mohe">
                                    <h4 class="modal-title">Fare Details :</h4>
                                </div>
                            </div>
                            <!-- end modal header-->
                            <!-- modal body -->
                            <div class="modal-body">
                                <form>
                                    <fieldset>
                                        <div class="row" style="padding-left:20px;padding-right:20px;">
                                            <div class="input-group">
                                                <span style="background-color:#D3D3D3;font-family:Lato;font-size:15px;color:black;font-weight:bold;" class="input-group-addon"><span style="font-size:22px;padding-right:5px;color:black;" class="fa fa-map-marker"></span>Pick-up</span>
                                                <input disabled style="font-family:Lato;font-size:18px;border:2px solid #D8D8D8;padding-top:20px;padding-bottom:20px;background-color:white;color:black;" type="text" class="input-text full-width" value=` + obj.airport_pickup +` />
                                            </div>
                                            <div class="input-group" style="margin-top:20px;">
                                                <span style="background-color:#D3D3D3;font-family:Lato;font-size:15px;color:black;font-weight:bold;" class="input-group-addon"><span style="font-size:22px;padding-right:5px;color:black;" class="fa fa-map-marker"></span>Drop-of</span>
                                                <input disabled style="font-family:Lato;font-size:18px;border:2px solid #D8D8D8;padding-top:20px;padding-bottom:20px;background-color:white;color:black;" type="text" class="input-text full-width" value=` + obj.airport_dropoff +` />
                                            </div>
                                            <div class="form-group" style="margin-top:10px;padding-bottom:20px;">
                                                <h4 style="" class="title">Date & Time*&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Vehicle Type*</h4>
                                                <div class="row">
                                                    <div class="col-xs-4">
                                                        <div class="datepicker-wrap">
                                                            <input disabled style="font-family:Lato;font-size:18px;border:2px solid #D8D8D8;background-color:white;" type="text" name="date_from" class="input-text full-width" value=` + obj.airport_pickupdate +` />
                                                        </div>
                                                    </div>
                                                    <div class="col-xs-4">
                                                        <div class="">
                                                            <input disabled style="margin-right:20px;padding: 6px  6px 6px; background-color:white;color:black;font-family:Lato;font-size:15px;border:2px solid #D8D8D8;" type="text" name="time" value=` + obj.airport_pickuptime +`>
                                                        </div>
                                                    </div>
                                                    <div class="col-xs-4">
                                                        <div class="">
                                                            <input disabled style="font-family:Lato;font-size:18px;border:2px solid #D8D8D8;background-color:white;" type="text" name="car" class="input-text full-width" value=` + this.category +` />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>
                                    <table class="table" style="width:100%">
                                        <tbody>
                                            <p style="border:2px solid gold;margin-bottom:0;padding-top:5px;padding-bottom:5px;font-weight:bold;font-size:15px;color:black;">Information</p>
                                            <tr>
                                                <th>Included Km :</th>
                                                <th><span id="totaldistance">` + this.distance + `</span> km </th>
                                                <td>₹<span class="min_amount_ac">` + this.total_price_ac +`</span></td>
                                            </tr>
                                            <tr>
                                                <th>
                                                    Additional fare/Km
                                                    (beyond included Km)
                                                </th>
                                                <th>₹<span class="extra_km_charge_ac">` + this.extra_km_charge_ac +`</span>/KM</th>
                                                <td></td>
                                            </tr>

                                            <tr class="tetotal_tax_ac" style="display: none;">
                                                <th>GST(<span id="tax_ac"></span>%)     :</th>
                                                <th></th>

                                                <td>₹<span style="font-size: 15px" ;="" for="inputName" name="total_price_tax" id="total_price_tax_ac"></span></td>
                                            </tr>
                                            <tr>
                                                <th>Discount Price:</th>
                                                <th></th>

                                                <td>-₹<span id="discont_price_ac"> ` + this.discont_price_ac +`</span></td>
                                            </tr>
                                            <tr>
                                                <th>Total Fare :</th>
                                                <th></th>

                                                <td>₹<span class="finalprices">` + this.final_price_ac +`</span></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <fieldset>
                                        <legend>Extra Charges and Terms (where applicable):</legend>
                                        <div class="" style="text-align:left;">
                                            1) Toll, Parking, interstate taxes and green tax are applicable as on actuals.<br>
                                            2) AC could be switched off in hilly areas.<br>
                                            3) One day means a calendar day(Midnight 12:00 AM to 11:59 PM).<br>
                                            4)Local sightseeing in origin city is not permitted.<br>
                                            5)Distance travelled beyond 1966 km will be charged at Rs.10/km.<br>
                                            6)Night allowance of Rs.250 per night between 10:00 pm and 6:00 am.
                                        </div>
                                    </fieldset>
                                </form>
                            </div>
                            <!-- end modal body -->
                            <!-- modal footer-->
                            <!-- end modal footer -->
                        </div>
                        <!-- end modal content-->
                    </div>
                    <!-- end modal dialog-->
                </div>`

                //Detail rate block begin
                appendRateText += "</div>";
                appendRateText += "</div>";
                appendRateText += "</article>";

                tjq('.ratelist').append(appendRateText);

                tjq('.divVehiclesList').show();
                tjq('.searchCabsection').hide();
                tjq('html, body').animate({ scrollTop: 0 }, "slow");
            });
        },
        complete: function () {
        },
        failure: function () {
            console.log(result);
        }
    });
}

function loadLocalDropRates() {
    ;

    var BookingDate = tjq('#pickupdatepicker').val() + ' ' + tjq('#pickuptimepicker').val();
    var today = new Date();
    var TripDate = new Date(BookingDate);
    var diffMs = (TripDate - today); // milliseconds between now & BookingDate
    var diffDays = Math.floor(diffMs / 86400000); // days
    var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours 

    if (diffHrs > 2) {
        tjq("#hdnEnableOnlinePayment").val('1');
    }
    else {
        tjq("#hdnEnableOnlinePayment").val('0');
    }
    ;


    var date = new Date(tjq('#pickupdatepicker').val());
    var d = date.getDate();
    var m = date.getMonth() + 1; //Month from 0 to 11
    var y = date.getFullYear();
    var pickupDate = '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);

    var time = tjq("#pickuptimepicker").val();
    var hours = Number(time.match(/^(\d+)/)[1]);
    var minutes = Number(time.match(/:(\d+)/)[1]);
    var AMPM = time.match(/\s(.*)tjq/)[1];
    if (AMPM == "PM" && hours < 12) hours = hours + 12;
    if (AMPM == "AM" && hours == 12) hours = hours - 12;
    var sHours = hours.toString();
    var sMinutes = minutes.toString();
    if (hours < 10) sHours = "0" + sHours;
    if (minutes < 10) sMinutes = "0" + sMinutes;
    var pickuptime = sHours + ":" + sMinutes + ":00";

    var fd = new FormData();

    fd.append('pickup', tjq('#pickupPlace').html());
    fd.append('destination', tjq('#dropPlace').html());
    fd.append('pickupdate', pickupDate);
    fd.append('pickuptime', pickuptime);
    console.log(fd);

    tjq.ajax({
        url: 'https://deepamtaxi.com/admin/web_api/local_price_details',
        data: fd,
        processData: false,
        contentType: false,
        type: 'POST',
        success: function (data) {
            ;

            var obj;
            if (data.pick_latitude == undefined) {
                obj = JSON.parse(data);
            } else {
                obj = data;
            }

            tjq('#hdnpick_latitude').val(obj.pick_latitude);
            tjq('#hdnpick_longitude').val(obj.pick_longitude);
            tjq('#hdndrop_latitude').val(obj.drop_latitude);
            tjq('#hdndrop_longitude').val(obj.drop_longitude);

            var pickupPlace = obj.pickup;
            var dropoffPlace = obj.dropoff;

            ;

            tjq('.ratelist').html('');

            tjq.each(obj.response, function () {
                ;

                tjq("#hdnEstimatedDistance").val(this.distance);

                var appendRateText = "<li class='list-group-item'><div class='row'><div class='col-md-2 col-6 d-none d-md-block'><img src='../Images/car-11-24.png' /></div>";
                appendRateText = appendRateText + "<div class='col-md-5 col-12 cabName'>" + getCategorybyIDDisplay(this.car_category_id) + "</div>";
                appendRateText = appendRateText + "<div class='col-md-2 col-6 cabName'>";

                var tooltipText = '';

                if (this.final_price_ac == "0") {
                    appendRateText = appendRateText + "<button type='button' class='btn btn-success booking marginleft3px' disabled value='NA'>NA</button>";
                } else {
                    appendRateText = appendRateText + "<label class='col-form-label DemoTooltipOffset btn btn-link' onclick=ChooseVehicle_V1(" + this.car_category_id + ",1," + this.final_price_ac + ",'','')><b>₹ " + this.final_price_ac + "</b></label>  </div>";
                    appendRateText = appendRateText + "<div class='col-md-3 col-6 cabName'><button type='button' class='btn btn-outline-primary booking1' onclick=ChooseVehicle_V1(" + this.car_category_id + ",1," + this.final_price_ac + ",'','') value='" + this.final_price_ac + "'>Book Now</button>";
                }

                appendRateText += "<br />";

                if (this.final_price_ac != "0") {
                    if (this.final_price_ac == "0") {
                        appendRateText += "<a style='cursor: pointer;text-decoration: underline;margin-left: 70px;' class='A_FD_AC' onclick='ShowFareDetails_V1(\"" + pickupPlace + "\",\"" + dropoffPlace + "\",\"" + this.time + "\",\"" + this.distance + "\",\"" + this.extra_km_charge_ac + "\",\"" + getCategorybyIDDisplay(this.car_category_id) + "\",\"" + this.total_fare_ac + "\",\"" + this.final_price_ac + "\",\"AC\")' >Details</a>"
                    }
                    else {
                        appendRateText += "<a style='cursor: pointer;text-decoration: underline;margin-left: 25px;' class='A_FD_AC' onclick='ShowFareDetails_V1(\"" + pickupPlace + "\",\"" + dropoffPlace + "\",\"" + this.time + "\",\"" + this.distance + "\",\"" + this.extra_km_charge_ac + "\",\"" + getCategorybyIDDisplay(this.car_category_id) + "\",\"" + this.total_fare_ac + "\",\"" + this.final_price_ac + "\",\"AC\")' >Details</a>"
                    }
                }

                appendRateText = appendRateText + "</div></div></li>";

                tjq('.ratelist').append(appendRateText);

                tjq('.booking_AC').click(function () {
                    tjq('#hdnACTypeID').val('1');
                    tjq('#divSearchRides').hide();
                    tjq('#divAvailableRides').hide();
                    tjq('#divOTPVerification').show();
                    tjq('#divMobileNumber').show();
                    tjq('#divOTP').hide();
                    tjq('.errorMsg, .errorMsgOTP, .errorMsgBooking, .infoMsgOTP').hide();
                    ;
                    tjq('#hdnFare').val(tjq(this).next().val());
                });

                tjq('.booking').click(function () {

                    ;

                    tjq('#hdnACType').val(tjq(this).next().next().text());
                    tjq('#hdnACTypeID').val('0');
                    tjq('#hdnRateID').val(tjq(this).next().next().next().val());

                    clear_OTPFields();

                    tjq('#divSearchRides').hide();
                    tjq('#divAvailableRides').hide();
                    tjq('#divOTPVerification').show();
                    tjq('#divMobileNumber').show();
                    tjq('#divOTP').hide();
                    tjq('.errorMsg, .errorMsgOTP, .errorMsgBooking, .infoMsgOTP').hide();

                    tjq('#hdnFare').val(tjq(this).val());
                    tjq('#hdnACType').val(tjq(this).next().text());
                    tjq('#hdnRateID').val(tjq(this).next().next().val());
                });
            });
        },
        complete: function () {
        },
        failure: function () {
            console.log(result);
        }
    });
}

function loadPackageRates() {
    ;

    var BookingDate = tjq('#pickupdatepicker').val() + ' ' + tjq('#pickuptimepicker').val();
    var today = new Date();
    var TripDate = new Date(BookingDate);
    var diffMs = (TripDate - today); // milliseconds between now & BookingDate
    var diffDays = Math.floor(diffMs / 86400000); // days
    var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours 

    if (diffHrs > 2) {
        tjq("#hdnEnableOnlinePayment").val('1');
    }
    else {
        tjq("#hdnEnableOnlinePayment").val('0');
    }
    ;


    var date = new Date(tjq('#pickupdatepicker').val());
    var d = date.getDate();
    var m = date.getMonth() + 1; //Month from 0 to 11
    var y = date.getFullYear();
    var pickupDate = '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);

    var time = tjq("#pickuptimepicker").val();
    var hours = Number(time.match(/^(\d+)/)[1]);
    var minutes = Number(time.match(/:(\d+)/)[1]);
    var AMPM = time.match(/\s(.*)tjq/)[1];
    if (AMPM == "PM" && hours < 12) hours = hours + 12;
    if (AMPM == "AM" && hours == 12) hours = hours - 12;
    var sHours = hours.toString();
    var sMinutes = minutes.toString();
    if (hours < 10) sHours = "0" + sHours;
    if (minutes < 10) sMinutes = "0" + sMinutes;
    var pickuptime = sHours + ":" + sMinutes + ":00";

    var fd = new FormData();

    fd.append('pickup', tjq('#pickupPlace').html());
    fd.append('package_id', tjq('#hdnServiceTypeID').val());
    fd.append('pickupdate', pickupDate);
    fd.append('pickuptime', pickuptime);
    console.log(fd);

    tjq.ajax({
        url: 'https://deepamtaxi.com/admin/web_api/package_price_details',
        data: fd,
        processData: false,
        contentType: false,
        type: 'POST',
        success: function (data) {
            ;
            console.log(data);

            var obj;
            if (data.pick_latitude == undefined) {
                obj = JSON.parse(data);
            } else {
                obj = data;
            }

            tjq('#hdnpick_latitude').val(obj.pick_latitude);
            tjq('#hdnpick_longitude').val(obj.pick_longitude);
            tjq('#hdndrop_latitude').val(obj.drop_latitude);
            tjq('#hdndrop_longitude').val(obj.drop_longitude);
            tjq('#hdnpackage_name').val(obj.package_name);

            var pickupPlace = obj.pickup;
            var dropoffPlace = obj.dropoff;

            ;

            tjq('.ratelist').html('');

            tjq.each(obj.response, function () {
                ;

                tjq("#hdnEstimatedDistance").val(this.distance);

                var appendRateText = "<li class='list-group-item'><div class='row'><div class='col-md-2 col-6 d-none d-md-block'><img src='../Images/car-11-24.png' /></div>";
                appendRateText = appendRateText + "<div class='col-md-5 col-12 cabName'>" + getCategorybyIDDisplay(this.car_category_id) + "</div>";
                appendRateText = appendRateText + "<div class='col-md-2 col-6 cabName'>";

                var tooltipText = '';

                if (this.final_price_ac == "0") {
                    appendRateText = appendRateText + "<button type='button' class='btn btn-success booking marginleft3px' disabled value='NA'>NA</button>";
                } else {
                    appendRateText = appendRateText + "<label class='col-form-label DemoTooltipOffset btn btn-link' onclick=ChooseVehicle_V1(" + this.car_category_id + ",1," + this.final_price_ac + ")><b>₹ " + this.final_price_ac + "</b></label>  </div>";
                    appendRateText = appendRateText + "<div class='col-md-3 col-6 cabName'><button type='button' class='btn btn-outline-primary booking1' onclick=ChooseVehiclePackage_V1(" + this.car_category_id + ",0," + this.final_price_non_ac + "," + this.min_amount + "," + this.non_ac_extra_km_charge + "," + this.non_extra_hrs_charge + ") value='" + this.final_price_ac + "'>Book Now</button>";
                }

                appendRateText += "<br />";

                if (this.final_price_ac != "0") {
                    if (this.final_price_ac == "0") {
                        appendRateText += "<a style='cursor: pointer;text-decoration: underline;margin-left: 70px;' class='A_FD_AC' onclick='ShowPackageFareDetails_V1(\"" + pickupPlace + "\",\"" + dropoffPlace + "\",\"" + this.ac_extra_km_charge + "\",\"" + getCategorybyIDDisplay(this.car_category_id) + "\",\"" + this.min_amount_ac + "\",\"" + this.final_price_ac + "\",\"AC\")' >Details</a>"
                    }
                    else {
                        appendRateText += "<a style='cursor: pointer;text-decoration: underline;margin-left: 25px;' class='A_FD_AC' onclick='ShowPackageFareDetails_V1(\"" + pickupPlace + "\",\"" + dropoffPlace + "\",\"" + this.ac_extra_km_charge + "\",\"" + getCategorybyIDDisplay(this.car_category_id) + "\",\"" + this.min_amount_ac + "\",\"" + this.final_price_ac + "\",\"AC\")' >Details</a>"
                    }
                }

                appendRateText = appendRateText + "</div></div></li>";

                tjq('.ratelist').append(appendRateText);
            });
        },
        complete: function () {

        },
        failure: function () {
            console.log(result);
        }
    });
}

function booknow() {
    ;
    var date = new Date(tjq('#hdnpickupdatepicker').val());
    var d = date.getDate();
    var m = date.getMonth() + 1; //Month from 0 to 11
    var y = date.getFullYear();
    var pickupDate = '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);

    var time = tjq("#hdnpickuptimepicker").val();
    var hours = Number(time.match(/^(\d+)/)[1]);
    var minutes = Number(time.match(/:(\d+)/)[1]);
    var AMPM = time.match(/\s(.*)$/)[1];
    if (AMPM == "PM" && hours < 12) hours = hours + 12;
    if (AMPM == "AM" && hours == 12) hours = hours - 12;
    var sHours = hours.toString();
    var sMinutes = minutes.toString();
    if (hours < 10) sHours = "0" + sHours;
    if (minutes < 10) sMinutes = "0" + sMinutes;
    var pickuptime = sHours + ":" + sMinutes + ":00";

    var fd = new FormData();
    fd.append('admin_id', '');
    fd.append('phone', tjq('.bookingMobileNumber').val());
    fd.append('name', tjq('.bookingName').val());
    fd.append('email', tjq('.bookingEmailID').val());
    fd.append('customer_comments', '');
    fd.append('address', tjq('.bookingAddress').val());
    fd.append('enquiry', 0);
    fd.append('car_category_id', tjq('#hdnCarCategoryID').val());
    fd.append('pickup', tjq('#hdnpickupPlaceSearch').val());
    fd.append('pick_latitude', tjq('#hdnpick_latitude').val());
    fd.append('pick_longitude', tjq('#hdnpick_longitude').val());
    fd.append('total_price', tjq('#hdnFare').val());
    fd.append('destination', tjq('#hdndropPlaceSearch').val());
    fd.append('drop_latitude', tjq('#hdndrop_latitude').val());
    fd.append('drop_longitude', tjq('#hdndrop_longitude').val());
    fd.append('category', tjq('#hdncarCategory').val());
    fd.append('city_id', '1');
    fd.append('pickupdate', pickupDate);
    fd.append('pickuptime', pickuptime);
    fd.append('estimated_distance', tjq('#hdnEstimatedDistance').val());
    fd.append('percentage', '0');
    fd.append('discont_price', '0');
    fd.append('enquiry_id', '');
    fd.append('coupon_code', tjq('#hdnCoupon_code').val());
    fd.append('coupon_code_discount_amount', tjq('#hdnCoupon_code_discount_amount').val());
    fd.append('coupon_code_discount_percent', tjq('#hdnCoupon_code_discount_amount').val());
    fd.append('category_type', tjq('#hdnACTypeID').val());
    fd.append('trip_type', tjq('#hdnServiceTypeID').val());
    fd.append('customer_id', tjq('#hdncustomer_id').val());
    fd.append('type_of_booking', '2');

    tjq.ajax({
        url: 'https://deepamtaxi.com/admin/web_api/do_airport_bookings',
        data: fd,
        processData: false,
        contentType: false,
        type: 'POST',
        success: function (data) {
            ;

            var obj;
            if (data.status == undefined) {
                obj = JSON.parse(data);
            } else {
                obj = data;
            }

            if (obj.status == true) {

                //var payMode = $("#hdnPaymentType").val();
                //console.log("payMode", payMode);
                //console.log("obj.response", obj.response);

                //if (payMode == "5") {
                //    $('#hdnBookingID').val(obj.response.order_id);

                //    $.post('/Home/SetVariable',
                //        { key: "BookingID", value: obj.response.order_id }, function (data) {

                //            $('.infoMsgSuccess').html("Booked successfully with the BookingID " + $('#hdnBookingID').val() + ". <br \> Kindly provide your valuable feedback either in our facebook or twitter page.");
                //            clear_BookingFields();
                //            clear_OTPFields();
                //            clear_Fields();

                //            $('#divSearchRides').hide();
                //            $('#divAvailableRides').hide();
                //            $('#divOTPVerification').hide();
                //            $('#divBooking').hide();
                //            $('#divOTP').hide();
                //            $('#divBookingSuccess').show();

                //            window.location.href = '/Thank-You-Utaxi.aspx';
                //        });
                //}
                //else {
                //    //$('.p_PaymentProcessing').html('<b>Please wait. We are processing your payment .</b>');
                //    //$('.p_PaymentProcessing').css('color', 'green');
                //    //window.location.href = "https://webapis.utaxi.in/PayTM_GT.aspx?BookID=" + obj.response.order_id;
                //}
            } else {
                //bootbox.alert("There is an issue during the booking. Please try again");
            }
        }
    });
}

function isEmptyText(element) {

    var isValid = false;

    if (tjq(element).val() != '') {
        isValid = true;
        tjq(element).removeClass('error-field');
    } else {
        tjq(element).addClass('error-field');
    }

    return isValid;
}

function isEmptyDiv(element) {
    ;

    var isValid = false;

    if (tjq(element).html().trim() != 'Enter Search Place') {
        isValid = true;
        tjq(element).removeClass('error-field');
    } else {
        tjq(element).addClass('error-field');
    }

    return isValid;
}

function isEmptyDropDown(element) {

    var isValid = false;

    if (tjq(element).val() != '-1') {
        isValid = true;
        tjq(element).removeClass('error-field');
    } else {
        tjq(element).addClass('error-field');
    }

    return isValid;
}

function compareDates(d1, d2) {
    return d1 > d2;
}

function chooseVehicle(carCategoryID, ACTypeID, Fare, coupon_code, coupon_code_discount_percent) {
    tjq('#hdnACTypeID').val(ACTypeID);
    tjq('#hdnFare').val(Fare);
    tjq('#hdnCarCategoryID').val(carCategoryID);
    tjq('#hdncarCategory').val(getCategorybyID(carCategoryID));

    tjq('#hdnCoupon_code').val(coupon_code);
    tjq('#hdnCoupon_code_discount_amount').val(coupon_code_discount_percent);

    //clear_OTPFields();
    //;
}

function submitOTP(mobilenumber) {
    ;
    if (isEmptyText(tjq('.' + mobilenumber))) {
        tjq('.errorMsgOTP').addClass('hide');
        tjq('.otpSubmit').attr('data-dismiss', 'modal');
        sendSMS(mobilenumber);
    } else {
        tjq('.errorMsgOTP').removeClass('hide');
    }
}

function sendSMS(mobilenumber) {
    ;
    var mobileNumber = tjq('.' + mobilenumber).val();

    var fd = new FormData();
    fd.append('phone', mobileNumber);

    tjq.ajax({
        url: 'https://deepamtaxi.com/admin/web_api/login',
        data: fd,
        processData: false,
        contentType: false,
        type: 'POST',
        success: function (data) {
            ;

            var obj;
            if (data.response == undefined) {
                obj = JSON.parse(data);
            } else {
                obj = data;
            }

            tjq('.bookingName').val('');
            tjq('.bookingEmailID').val('');
            tjq('.bookingMobileNumber').val('');
            tjq('.bookingAddress').val('');

            tjq('.bookingAlternatemobilenumber').val('');
            tjq('.bookingComments').val('');

            tjq('.divVehiclesList').hide();
            tjq('.divBookingPanel').show();

            if (obj.response.customer_verification_status == "1") {

                //tjq('.errorMsgOTP').hide();
                //tjq('#divBooking').show();
                tjq('.bookingOTPSection').hide();

                tjq('.bookingName').val(obj.response.customer_name);
                tjq('.bookingEmailID').val(obj.response.customer_email);
                tjq('.bookingAddress').val(obj.response.customer_address);

                tjq('#hdncustomer_id').val(obj.response.customer_id);

                tjq('.bookingMobileNumber').val(mobileNumber);

                tjq('#bookingFare').val(tjq('#hdnFare').val());
                //tjq('#bookingACType').val(tjq('#hdnACTypeID').val());

                //tjq('.p_T').html('');

            }
            else if (obj.response.customer_verification != "") {
                ;

                tjq('#hdnCustomerOTP').val(obj.response.customer_verification);
                tjq('#hdncustomer_id').val(obj.response.customer_id);

                tjq('.bookingOTPSection').show();
            }
        },
    });
}

function verifyOTP() {

    var OTPval = tjq('#hdnCustomerOTP').val();

    if (OTPval == tjq('#bookingOTPNumber').val()) {
        tjq('#btnOTPVerify').removeClass('error-field-otp').addClass('valid-field-otp').text('Verified');
        tjq('#btnConfirmBooking').removeClass('disabled_booking').prop("disabled", false);
        tjq('.errorMsgBooking').hide().html('Correct the errors');
    } else {
        tjq('#btnOTPVerify').addClass('error-field-otp');
        tjq('.errorMsgBooking').show().html('Entered wrong OTP');
    }
}

function getCategorybyID(CategoryID) {
    if (CategoryID == 1) {
        return 'Mini';
    } else if (CategoryID == 2) {
        return 'SEDAN';
    } else if (CategoryID == 3) {
        return 'SUV 6';
    } else if (CategoryID == 4) {
        return 'SUV 7';
    } else if (CategoryID == 5) {
        return 'TEMPO TRAVELLER';
    } else if (CategoryID == 7) {
        return 'Toyota Innova Crysta';
    }
}

function getCategorybyIDDisplay(CategoryID) {
    if (CategoryID == 1) {
        return 'Mini (4+1)';
    } else if (CategoryID == 2) {
        return 'SEDAN (4+1)';
    } else if (CategoryID == 3) {
        return 'SUV (6+1)';
    } else if (CategoryID == 4) {
        return 'SUV (7+1)';
    } else if (CategoryID == 5) {
        return 'TEMPO TRAVELLER (12+1)';
    } else if (CategoryID == 7) {
        return 'Toyota Innova Crysta (7+1)';
    }
}
