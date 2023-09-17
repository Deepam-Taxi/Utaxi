
var GAreaID = "0";

$(document).ready(function () {

    //loadPackages();

    loadPackages_V1();
    var fare = '';
    var mobileNumber = '';
    $("#hdnPaymentType").val('5');
    $('#pickupPlaceSearch').hide();
    $('#pickupPlace').show();
    $('#dropPlaceSearch').hide();
    $('#dropPlace').show();

    $('#pickupdatepicker, #dropdatepicker').datepicker({ minDate: 0 });
    $('#pickuptimepicker, #droptimepicker').mdtimepicker();
    $('.errorMsg, .errorMsgOTP, .errorMsgBooking, .infoMsgOTP').hide();

    $('#divSearchRides').show();
    $('#divAvailableRides').hide();
    $('#divOTPVerification').hide();
    $('#divBooking').hide();
    $('#divOTP').hide();
    $('#divBookingSuccess').hide();

    //Default pickup should be hide and drop should be show.
    $('#divPickup').hide();
    $('#divDrop').show();
    $('#airportPickupOptions').show();
    $('#outstationOptions').hide();
    $('#divPackageType').hide();
    $('#divDropTime').hide();
    $('#divAiportPickupField').show();
    $('#divAiportDropField').hide();

    $('#hdnServiceNameID').val("7");
    $('#hdnServiceTypeID').val("1");
    $('#hdnStatusID').val("2");

    debugger;
    var PackageTypevalue = $('#hdnPackageType').val();
    var AirportServiceNameID = $('#hdnAirportServiceNameID').val();

    if (PackageTypevalue != '') {
        showTabs('Package');
        $('#idAirportTab').removeClass('active');
        $('#idPackageTab').addClass('active');
    } else if (AirportServiceNameID == '6') {
        showTabs('Outstation');
        $('#idAirportTab').removeClass('active');
        $('#idOutstationTab').addClass('active');
    } else if (AirportServiceNameID != '') {

        $("input[name=pickupOption][value=" + AirportServiceNameID + "]").attr('checked', 'checked');

        $('#hdnServiceTypeID').val(AirportServiceNameID);
        $('#hdnStatusID').val("2");
    }

    loadPickupDropOptions();

    $('#rdAirportPickup').click(function () {
        clear_Fields();
		$('#li_drop_loc').html('');
		$('#li_pick_loc').html('');
        $('#pickupPlaceSearch').hide();
        $('#pickupPlace').show();
        $('#dropPlaceSearch').hide();
        $('#dropPlace').show();
        $('#divAiportPickupField').show();
        $('#divAiportDropField').hide();

        $('#divPickup').hide();
        $('#divDrop').show();
        $('#divAvailableRides').hide();

        $('#hdnServiceTypeID').val("1");
        $('#hdnStatusID').val("2");
    });

    $('#rdAirportDrop').click(function () {
        clear_Fields();
		$('#li_drop_loc').html('');
		$('#li_pick_loc').html('');
        $('#pickupPlaceSearch').hide();
        $('#pickupPlace').show();
        $('#dropPlaceSearch').hide();
        $('#dropPlace').show();
        $('#divAiportPickupField').hide();
        $('#divAiportDropField').show();

        $('#divPickup').show();
        $('#divDrop').hide();
        $('#divAvailableRides').hide();

        $('#hdnServiceTypeID').val("2");
        $('#hdnStatusID').val("2");
    });

    $('#rdAirportRT').click(function () {
        clear_Fields();
		$('#li_drop_loc').html('');
		$('#li_pick_loc').html('');
        $('#pickupPlaceSearch').hide();
        $('#pickupPlace').show();
        $('#dropPlaceSearch').hide();
        $('#dropPlace').show();
        $('#divAiportPickupField').hide();
        $('#divAiportDropField').show();

        $('#divPickup').show();
        $('#divDrop').hide();
        $('#divAvailableRides').hide();

        $('#hdnServiceTypeID').val("3");
        $('#hdnStatusID').val("2");
    });

    $('.clsbookNow').click(function () {
        $('#divSearchRides').show();
        $('#divBookingSuccess').hide();
    });

    $('#pickupPlace').click(function () {
        debugger;
        $('#pickupPlaceSearch').show().val('').focus();
        $('#pickupPlace').hide();
        $('#divAvailableRides').hide();
    });

    $('#pickupdatepicker').click(function () {
        debugger;
        $('#divAvailableRides').hide();
    });

    $('#dropdatepicker').click(function () {
        debugger;
        $('#divAvailableRides').hide();
    });

    $('#pickuptimepicker').click(function () {
        debugger;
        $('#divAvailableRides').hide();
    });

    $('#droptimepicker').click(function () {
        debugger;
        $('#divAvailableRides').hide();
    });

    $('#dropPlace').click(function () {
        $('#dropPlaceSearch').show().val('').focus();
        $('#dropPlace').hide();
        $('#divAvailableRides').hide();
    });

    $('#btnSubmit').click(function () {
        debugger;
        searchRates_V1();
    });

    $('#btnSubmitOTP').click(function () {
        debugger;
        submitOTP_V1();
    });

    $('#btnBooknow').click(function () {

        if (isEmptyText('#bookingMobileNumber') && isEmptyText('#bookingName') && isEmptyText('#bookingEmailID') && isEmptyDropDown('#bookingACType') && isEmptyText('#bookingAddress')) {

            $('.errorMsgBooking').hide();

            booknow_V1();
        } else {
            $('.errorMsgBooking').show();
        }
    });

    $('#btnCancelOTP, #btnReplan').click(function () {

        $('#divSearchRides').show();
        $('#divAvailableRides').show();
        $('#divOTPVerification').hide();
        $('#divBooking').hide();
        clear_OTPFields();
    });

});

function submitOTP_V1() {
    if ($('#divMobileNumber').is(":visible")) {
        if (isEmptyText('#mobileNumber')) {
            sendSMS_V1();
        } else {
            $('.errorMsgOTP').show();
        }
    } else {
        if (isEmptyText('#OTP')) {

            var OTPval = $('#hdnCustomerOTP').val();

            if (OTPval == $('#OTP').val()) {

                $('#divBooking').show();
                $('#divOTPVerification').hide();

                mobileNumber = $('#mobileNumber').val();

                $('#bookingMobileNumber').val(mobileNumber);
                $('#bookingFare').val($('#hdnFare').val());

                if ($('#hdnACTypeID').val() == 0) {
                    $('#bookingACType').val(2);
                } else {
                    $('#bookingACType').val($('#hdnACTypeID').val());
                }

                console.log("hdnACType", $('#hdnACTypeID').val());
                $('.errorMsgOTP').hide().html('<strong>!</strong> Correct the errors');
            } else {
                $('.errorMsgOTP').show().html('<strong>!</strong> Entered wrong OTP');
            }
        } else {
            $('.errorMsgOTP').show();
        }
    }
}

function searchRates_V1() {
    debugger;
    var tabName = $('.nav-item .active').text();

    var pickupDate = $('#pickupdatepicker').val() + " " + $('#pickuptimepicker').val();
    var dropDate = $('#dropdatepicker').val() + " " + $('#droptimepicker').val();

    var pickupDate_V1 = $('#pickupdatepicker').val();
    var pickupTime_V1 = $('#pickuptimepicker').val();
    var dropDate_V1 = $('#dropdatepicker').val();
    var dropTime_V1 = $('#droptimepicker').val();

    var pickupDateValue = new Date(pickupDate);
    var dropDatevalue = new Date(dropDate);
    var d2 = new Date();

    //if (tabName == 'Airport Transfer') {

    if ($("#rdAirportPickup").is(":checked")) {
        if (isEmptyDiv('#dropPlace') && isEmptyText('#pickupdatepicker') && isEmptyText('#pickuptimepicker')) {

            if (compareDates(pickupDateValue, d2) == false) {
                $('.errorMsg').show().html('<strong>!</strong> Previous time will not be allowed');
                $('#divAvailableRides').hide();
            } else {

                $('.errorMsg').hide().html('<strong>!</strong> Correct the errors');
                $('#divAvailableRides').show();

                $('#hdnServiceTypeID').val("1");
            }
        } else {
            $('.errorMsg').show().html('<strong>!</strong> Correct the errors');;
            $('#divAvailableRides').hide();
        }
    }
    else if ($("#rdAirportDrop").is(":checked")) {
        if (isEmptyDiv('#pickupPlace') && isEmptyText('#pickupdatepicker') && isEmptyText('#pickuptimepicker')) {
            if (compareDates(pickupDateValue, d2) == false) {
                $('.errorMsg').show().html('<strong>!</strong> Previous time will not be allowed');
                $('#divAvailableRides').hide();
            } else {
                $('.errorMsg').hide();
                $('#divAvailableRides').show();

                $('#hdnServiceTypeID').val("2");
            }
        } else {
            $('.errorMsg').show().html('<strong>!</strong> Correct the errors');
            $('#divAvailableRides').hide();
        }
    }
    else if ($("#rdAirportRT").is(":checked")) {
        if (compareDates(pickupDateValue, d2) == false) {
            $('.errorMsg').show().html('<strong>!</strong> Previous time will not be allowed');
            $('#divAvailableRides').hide();
        } else {
            if (isEmptyDiv('#pickupPlace') && isEmptyText('#pickupdatepicker') && isEmptyText('#pickuptimepicker')) {
                $('.errorMsg').hide();
                $('#divAvailableRides').show();
                $('#hdnServiceTypeID').val("3");
            } else {
                $('.errorMsg').show().html('<strong>!</strong> Correct the errors');
                $('#divAvailableRides').hide();
            }
        }
    }

    loadAirportRates();
    //}
    //else if (tabName == 'Local Drop') {
    //    if (isEmptyDiv('#dropPlace') && isEmptyDiv('#pickupPlace') && isEmptyText('#pickupdatepicker') && isEmptyText('#pickuptimepicker')) {
    //        if (compareDates(pickupDateValue, d2) == false) {
    //            $('.errorMsg').show().html('<strong>!</strong> Previous time will not be allowed');
    //            $('#divAvailableRides').hide();
    //        } else {
    //            $('.errorMsg').hide().html('<strong>!</strong> Correct the errors');
    //            $('#divAvailableRides').show();

    //            $('#hdnServiceNameID').val("1");
    //            $('#hdnServiceTypeID').val("1");
    //        }

    //    } else {
    //        $('.errorMsg').show().html('<strong>!</strong> Correct the errors');
    //        $('#divAvailableRides').hide();
    //    }
    //    loadLocalDropRates();
    //}
    //else if (tabName == 'Local Package') {
    //    if (compareDates(pickupDateValue, d2) == false) {
    //        $('.errorMsg').show().html('<strong>!</strong> Previous time will not be allowed');
    //        $('#divAvailableRides').hide();
    //    } else {
    //        $('#hdnServiceNameID').val("2");
    //        if (isEmptyDiv('#pickupPlace') && isEmptyDropDown('#ddlPackageType') && isEmptyText('#pickupdatepicker') && isEmptyText('#pickuptimepicker')) {
    //            $('.errorMsg').hide().html('<strong>!</strong> Correct the errors');;

    //            var ServiceTypeID = $('#ddlPackageType option:selected').val();
    //            $('#hdnServiceTypeID').val(ServiceTypeID);

    //            $('#dropPlace').html("Package");
    //            $('#divAvailableRides').show();
    //        } else {
    //            $('.errorMsg').show().html('<strong>!</strong> Correct the errors');
    //            $('#divAvailableRides').hide();
    //        }
    //    }

    //    var PackageTypevalue = $('#hdnPackageType').val();
    //    var PackageRateID = $('#hdnPackageRateID').val();
    //    var PackageACTypeID = $('#hdnPackageACTypeID').val();
    //    var PackageFare = $('#hdnPackageFare').val();

    //    if (PackageTypevalue != '') {
    //        ChooseVehicle(PackageRateID, PackageACTypeID, PackageFare);
    //    } else {
    //        loadPackageRates();
    //    }
    //}
    //else if (tabName == 'Outstation') {
    //    $('#hdnServiceNameID').val("3");
    //    $('#hdnServiceTypeID').val("4");

    //    if ($('#hdnOutstationTypeID').val() == "1") {
    //        if (isEmptyDiv('#pickupPlace') && isEmptyDiv('#dropPlace') && isEmptyText('#pickupdatepicker') && isEmptyText('#pickuptimepicker')) {

    //            if (compareDates(pickupDateValue, d2) == false) {
    //                $('.errorMsg').show().html('<strong>!</strong> Previous time will not be allowed');
    //                $('#divAvailableRides').hide();
    //            } else {
    //                $('.errorMsg').hide().html('<strong>!</strong> Correct the errors');;
    //                $('#divAvailableRides').show();
    //            }
    //        } else {
    //            $('.errorMsg').show().html('<strong>!</strong> Correct the errors');;
    //            $('#divAvailableRides').hide();
    //        }
    //    } else {
    //        if (isEmptyDiv('#pickupPlace') && isEmptyDiv('#dropPlace') && isEmptyText('#pickupdatepicker') && isEmptyText('#pickuptimepicker') && isEmptyText('#dropdatepicker') && isEmptyText('#droptimepicker')) {

    //            if (compareDates(pickupDateValue, d2) == false || compareDates(dropDatevalue, d2) == false) {
    //                $('.errorMsg').show().html('<strong>!</strong> Previous time will not be allowed');
    //                $('#divAvailableRides').hide();
    //            } else {
    //                $('.errorMsg').hide().html('<strong>!</strong> Correct the errors');;
    //                $('#divAvailableRides').show();
    //            }
    //        } else {
    //            $('.errorMsg').show().html('<strong>!</strong> Correct the errors');;
    //            $('#divAvailableRides').hide();
    //        }
    //    }
    //    loadAvailableRides();
    //}
    //else if (tabName == 'OutstationPackages') {
    //    if (compareDates(pickupDateValue, d2) == false) {
    //        $('.errorMsg').show().html('<strong>!</strong> Previous time will not be allowed');
    //        $('#divAvailableRides').hide();
    //    } else {
    //        $('#hdnServiceNameID').val("3");
    //        $('#hdnServiceTypeID').val("4");
    //        if (isEmptyDiv('#pickupPlace') && isEmptyDiv('#dropPlace') && isEmptyText('#pickupdatepicker') && isEmptyText('#pickuptimepicker')) {
    //            $('.errorMsg').hide().html('<strong>!</strong> Correct the errors');;
    //            $('#divAvailableRides').show();
    //        } else {
    //            $('.errorMsg').show().html('<strong>!</strong> Correct the errors');
    //            $('#divAvailableRides').hide();
    //        }
    //    }
    //    loadAvailableRides();
    //} else {
    //}


}

function sendSMS_V1() {
    debugger;

    var fd = new FormData();
    fd.append('phone', $('#mobileNumber').val());

    $.ajax({
        url: 'https://www.deepamtaxi.com/admin/web_api/login',
        data: fd,
        processData: false,
        contentType: false,
        type: 'POST',
        success: function (data) {
            debugger;

            var obj;
            if (data.response == undefined) {
                obj = JSON.parse(data);
            } else {
                obj = data;
            }

            $('#bookingName').val('');
            $('#bookingEmailID').val('');
            $('#bookingAddress').val('');

            if (obj.response.customer_verification_status == "1") {

                $('.errorMsgOTP').hide();
                $('#divBooking').show();
                $('#divOTPVerification').hide();

                mobileNumber = $('#mobileNumber').val();

                $('#bookingName').val(obj.response.customer_name);
                $('#bookingEmailID').val(obj.response.customer_email);
                $('#bookingAddress').val(obj.response.customer_address);
                $('#hdncustomer_id').val(obj.response.customer_id);

                $('#bookingMobileNumber').val(mobileNumber);

                $('#bookingFare').val($('#hdnFare').val());
                $('#bookingACType').val($('#hdnACTypeID').val());

                $('.p_T').html('');

                //if ($('#hdnEnableOnlinePayment').val() == "0") {
                //    $('#RdlOnlinePay').hide();
                //    var $radiosPaymentOption = $('input:radio[name=bookingPayOption]');
                //    $radiosPaymentOption.filter('[value=5]').prop('checked', true);
                //    $("#paymentOption").trigger("click");
                //}
                //else {
                //    var $radiosPaymentOption = $('input:radio[name=bookingPayOption]');
                //    $radiosPaymentOption.filter('[value=5]').prop('checked', false);
                //    $('#RdlOnlinePay').show();
                //    $("#paymentOption").trigger("click");
                //}
            } else if (obj.response.customer_verification != "") {
                debugger;
                $('.infoMsgOTP').show();
                $('#hdnCustomerOTP').val(obj.response.customer_verification);
                $('#hdncustomer_id').val(obj.response.customer_id);

                $('#divOTP').show();
                $('#divMobileNumber').hide();
            }
        },
    });
}

function TimeCheck() {
    var today = new Date();
    var Christmas = new Date("12-25-2012");
    var diffMs = (Christmas - today); // milliseconds between now & Christmas
    var diffDays = Math.floor(diffMs / 86400000); // days
    var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours 
}

function loadAirportRates() {
    debugger;

    if ($('#hdnServiceTypeID').val() == 1) {
        $('#pickupPlace').val("Kempegowda International Airport (BLR), Devanahalli, Bengaluru, Karnataka 560300, India");
    } else {
        $('#dropPlace').html('Kempegowda International Airport (BLR), Devanahalli, Bengaluru, Karnataka 560300, India');
        $('#pickupPlace').val($("#pickupPlaceSearch").val());
    }

    var BookingDate = $('#pickupdatepicker').val() + ' ' + $('#pickuptimepicker').val();
    var today = new Date();
    var TripDate = new Date(BookingDate);
    var diffMs = (TripDate - today); // milliseconds between now & BookingDate
    var diffDays = Math.floor(diffMs / 86400000); // days
    var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours 

    if (diffHrs > 2) {
        $("#hdnEnableOnlinePayment").val('1');
    }
    else {
        $("#hdnEnableOnlinePayment").val('0');
    }
    debugger;


    var date = new Date($('#pickupdatepicker').val());
    var d = date.getDate();
    var m = date.getMonth() + 1; //Month from 0 to 11
    var y = date.getFullYear();
    var pickupDate = '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);

    var time = $("#pickuptimepicker").val();
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
    fd.append('trip_type', $('#hdnServiceTypeID').val());
    fd.append('airport_pickup', $('#pickupPlace').val());
    fd.append('airport_dropoff', $('#dropPlace').html());
    fd.append('airport_pickupdate', pickupDate);
    fd.append('airport_pickuptime', pickuptime);
    console.log(fd);

    $.ajax({
        url: 'https://www.deepamtaxi.com/admin/web_api/airport_price_details',
        data: fd,
        processData: false,
        contentType: false,
        type: 'POST',
        success: function (data) {
            debugger;

            var obj;
            if (data.response == undefined) {
                obj = JSON.parse(data);
            } else {
                obj = data;
            }

            $('#hdnpick_latitude').val(obj.pick_latitude);
            $('#hdnpick_longitude').val(obj.pick_longitude);
            $('#hdndrop_latitude').val(obj.drop_latitude);
            $('#hdndrop_longitude').val(obj.drop_longitude);

            debugger;

            $('.ratelist').html('');

            $.each(obj.response, function () {
                debugger;

                //$('#hdnRequestID').val(this.RequestID);
                //$("#hdnEnableOnlinePayment").val(this.EnableOnlinePayment);
                $("#hdnEstimatedDistance").val(this.distance);

                var appendRateText = "<li class='list-group-item'><div class='row'><div class='col-md-2 col-6 d-none d-md-block'><img src='/Images/car-11-24.png' /></div>";
                appendRateText = appendRateText + "<div class='col-md-5 col-12 cabName'>" + getCategorybyIDDisplay(this.category_id) + "</div>";
                appendRateText = appendRateText + "<div class='col-md-2 col-6 cabName'>";

                var tooltipText = '';

                if (this.FxedRateAC_S == "0") {
                    appendRateText = appendRateText + "<button type='button' class='btn btn-success booking marginleft3px' disabled value='NA'>NA</button>";
                } else {
                    tooltipText = '<b>Min KM :</b> ' + this.min_per_day_km_ac + '<br /><b>Min KM Rate :</b> ' + this.min_amount_ac + '<br /><b>Extra KM Rate :</b> ' + this.extra_km_charge_ac;
                    appendRateText = appendRateText + "<label class='col-form-label DemoTooltipOffset btn btn-link' title='" + tooltipText + "'  onclick=ChooseVehicle_V1(" + this.category_id + ",1," + this.final_price_ac + ")><b>₹ " + this.final_price_ac + "</b></label>  </div>";
                    appendRateText = appendRateText + "<div class='col-md-3 col-6 cabName'><button type='button' class='btn btn-outline-primary booking1' onclick=ChooseVehicle_V1(" + this.category_id + ",1," + this.final_price_ac + ") value='" + this.final_price_ac + "'>Book Now</button>";
                }

                appendRateText = appendRateText + "</div></div></li>";

                $('.ratelist').append(appendRateText);

                $('.DemoTooltipOffset').jBox('Tooltip', {
                    offset: {
                        x: 5,
                        y: -5
                    }
                });

                $('.booking_AC').click(function () {
                    $('#hdnACTypeID').val('1');
                    $('#divSearchRides').hide();
                    $('#divAvailableRides').hide();
                    $('#divOTPVerification').show();
                    $('#divMobileNumber').show();
                    $('#divOTP').hide();
                    $('.errorMsg, .errorMsgOTP, .errorMsgBooking, .infoMsgOTP').hide();
                    debugger;
                    $('#hdnFare').val($(this).next().val());
                });

                $('.booking').click(function () {

                    debugger;

                    $('#hdnACType').val($(this).next().next().text());
                    $('#hdnACTypeID').val('0');
                    $('#hdnRateID').val($(this).next().next().next().val());
                    //console.log("hdnACType", $('#hdnACType').val());

                    clear_OTPFields();

                    $('#divSearchRides').hide();
                    $('#divAvailableRides').hide();
                    $('#divOTPVerification').show();
                    $('#divMobileNumber').show();
                    $('#divOTP').hide();
                    $('.errorMsg, .errorMsgOTP, .errorMsgBooking, .infoMsgOTP').hide();

                    $('#hdnFare').val($(this).val());
                    $('#hdnACType').val($(this).next().text());
                    $('#hdnRateID').val($(this).next().next().val());
                    //console.log(" .booking hdnACType", $('#hdnACType').val());
                });
            });
        },
        complete: function () {
            //$('.ajax-loader').css("visibility", "hidden");
        },
        failure: function () {
            //createErrorLogs(result, 'loadPackages', 'index.js');
            //$('.ajax-loader').css("visibility", "hidden");
            console.log(result);
        }
    });
}

function ChooseVehicle_V1(carCategoryID, ACTypeID, Fare) {
    $('#hdnACTypeID').val(ACTypeID);
    $('#divSearchRides').hide();
    $('#divAvailableRides').hide();
    $('#divOTPVerification').show();
    $('#divMobileNumber').show();
    $('#divOTP').hide();
    $('.errorMsg, .errorMsgOTP, .errorMsgBooking, .infoMsgOTP').hide();

    $('#hdnFare').val(Fare);
    $('#hdnACType').val(ACTypeID);
    $('#hdnRateID').val(carCategoryID);
    $('#hdncarCategory').val(getCategorybyID(carCategoryID));

    console.log("hdnACType", $('#hdnACType').val());
    clear_OTPFields();
    debugger;
    $('html, body').animate({ scrollTop: 0 }, "slow");
}

function ShowFareDetails_V1(FromPalce, ToPlace, TravelTime, distance, ExtKmFare, VehicleType, min_amount, Rate, ACType) {
    var TripDate = $('#pickupdatepicker').val(),
        TripTime = $('#pickuptimepicker').val();

    $('.FD_FromPalceToPlace').html(FromPalce + ' > ' + ToPlace);
    $('.FD_VehicleType').html(VehicleType);
    $('.FD_ACType').html(ACType);
    $('.FD_Rate').html(Rate);
    $('.FD_PickupDate').html(TripDate);
    $('.FD_PickupTime').html(TripTime);
    $('.FD_distance').html(distance);
    $('.FD_extra_km_charge').html(ExtKmFare);
    $('.FD_min_amount').html(min_amount);
    //$('.FD_driver_travel_days').html(driver_travel_days);
    //$('.FD_driver_allowance').html(driver_allowance);
    //$('.FD_driver_day_allowance').html(day_allowance);
    //$('.FD_discont_price').html(discont_price);

    $('#FD_FareModal').modal('show')
}

function submitgoogleReview(ORDER_ID, CUSTOMER_EMAIL, estimated_delivery_date) {
    debugger;

    window.renderOptIn = function () {
        window.gapi.load('surveyoptin', function () {
            window.gapi.surveyoptin.render(
                {
                    // REQUIRED FIELDS
                    "merchant_id": 117201211,
                    "order_id": ORDER_ID,
                    "email": CUSTOMER_EMAIL,
                    "delivery_country": "IN",
                    "estimated_delivery_date": estimated_delivery_date,

                    // OPTIONAL FIELDS
                    "products": [{ "gtin": "GTIN1" }, { "gtin": "GTIN2" }]
                });
        });
    }
}

function booknow_V1() {
    debugger;
    var date = new Date($('#pickupdatepicker').val());
    var d = date.getDate();
    var m = date.getMonth() + 1; //Month from 0 to 11
    var y = date.getFullYear();
    var pickupDate = '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);

    var time = $("#pickuptimepicker").val();
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
    fd.append('phone', $('#bookingMobileNumber').val());
    fd.append('name', $('#bookingName').val());
    fd.append('email', $('#bookingEmailID').val());
    fd.append('customer_comments', $('#bookingComments').val());
    fd.append('address', $('#bookingAddress').val());
    fd.append('enquiry', 0);
    fd.append('car_category_id', $('#hdnRateID').val());
    fd.append('pickup', $('#pickupPlace').val());
    fd.append('pick_latitude', $('#hdnpick_latitude').val());
    fd.append('pick_longitude', $('#hdnpick_longitude').val());
    fd.append('total_price', $('#hdnFare').val());
    fd.append('destination', $('#dropPlace').html());
    fd.append('drop_latitude', $('#hdndrop_latitude').val());
    fd.append('drop_longitude', $('#hdndrop_longitude').val());
    fd.append('category', $('#hdncarCategory').val());
    fd.append('city_id', '1');
    fd.append('pickupdate', pickupDate);
    fd.append('pickuptime', pickuptime);
    fd.append('estimated_distance', $('#hdnEstimatedDistance').val());
    fd.append('percentage', '0');
    fd.append('discont_price', '0');
    fd.append('enquiry_id', '');
    fd.append('coupon_code', '');
    fd.append('coupon_code_discount_amount', '');
    fd.append('coupon_code_discount_percent', '');
    fd.append('category_type', $('#hdnACTypeID').val())
    fd.append('trip_type', $('#hdnServiceTypeID').val());
    fd.append('customer_id', $('#hdncustomer_id').val());
    fd.append('type_of_booking', '2');

    $.ajax({
        url: 'https://www.deepamtaxi.com/admin/web_api/do_airport_bookings',
        data: fd,
        processData: false,
        contentType: false,
        type: 'POST',
        success: function (data) {
            debugger;

            var obj;
            if (data.response == undefined) {
                obj = JSON.parse(data);
            } else {
                obj = data;
            }

            if (obj.status == true) {

                var payMode = $("#hdnPaymentType").val();
                console.log("payMode", payMode);
                console.log("obj.response", obj.response);

                if (payMode == "5") {
                    $('#hdnBookingID').val(obj.response.order_id);

                    $.post('/Home/SetVariable',
                        { key: "BookingID", value: obj.response.order_id }, function (data) {

                            $('.infoMsgSuccess').html("Booked successfully with the BookingID " + $('#hdnBookingID').val() + ". <br \> Kindly provide your valuable feedback either in our facebook or twitter page.");
                            clear_BookingFields();
                            clear_OTPFields();
                            clear_Fields();

                            $('#divSearchRides').hide();
                            $('#divAvailableRides').hide();
                            $('#divOTPVerification').hide();
                            $('#divBooking').hide();
                            $('#divOTP').hide();
                            $('#divBookingSuccess').show();

                            window.location.href = '/Thank-You-Utaxi.aspx';
                        });
                }
                else {
                    $('.p_PaymentProcessing').html('<b>Please wait. We are processing your payment .</b>');
                    $('.p_PaymentProcessing').css('color', 'green');
                    window.location.href = "https://webapis.utaxi.in/PayTM_GT.aspx?BookID=" + obj.response.order_id;
                }
            } else {
                bootbox.alert("There is an issue during the booking. Please try again");
            }
        }
    });
}

function showTabs(tabName) {
    if (tabName == 'Airport') {
        $('#hdnPackageType').val('');
        clear_Fields();

        $('#pickupPlaceSearch').hide();
        $('#pickupPlace').show();
        $('#dropPlaceSearch').hide();
        $('#dropPlace').show();
        $('#divAiportPickupField').show();
        $('#divAiportDropField').hide();

        $('#divSearchRides').show();
        $('#divAvailableRides').hide();
        $('#divOTPVerification').hide();
        $('#divBooking').hide();

        $('#divPickup').hide();
        $('#divDrop').show();
        $('#airportPickupOptions').show();
        $('#outstationOptions').hide();
        $('#divPackageType').hide();
        $('#divDropTime').hide();
        $('#divPickupTime').show();
        $('#btnSearchNext').show();

        $('#hdnServiceNameID').val("7");
        $('#hdnServiceTypeID').val("1");
        $('#hdnStatusID').val("2");

        $('#idAirportTab').removeClass('active').addClass('active');
        $('#idLocalDropTab').removeClass('active');
        $('#idPackageTab').removeClass('active');

    } else if (tabName == 'Citytaxi') {
        clear_Fields();
        $('#hdnPackageType').val('');

        $('#pickupPlaceSearch').hide();
        $('#pickupPlace').show();
        $('#dropPlaceSearch').hide();
        $('#dropPlace').show();
        $('#divAiportPickupField').hide();
        $('#divAiportDropField').hide();

        $('#divSearchRides').show();
        $('#divAvailableRides').hide();
        $('#divOTPVerification').hide();
        $('#divBooking').hide();

        $('#divPickup').show();
        $('#divDrop').show();
        $('#airportPickupOptions').hide();
        $('#outstationOptions').hide();
        $('#divPackageType').hide();
        $('#divDropTime').hide();
        $('#divPickupTime').show();
        $('#btnSearchNext').show();

        $('#hdnServiceNameID').val("1");
        $('#hdnServiceTypeID').val("1");
        $('#hdnStatusID').val("2");

        $('#idAirportTab').removeClass('active');
        $('#idLocalDropTab').removeClass('active').addClass('active');
        $('#idPackageTab').removeClass('active');
    } else if (tabName == 'Package') {
        //loadPackages();
        loadPackages_V1();
        clear_Fields();
        $('#pickupPlaceSearch').hide();
        $('#pickupPlace').show();
        $('#dropPlaceSearch').hide();
        $('#dropPlace').show();
        $('#divAiportPickupField').hide();
        $('#divAiportDropField').hide();

        $('#divSearchRides').show();
        $('#divAvailableRides').hide();
        $('#divOTPVerification').hide();
        $('#divBooking').hide();

        $('#divPickup').show();
        $('#divDrop').hide();
        $('#airportPickupOptions').hide();
        $('#outstationOptions').hide();
        $('#divPackageType').show();
        $('#divDropTime').hide();
        $('#divPickupTime').show();
        $('#btnSearchNext').show();

        $('#hdnServiceNameID').val("2");
        $('#hdnServiceTypeID').val("2");
        $('#hdnStatusID').val("1");

        $('#idAirportTab').removeClass('active');
        $('#idLocalDropTab').removeClass('active');
        $('#idPackageTab').removeClass('active').addClass('active');
    } else if (tabName == 'Outstation') {

        $('#hdnPackageType').val('');
        clear_Fields();
        $('#pickupPlaceSearch').hide();
        $('#pickupPlace').show();
        $('#dropPlaceSearch').hide();
        $('#dropPlace').show();
        $('#divAiportPickupField').hide();
        $('#divAiportDropField').hide();

        $('#divSearchRides').show();
        $('#divAvailableRides').hide();
        $('#divOTPVerification').hide();
        $('#divBooking').hide();

        $('#airportPickupOptions').hide();
        $('#divPackageType').hide();

        $('#outstationOptions').show();
        $('#divPickup').show();
        $('#divPickupTime').show();
        $('#divDrop').show();
        $('#divDropTime').hide();
        $('#btnSearchNext').show();

        $('#hdnServiceNameID').val("3");
        $('#hdnServiceTypeID').val("3");
        $('#hdnStatusID').val("2");
    } else if (tabName == 'OutstationPage') {
        debugger;
        window.location.href = "../bestprice/cheapestoutstationcabservice";
    } else if (tabName == 'OutstationPackages') {
        window.location.href = "../Home/Packages";
    } else {

    }
}

function isEmptyText(element) {

    var isValid = false;

    if ($(element).val() != '') {
        isValid = true;
        $(element).removeClass('errors');
    } else {
        $(element).addClass('errors');
    }

    return isValid;
}

function isEmptyDiv(element) {
    debugger;

    var isValid = false;

    if ($(element).html().trim() != 'Enter Search Place') {
        isValid = true;
        $(element).removeClass('errors');
    } else {
        $(element).addClass('errors');
    }

    return isValid;
}

function isEmptyDropDown(element) {

    var isValid = false;

    if ($(element).val() != '-1') {
        isValid = true;
        $(element).removeClass('errors');
    } else {
        $(element).addClass('errors');
    }

    return isValid;
}

function clear_Fields() {
    $('#dropPlace').html('Enter Search Place');
    $('#pickupdatepicker, #dropdatepicker').val('');
    $('#pickuptimepicker, #droptimepicker').val('');
    $('#pickupPlace').html('Enter Search Place');
    // $('.errorMsg,. infoMsgOTP').hide();
    $('*').removeClass('errors');
}

function clear_BookingFields() {
    $('#bookingMobileNumber').val('');
    $('#bookingName').val('');
    $('#bookingEmailID').val('');
    $('#bookingACType').val('-1');
    $('#bookingAddress').val('');
    $('#bookingComments').val('');
    //  $('.errorMsgBooking,.errorMsg,. infoMsgOTP').hide();

    $('#hdnServiceNameID').val('');
    $('#hdnServiceTypeID').val('');
    $('#hdnStatusID').val('');
    $('#hdnOutstationTypeID').val('1');
    $('#hdndropPlaceID').val('');
    $('#hdnpickupPlaceID').val('');
    $('#hdnFare').val('');
    $('#hdnACType').val('');
    $('#hdnRateID').val('');
}

function clear_OTPFields() {
    $('#mobileNumber').val('');
    $('#OTP').val('');
    $('.errorMsgOTP').hide();
}

function loadPackages_V1() {

    debugger;

    $.ajax({
        url: 'https://www.deepamtaxi.com/admin/web_api/getPackageList',
        data: {},
        processData: false,
        contentType: false,
        type: 'POST',
        success: function (data) {
            debugger;

            $('#ddlPackageType').html('');
            $('#ddlPackageType').append($("<option     />").val(-1).text('-- Select --'));

            $.each(data.response, function () {
                $('#ddlPackageType').append($("<option     />").val(this.id).text(this.package_name));
            });

            $('#ddlPackageType option[value=-1]').attr('selected', 'selected');

            var PackageTypevalue = $('#hdnPackageType').val();

            if (PackageTypevalue != '') {
                $('#ddlPackageType').find('option:selected').remove();
                $('#ddlPackageType option[value=' + PackageTypevalue + ']').attr('selected', 'selected');
            }
        },
        failure: function () {
            //createErrorLogs(result, 'loadPackages', 'index.js');
            console.log(result);
        }
    });
}

function compareDates(d1, d2) {
    return d1 > d2;
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

function loadPickupDropOptions() {
    debugger;
    if ($("#rdAirportPickup").is(":checked")) {

        clear_Fields();

        $('#pickupPlaceSearch').show();
        $('#dropPlaceSearch').hide();
        $('#divAiportPickupField').show();
        $('#divAiportDropField').hide();

        $('#divPickup').hide();
        $('#divDrop').show();
        $('#divAvailableRides').hide();

        $('#hdnServiceTypeID').val("1");
        $('#hdnStatusID').val("2");
    }
    else if ($('#rdAirportDrop').is(":checked")) {

        clear_Fields();

        $('#pickupPlaceSearch').hide();
        //$('#pickupPlace').show();
        $('#dropPlaceSearch').show();
        //$('#dropPlace').show();
        $('#divAiportPickupField').hide();
        $('#divAiportDropField').show();

        $('#divPickup').show();
        $('#divDrop').hide();
        $('#divAvailableRides').hide();

        $('#hdnServiceTypeID').val("2");
        $('#hdnStatusID').val("2");

    }
    else if ($('#rdAirportRT').is(":checked")) {

        clear_Fields();

        $('#pickupPlaceSearch').hide();
        //$('#pickupPlace').show();
        $('#dropPlaceSearch').show();
        //$('#dropPlace').show();
        $('#divAiportPickupField').hide();
        $('#divAiportDropField').show();

        $('#divPickup').show();
        $('#divDrop').hide();
        $('#divAvailableRides').hide();

        $('#hdnServiceTypeID').val("3");
        $('#hdnStatusID').val("2");

    }
}