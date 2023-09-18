
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

    //;
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
	
	var timeoutID;

   $('#dropPlaceSearch').bind('input', function() { 
      clearTimeout(timeoutID);
      var $this = $(this);
      timeoutID = setTimeout(function() {
         var pickup = $this.val();
         if (pickup.length > 2) {
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

   

    $('#rdAirportPickup').click(function () {
        clear_Fields();

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

    $('#rdOutstationTrip').click(function () {
        clear_Fields();

        $('#pickupPlaceSearch').hide();
        $('#pickupPlace').show();
        $('#dropPlaceSearch').hide();
        $('#dropPlace').show();
        $('#divAiportPickupField').hide();
        $('#divAiportDropField').hide();

        $('#divPickup').show();
        $('#divDrop').show();
        $('#divDropTime').hide();
        $('#divPickupTime').show();
        $('#btnSearchNext').show();
        $('#divAvailableRides').hide();

        $('#hdnServiceTypeID').val("3");
        $('#hdnStatusID').val("2");
        $('#hdnOutstationTypeID').val("1");
    });

    $('#rdOutstationPackage').click(function () {
        clear_Fields();

        $('#pickupPlaceSearch').hide();
        $('#pickupPlace').show();
        $('#dropPlaceSearch').hide();
        $('#dropPlace').show();
        $('#divAiportPickupField').hide();
        $('#divAiportDropField').hide();

        $('#divPickup').show();
        $('#divDrop').show();
        $('#divDropTime').show();
        $('#divPickupTime').show();
        $('#btnSearchNext').show();
        $('#divAvailableRides').hide();

        $('#hdnServiceTypeID').val("3");
        $('#hdnStatusID').val("2");
        $('#hdnOutstationTypeID').val("2");

    });

    $('.clsbookNow').click(function () {
        $('#divSearchRides').show();
        $('#divBookingSuccess').hide();
    });

    $('#pickupPlace').click(function () {
        $('#pickupPlaceSearch').show().val('').focus();
        $('#pickupPlace').hide();
        $('#divAvailableRides').hide();
    });

    $('#pickupdatepicker').click(function () {
        $('#divAvailableRides').hide();
    });

    $('#dropdatepicker').click(function () {
        $('#divAvailableRides').hide();
    });

    $('#pickuptimepicker').click(function () {
        ;
        $('#divAvailableRides').hide();
    });

    $('#droptimepicker').click(function () {
        ;
        $('#divAvailableRides').hide();
    });

    $('#ddlPackageType').change(function () {
        ;
        $('#divAvailableRides').hide();
    });

    $('#dropPlace').click(function () {
        $('#dropPlaceSearch').show().val('').focus();
        $('#dropPlace').hide();
        $('#divAvailableRides').hide();
    });

    $('#btnSubmit').click(function () {
        ;
        var tabName = $('.nav-item .active').text();
        if (tabName == 'Airport Transfer' || tabName == 'Local Drop' || tabName == 'Local Package') {
            searchRates_V1();
        } else {
            searchRates();
        }
    });

    $('#btnSubmitOTP').click(function () {
        ;
        var tabName = $('.nav-item .active').text();
        if (tabName == 'Airport Transfer' || tabName == 'Local Drop' || tabName == 'Local Package') {
            submitOTP_V1();
        } else {
            submitOTP();
        }
    });

    $('#btnBooknow').click(function () {

        if (isEmptyText('#bookingMobileNumber') && isEmptyText('#bookingName') && isEmptyText('#bookingEmailID') && isEmptyDropDown('#bookingACType') && isEmptyText('#bookingAddress')) {

                //$('#paymentOption').removeClass("errors");
                $('.errorMsgBooking').hide();

                $('#btnBooknow').attr("disabled", true);
                var tabName = $('.nav-item .active').text();
                if (tabName == 'Airport Transfer') {
                    booknow_V1();
                } else if (tabName == 'Local Drop') {
                    booknow_localbookings();
                } else if (tabName == 'Local Package') {
                    booknow_packagebookings();
                } else {
                    booknow();
                }
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

    $('#paymentOption').click(function () {
        $('#hdnPaymentType').val($('input[name=bookingPayOption]:checked').val());
        console.log("hdnPaymentType:", $('#hdnPaymentType').val());
        $('.E_paymentOption').html('');
        $('.p_Fare').html('');
        $('.div_fareCalculation').show();
        PaymentType();
    });
});

function submitOTP() {

    if ($('#divMobileNumber').is(":visible")) {
        if (isEmptyText('#mobileNumber')) {
            sendSMS();
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
                $('#bookingACType').val($('#hdnACTypeID').val());
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
    ;
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
//alert(pickupDateValue);
//	alert(d2);
    if (tabName == 'Airport Transfer') {

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
    }
    else if (tabName == 'Local Drop') {
        if (isEmptyDiv('#dropPlace') && isEmptyDiv('#pickupPlace') && isEmptyText('#pickupdatepicker') && isEmptyText('#pickuptimepicker')) {
            if (compareDates(pickupDateValue, d2) == false) {
                $('.errorMsg').show().html('<strong>!</strong> Previous time will not be allowed');
                $('#divAvailableRides').hide();
            } else {
                $('.errorMsg').hide().html('<strong>!</strong> Correct the errors');
                $('#divAvailableRides').show();

                $('#hdnServiceNameID').val("1");
                $('#hdnServiceTypeID').val("1");
            }

        } else {
            $('.errorMsg').show().html('<strong>!</strong> Correct the errors');
            $('#divAvailableRides').hide();
        }
        loadLocalDropRates();
    }
    else if (tabName == 'Local Package') {
        if (compareDates(pickupDateValue, d2) == false) {
            $('.errorMsg').show().html('<strong>!</strong> Previous time will not be allowed');
            $('#divAvailableRides').hide();
        } else {
            $('#hdnServiceNameID').val("2");
            if (isEmptyDiv('#pickupPlace') && isEmptyDropDown('#ddlPackageType') && isEmptyText('#pickupdatepicker') && isEmptyText('#pickuptimepicker')) {
                $('.errorMsg').hide().html('<strong>!</strong> Correct the errors');;

                var ServiceTypeID = $('#ddlPackageType option:selected').val();
                $('#hdnServiceTypeID').val(ServiceTypeID);

                $('#dropPlace').html("Package");
                $('#divAvailableRides').show();
            } else {
                $('.errorMsg').show().html('<strong>!</strong> Correct the errors');
                $('#divAvailableRides').hide();
            }
        }

        var PackageTypevalue = $('#hdnPackageType').val();
        var PackageRateID = $('#hdnPackageRateID').val();
        var PackageACTypeID = $('#hdnPackageACTypeID').val();
        var PackageFare = $('#hdnPackageFare').val();

        if (PackageTypevalue != '') {
            ChooseVehicle(PackageRateID, PackageACTypeID, PackageFare);
        } else {
            loadPackageRates();
        }
    }
    else if (tabName == 'Outstation') {
        $('#hdnServiceNameID').val("3");
        $('#hdnServiceTypeID').val("4");

        if ($('#hdnOutstationTypeID').val() == "1") {
            if (isEmptyDiv('#pickupPlace') && isEmptyDiv('#dropPlace') && isEmptyText('#pickupdatepicker') && isEmptyText('#pickuptimepicker')) {

                if (compareDates(pickupDateValue, d2) == false) {
                    $('.errorMsg').show().html('<strong>!</strong> Previous time will not be allowed');
                    $('#divAvailableRides').hide();
                } else {
                    $('.errorMsg').hide().html('<strong>!</strong> Correct the errors');;
                    $('#divAvailableRides').show();
                }
            } else {
                $('.errorMsg').show().html('<strong>!</strong> Correct the errors');;
                $('#divAvailableRides').hide();
            }
        } else {
            if (isEmptyDiv('#pickupPlace') && isEmptyDiv('#dropPlace') && isEmptyText('#pickupdatepicker') && isEmptyText('#pickuptimepicker') && isEmptyText('#dropdatepicker') && isEmptyText('#droptimepicker')) {

                if (compareDates(pickupDateValue, d2) == false || compareDates(dropDatevalue, d2) == false) {
                    $('.errorMsg').show().html('<strong>!</strong> Previous time will not be allowed');
                    $('#divAvailableRides').hide();
                } else {
                    $('.errorMsg').hide().html('<strong>!</strong> Correct the errors');;
                    $('#divAvailableRides').show();
                }
            } else {
                $('.errorMsg').show().html('<strong>!</strong> Correct the errors');;
                $('#divAvailableRides').hide();
            }
        }
        loadAvailableRides();
    } else if (tabName == 'OutstationPackages') {
        if (compareDates(pickupDateValue, d2) == false) {
            $('.errorMsg').show().html('<strong>!</strong> Previous time will not be allowed');
            $('#divAvailableRides').hide();
        } else {
            $('#hdnServiceNameID').val("3");
            $('#hdnServiceTypeID').val("4");
            if (isEmptyDiv('#pickupPlace') && isEmptyDiv('#dropPlace') && isEmptyText('#pickupdatepicker') && isEmptyText('#pickuptimepicker')) {
                $('.errorMsg').hide().html('<strong>!</strong> Correct the errors');;
                $('#divAvailableRides').show();
            } else {
                $('.errorMsg').show().html('<strong>!</strong> Correct the errors');
                $('#divAvailableRides').hide();
            }
        }
        loadAvailableRides();
    } else {
    }


}

function searchRates() {
    ;
    var tabName = $('.nav-item .active').text();

    var pickupDate = $('#pickupdatepicker').val() + " " + $('#pickuptimepicker').val();
    var dropDate = $('#dropdatepicker').val() + " " + $('#droptimepicker').val();

    var pickupDateValue = new Date(pickupDate);
    var dropDatevalue = new Date(dropDate);
    var d2 = new Date();

    if (tabName == 'Airport Transfer') {
        $('#hdnServiceNameID').val("7");
        if ($("#rdAirportPickup").is(":checked")) {
            if (isEmptyDiv('#dropPlace') && isEmptyText('#pickupdatepicker') && isEmptyText('#pickuptimepicker')) {

                if (compareDates(pickupDateValue, d2) == false) {
                    $('.errorMsg').show().html('<strong>!</strong> Previous time will not be allowed');
                    $('#divAvailableRides').hide();
                } else {

                    $('.errorMsg').hide().html('<strong>!</strong> Correct the errors');
                    $('#divAvailableRides').show();

                    $('#hdnpickupPlaceID').val("564");
                    $('#pickupPlace').html("Airport Pickup");
                    ;
                    GAreaID = AreaRegistration($('#dropPlace').html());
                    $('#hdndropPlaceID').val(GAreaID);
                    console.log("Drop Place ID", GAreaID);
                    $('#hdnServiceTypeID').val("1");
                    $('#hdnStatusID').val("2");

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

                    $('#hdndropPlaceID').val("565");
                    $('#dropPlace').html("Airport Drop");
                    $('#hdnpickupPlaceID').val('0');

                    $('#hdnServiceTypeID').val("2");
                    $('#hdnStatusID').val("2");
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
                    $('#hdnpickupPlaceID').val('0');
                    $('#hdndropPlaceID').val("563");
                    $('#dropPlace').html("Airport Up And Down");
                    $('#hdnServiceTypeID').val("3");
                    $('#hdnStatusID').val("2");
                } else {
                    $('.errorMsg').show().html('<strong>!</strong> Correct the errors');
                    $('#divAvailableRides').hide();
                }
            }
        }
    }
    else if (tabName == 'Local Drop') {
        if (isEmptyDiv('#dropPlace') && isEmptyDiv('#pickupPlace') && isEmptyText('#pickupdatepicker') && isEmptyText('#pickuptimepicker')) {
            if (compareDates(pickupDateValue, d2) == false) {
                $('.errorMsg').show().html('<strong>!</strong> Previous time will not be allowed');
                $('#divAvailableRides').hide();
            } else {
                $('.errorMsg').hide().html('<strong>!</strong> Correct the errors');
                $('#divAvailableRides').show();

                GAreaID = AreaRegistration($('#pickupPlace').html());
                $('#hdnpickupPlaceID').val(GAreaID);

                GAreaID = AreaRegistration($('#dropPlace').html());
                $('#hdndropPlaceID').val(GAreaID);

                $('#hdnServiceNameID').val("1");
                $('#hdnServiceTypeID').val("1");
            }

        } else {
            $('.errorMsg').show().html('<strong>!</strong> Correct the errors');
            $('#divAvailableRides').hide();
        }
    } else if (tabName == 'Local Package') {
        if (compareDates(pickupDateValue, d2) == false) {
            $('.errorMsg').show().html('<strong>!</strong> Previous time will not be allowed');
            $('#divAvailableRides').hide();
        } else {
            $('#hdnServiceNameID').val("2");
            if (isEmptyDiv('#pickupPlace') && isEmptyDropDown('#ddlPackageType') && isEmptyText('#pickupdatepicker') && isEmptyText('#pickuptimepicker')) {
                $('.errorMsg').hide().html('<strong>!</strong> Correct the errors');;
                var ServiceTypeID = $('#ddlPackageType option:selected').val();
                $('#hdnServiceTypeID').val(ServiceTypeID);
                $('#dropPlace').html("Package");
                $('#divAvailableRides').show();
            } else {
                $('.errorMsg').show().html('<strong>!</strong> Correct the errors');
                $('#divAvailableRides').hide();
            }
        }
    }
    else if (tabName == 'Outstation') {
        $('#hdnServiceNameID').val("3");
        $('#hdnServiceTypeID').val("4");

        if ($('#hdnOutstationTypeID').val() == "1") {
            if (isEmptyDiv('#pickupPlace') && isEmptyDiv('#dropPlace') && isEmptyText('#pickupdatepicker') && isEmptyText('#pickuptimepicker')) {

                if (compareDates(pickupDateValue, d2) == false) {
                    $('.errorMsg').show().html('<strong>!</strong> Previous time will not be allowed');
                    $('#divAvailableRides').hide();
                } else {
                    $('.errorMsg').hide().html('<strong>!</strong> Correct the errors');;
                    $('#divAvailableRides').show();
                }
            } else {
                $('.errorMsg').show().html('<strong>!</strong> Correct the errors');;
                $('#divAvailableRides').hide();
            }
        } else {
            if (isEmptyDiv('#pickupPlace') && isEmptyDiv('#dropPlace') && isEmptyText('#pickupdatepicker') && isEmptyText('#pickuptimepicker') && isEmptyText('#dropdatepicker') && isEmptyText('#droptimepicker')) {

                if (compareDates(pickupDateValue, d2) == false || compareDates(dropDatevalue, d2) == false) {
                    $('.errorMsg').show().html('<strong>!</strong> Previous time will not be allowed');
                    $('#divAvailableRides').hide();
                } else {
                    $('.errorMsg').hide().html('<strong>!</strong> Correct the errors');;
                    $('#divAvailableRides').show();
                }
            } else {
                $('.errorMsg').show().html('<strong>!</strong> Correct the errors');;
                $('#divAvailableRides').hide();
            }
        }
    } else if (tabName == 'OutstationPackages') {
        if (compareDates(pickupDateValue, d2) == false) {
            $('.errorMsg').show().html('<strong>!</strong> Previous time will not be allowed');
            $('#divAvailableRides').hide();
        } else {
            $('#hdnServiceNameID').val("3");
            $('#hdnServiceTypeID').val("4");
            if (isEmptyDiv('#pickupPlace') && isEmptyDiv('#dropPlace') && isEmptyText('#pickupdatepicker') && isEmptyText('#pickuptimepicker')) {
                $('.errorMsg').hide().html('<strong>!</strong> Correct the errors');;
                $('#divAvailableRides').show();
            } else {
                $('.errorMsg').show().html('<strong>!</strong> Correct the errors');
                $('#divAvailableRides').hide();
            }
        }
    } else {
    }

    var PackageTypevalue = $('#hdnPackageType').val();
    var PackageRateID = $('#hdnPackageRateID').val();
    var PackageACTypeID = $('#hdnPackageACTypeID').val();
    var PackageFare = $('#hdnPackageFare').val();

    if (PackageTypevalue != '') {
        ChooseVehicle(PackageRateID, PackageACTypeID, PackageFare);
    } else {
        loadAvailableRides();
    }
}

function sendSMS() {
    ;

    var getURL = $('#hdnWebApiURL').val() + "D_MobileNoVerification";

    var data = JSON.stringify(
        {
            BranchID: '81',
            ContactNo: $('#mobileNumber').val(),
        });

    $.ajax(
        {
            type: "POST",
            url: getURL,
            data: data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                ;

                $('#bookingName').val('');
                $('#bookingEmailID').val('');
                $('#bookingAddress').val('');

                if (data.Status == true && data.StatusID == "1") {
                    $('.errorMsgOTP').hide();
                    $('#divBooking').show();
                    $('#divOTPVerification').hide();

                    mobileNumber = $('#mobileNumber').val();

                    $('#bookingName').val(data.Name);
                    $('#bookingEmailID').val(data.EmailID);
                    $('#bookingAddress').val(data.Address);

                    $('#bookingMobileNumber').val(mobileNumber);
                    $('#bookingFare').val($('#hdnFare').val());
                    $('#bookingACType').val($('#hdnACTypeID').val());

                    $('.p_T').html('');
                    if ($('#hdnEnableOnlinePayment').val() == "0") {
                        $('#RdlOnlinePay').hide();
                        var $radiosPaymentOption = $('input:radio[name=bookingPayOption]');
                        $radiosPaymentOption.filter('[value=5]').prop('checked', true);
                        $("#paymentOption").trigger("click");
                    }
                    else {
                        var $radiosPaymentOption = $('input:radio[name=bookingPayOption]');
                        $radiosPaymentOption.filter('[value=5]').prop('checked', false);
                        $('#RdlOnlinePay').show();
                        $("#paymentOption").trigger("click");
                    }
                } else if (data.OTP != "") {
                    $('.infoMsgOTP').show();
                    $('#hdnCustomerOTP').val(data.OTP);

                    $('#divOTP').show();
                    $('#divMobileNumber').hide();
                }
            },
            failure: function () {
                console.log(result);
            }
        });
}

function sendSMS_V1() {
    ;

    var fd = new FormData();
    fd.append('phone', $('#mobileNumber').val());

    $.ajax({
        url: 'https://www.deepamtaxi.com/admin/web_api/login',
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
                ;
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

function loadAvailableRides() {
    ;
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

    var getTripFareURL = $('#hdnWebApiURL').val() + "D_GetTripFare";

    var data = JSON.stringify(
        {
            FromLocationID: $('#hdnpickupPlaceID').val(),
            ToLocationID: $('#hdndropPlaceID').val(),
            ServiceTypeID: $('#hdnServiceTypeID').val(),
            ServiceNameID: $('#hdnServiceNameID').val(),
            ReqDate: $('#pickupdatepicker').val(),
            ReqTime: $('#pickuptimepicker').val(),
            TripEndDate: $('#dropdatepicker').val(),
            TripEndTime: $('#droptimepicker').val(),
            FromLocation: $('#pickupPlace').html(),
            ToLocation: $('#dropPlace').html(),
        });

    $.ajax(
        {
            type: "POST",
            url: getTripFareURL,
            data: data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {
                //$('.ajax-loader').css("visibility", "visible");
            },
            success: function (data) {
                ;

                $('.ratelist').html('');

                $.each(data.ApproximateTripFare, function () {
                    ;
                    $('#hdnpickupPlaceID').val(this.FromLocationID);
                    $('#hdndropPlaceID').val(this.ToLocationID);
                    $('#hdnRequestID').val(this.RequestID);
                    $("#hdnEnableOnlinePayment").val(this.EnableOnlinePayment);

                    var appendRateText = "<li class='list-group-item'><div class='row'><div class='col-md-2'><img src='../Images/car-11-24.png' /></div>";
                    appendRateText = appendRateText + "<div class='col-md-5 cabName' style='text-align: left;'>" + this.VehicleType + "</div>";
                    appendRateText = appendRateText + "<div class='col-md-5 cabName'>";

                    var tooltipText = '';

                    console.log("this.FxedRateNAC_S ", this.FxedRateNAC_S);

                    if (this.FxedRateNAC_S == "0") {
                        appendRateText = appendRateText + "<button type='button' class='btn btn-primary booking' disabled data-toggle='popover' title='Fare' data-content='And here's fare details' value='NA'>NA</button>";
                    } else {
                        if (this.ServiceNameID == 3) {
                            tooltipText = '<b>Rate Per KM :</b> ' + this.RatePerKM_NonAC + '<br /><b>Min KM :</b> ' + this.MinKMNAC + '<br /><b>Min KM Rate :</b> ' + this.MinKMRateNAC + '<br /><b>Day Bata :</b> ' + this.DayBata + '<br /><b>Night Bata :</b> ' + this.NightBata;
                        }
                        else if (this.ServiceNameID == 2) {
                            tooltipText = '<b>Min Rate :</b> ' + this.MinKMRateNAC + '<br /><b>Extra KM Rate :</b> ' + this.ExtraKMRateNAC + '<br /><b>Extra Hour Rate :</b> ' + this.pkgExtHrRateNAC;
                        }
                        else {
                            tooltipText = '<b>Min KM :</b> ' + this.MinKMNAC + '<br /><b>Min KM Rate :</b> ' + this.MinKMRateNAC + '<br /><b>Extra KM Rate :</b> ' + this.ExtraKMRateNAC;
                        }
                        appendRateText = appendRateText + "<button type='button' class='btn btn-primary booking1 DemoTooltipOffset' title='" + tooltipText + "' value='" + this.FxedRateNAC_S + "'onclick=ChooseVehicle(" + this.RateID + ",2," + this.FxedRateNAC_S + ") >₹" + this.FxedRateNAC_S + "</button>";
                    }

                    if (this.FxedRateAC_S == "0") {
                        appendRateText = appendRateText + "<button type='button' class='btn btn-success booking marginleft3px' disabled value='NA'>NA</button>";
                    } else {

                        if (this.ServiceNameID == 3) {
                            tooltipText = '<b>Rate Per KM :</b> ' + this.RatePerKM_AC + '<br /><b>Min KM :</b> ' + this.MinKMAC + '<br /><b>Min KM Rate :</b> ' + this.MinKMRateAC + '<br /><b>Day Bata :</b> ' + this.DayBata + '<br /><b>Night Bata :</b> ' + this.NightBata;
                        }
                        else if (this.ServiceNameID == 2) {
                            tooltipText = '<b>Min Rate :</b> ' + this.MinKMRateAC + '<br /><b>Extra KM Rate :</b> ' + this.ExtraKMRateAC + '<br /><b>Extra Hour Rate :</b> ' + this.pkgExtHrRateAC;
                        }
                        else {
                            tooltipText = '<b>Min KM :</b> ' + this.MinKMAC + '<br /><b>Min KM Rate :</b> ' + this.MinKMRateAC + '<br /><b>Extra KM Rate :</b> ' + this.ExtraKMRateAC;
                        }
                        appendRateText = appendRateText + "<button type='button' class='btn btn-success booking1 marginleft3px DemoTooltipOffset' title='" + tooltipText + "' value='" + this.FxedRateAC_S + "' onclick=ChooseVehicle(" + this.RateID + ",1," + this.FxedRateAC_S + ")>₹" + this.FxedRateAC_S + "</button><span style='display:none'>1</span><input type='hidden' value='" + this.RateID + "' />";
                    }

                    appendRateText = appendRateText + "</div></div></li>";

                    $('.ratelist').append(appendRateText);

                    if ($('#hdnServiceTypeID').val() != '1' && $('#hdnServiceTypeID').val() != '2' && $('#hdnServiceTypeID').val() != '3') {
                        $('.DemoTooltipOffset').jBox('Tooltip', {
                            offset: {
                                x: 5,
                                y: -5
                            }
                        });
                    }

                    $('.booking_AC').click(function () {
                        $('#hdnACTypeID').val('1');
                        $('#divSearchRides').hide();
                        $('#divAvailableRides').hide();
                        $('#divOTPVerification').show();
                        $('#divMobileNumber').show();
                        $('#divOTP').hide();
                        $('.errorMsg, .errorMsgOTP, .errorMsgBooking, .infoMsgOTP').hide();
                        ;
                        $('#hdnFare').val($(this).next().val());
                    });

                    $('.booking').click(function () {

                        $('#hdnACType').val($(this).next().next().text());
                        $('#hdnRateID').val($(this).next().next().next().val());
                        console.log("hdnACType", $('#hdnACType').val());
                        clear_OTPFields();
                        $('#hdnACTypeID').val('1');
                        $('#divSearchRides').hide();
                        $('#divAvailableRides').hide();
                        $('#divOTPVerification').show();
                        $('#divMobileNumber').show();
                        $('#divOTP').hide();
                        $('.errorMsg, .errorMsgOTP, .errorMsgBooking, .infoMsgOTP').hide();
                        ;
                        $('#hdnFare').val($(this).val());
                        $('#hdnACType').val($(this).next().text());
                        $('#hdnRateID').val($(this).next().next().val());
                        console.log(" .booking hdnACType", $('#hdnACType').val());
                        clear_OTPFields();
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

function loadAirportRates() {
    ;

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
    ;


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
            ;

            var obj;
            if (data.pick_latitude == undefined) {
                obj = JSON.parse(data);
            } else {
                obj = data;
            }

            $('#hdnpick_latitude').val(obj.pick_latitude);
            $('#hdnpick_longitude').val(obj.pick_longitude);
            $('#hdndrop_latitude').val(obj.drop_latitude);
            $('#hdndrop_longitude').val(obj.drop_longitude);

            ;

            $('.ratelist').html('');

            $.each(obj.response, function () {
                ;

                $("#hdnEstimatedDistance").val(this.distance);

                var appendRateText = "<li class='list-group-item'><div class='row'><div class='col-md-2 col-6 d-none d-md-block'><img src='../Images/car-11-24.png' /></div>";
                appendRateText = appendRateText + "<div class='col-md-5 col-12 cabName'>" + getCategorybyIDDisplay(this.category_id) + "</div>";
                appendRateText = appendRateText + "<div class='col-md-2 col-6 cabName'>";

                var tooltipText = '';

                if (this.FxedRateAC_S == "0") {
                    appendRateText = appendRateText + "<button type='button' class='btn btn-success booking marginleft3px' disabled value='NA'>NA</button>";
                } else {
                    tooltipText = '<b>Min KM :</b> ' + this.min_per_day_km_ac + '<br /><b>Min KM Rate :</b> ' + this.min_amount_ac + '<br /><b>Extra KM Rate :</b> ' + this.extra_km_charge_ac;
                    appendRateText = appendRateText + "<label class='col-form-label DemoTooltipOffset btn btn-link' title='" + tooltipText + "'  onclick=ChooseVehicle_V1(" + this.category_id + ",1," + this.final_price_ac + ",'','')><b>₹ " + this.final_price_ac + "</b></label>  </div>";
                    appendRateText = appendRateText + "<div class='col-md-3 col-6 cabName'><button type='button' class='btn btn-outline-primary booking1' onclick=ChooseVehicle_V1(" + this.category_id + ",1," + this.final_price_ac + ",'','') value='" + this.final_price_ac + "'>Book Now</button>";
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
                    ;
                    $('#hdnFare').val($(this).next().val());
                });

                $('.booking').click(function () {

                    ;

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

function loadLocalDropRates() {
    ;

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
    ;


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

    fd.append('pickup', $('#pickupPlace').html());
    fd.append('destination', $('#dropPlace').html());
    fd.append('pickupdate', pickupDate);
    fd.append('pickuptime', pickuptime);
    console.log(fd);

    $.ajax({
        url: 'https://www.deepamtaxi.com/admin/web_api/local_price_details',
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

            $('#hdnpick_latitude').val(obj.pick_latitude);
            $('#hdnpick_longitude').val(obj.pick_longitude);
            $('#hdndrop_latitude').val(obj.drop_latitude);
            $('#hdndrop_longitude').val(obj.drop_longitude);

            var pickupPlace = obj.pickup;
            var dropoffPlace = obj.dropoff;

            ;

            $('.ratelist').html('');

            $.each(obj.response, function () {
                ;

                $("#hdnEstimatedDistance").val(this.distance);

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

                $('.ratelist').append(appendRateText);

                $('.booking_AC').click(function () {
                    $('#hdnACTypeID').val('1');
                    $('#divSearchRides').hide();
                    $('#divAvailableRides').hide();
                    $('#divOTPVerification').show();
                    $('#divMobileNumber').show();
                    $('#divOTP').hide();
                    $('.errorMsg, .errorMsgOTP, .errorMsgBooking, .infoMsgOTP').hide();
                    ;
                    $('#hdnFare').val($(this).next().val());
                });

                $('.booking').click(function () {

                    ;

                    $('#hdnACType').val($(this).next().next().text());
                    $('#hdnACTypeID').val('0');
                    $('#hdnRateID').val($(this).next().next().next().val());

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

function loadPackageRates() {
    ;

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
    ;


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

    fd.append('pickup', $('#pickupPlace').html());
    fd.append('package_id', $('#hdnServiceTypeID').val());
    fd.append('pickupdate', pickupDate);
    fd.append('pickuptime', pickuptime);
    console.log(fd);

    $.ajax({
        url: 'https://www.deepamtaxi.com/admin/web_api/package_price_details',
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

            $('#hdnpick_latitude').val(obj.pick_latitude);
            $('#hdnpick_longitude').val(obj.pick_longitude);
            $('#hdndrop_latitude').val(obj.drop_latitude);
            $('#hdndrop_longitude').val(obj.drop_longitude);
            $('#hdnpackage_name').val(obj.package_name);

            var pickupPlace = obj.pickup;
            var dropoffPlace = obj.dropoff;

            ;

            $('.ratelist').html('');

            $.each(obj.response, function () {
                ;

                $("#hdnEstimatedDistance").val(this.distance);

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

                $('.ratelist').append(appendRateText);
            });
        },
        complete: function () {

        },
        failure: function () {
            console.log(result);
        }
    });
}

function ChooseVehicle(RateID, ACTypeID, Fare) {
    $('#hdnACTypeID').val(ACTypeID);
    $('#divSearchRides').hide();
    $('#divAvailableRides').hide();
    $('#divOTPVerification').show();
    $('#divMobileNumber').show();
    $('#divOTP').hide();
    $('.errorMsg, .errorMsgOTP, .errorMsgBooking, .infoMsgOTP').hide();

    $('#hdnFare').val(Fare);
    $('#hdnACType').val(ACTypeID);
    $('#hdnRateID').val(RateID);
    console.log("hdnACType", $('#hdnACType').val());
    clear_OTPFields();
    ;
    $('html, body').animate({ scrollTop: 0 }, "slow");
}

function ChooseVehicle_V1(carCategoryID, ACTypeID, Fare, coupon_code, coupon_code_discount_percent) {
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

    $('#hdnCoupon_code').val(coupon_code);
    $('#hdnCoupon_code_discount_amount').val(coupon_code_discount_percent);

    console.log("hdnACType", $('#hdnACType').val());
    clear_OTPFields();
    ;
    $('html, body').animate({ scrollTop: 0 }, "slow");
}

function ChooseVehiclePackage_V1(carCategoryID, ACTypeID, Fare, min_amount, extra_km_charge, extra_hrs_charge) {
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

    $('#hdnmin_amount').val(min_amount);
    $('#hdnextra_km_charge').val(extra_km_charge);
    $('#hdnextra_hrs_charge').val(extra_hrs_charge);

    console.log("hdnACType", $('#hdnACType').val());
    clear_OTPFields();
    ;
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
    $('.FD_min_amount').html(min_amount);

    if (ExtKmFare != "" && ExtKmFare != "undefined") {
        $('.FD_extra_km_charge').html("₹" + ExtKmFare + " /KM");
    } else {
        $('.FD_extra_km_charge').html();
    }
    $('#FD_FareModal').modal('show')
}

function ShowPackageFareDetails_V1(FromPalce, ToPlace, ExtKmFare, VehicleType, min_amount, Rate, ACType) {
    var TripDate = $('#pickupdatepicker').val(),
        TripTime = $('#pickuptimepicker').val();

    $('.FD_FromPalceToPlace').html(FromPalce + ' > ' + ToPlace);
    $('.FD_VehicleType').html(VehicleType);
    $('.FD_ACType').html(ACType);
    $('.FD_Rate').html(Rate);
    $('.FD_PickupDate').html(TripDate);
    $('.FD_PickupTime').html(TripTime);
    $('.FD_min_amount').html(min_amount);

    if (ExtKmFare != "" && ExtKmFare != "undefined") {
        $('.FD_extra_km_charge').html("₹" + ExtKmFare + " /KM");
    } else {
        $('.FD_extra_km_charge').html();
    }

    $('#FD_FareModal').modal('show')
}

function submitgoogleReview(ORDER_ID, CUSTOMER_EMAIL, estimated_delivery_date) {
    ;

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

function booknow() {
    ;

    var tripEndDate = "";

    var getTripFareURL = $('#hdnWebApiURL').val() + "D_Booknow";

    if ($('#hdnOutstationTypeID').val() == "1") {
        tripEndDate = $('#pickupdatepicker').val() + ' ' + $('#pickuptimepicker').val();
    } else {
        tripEndDate = $('#dropdatepicker').val() + ' ' + $('#droptimepicker').val();
    }

    var data = JSON.stringify(
        {
            BranchID: "81",
            Name: $('#bookingName').val(),
            MobileNumber: $('#bookingMobileNumber').val(),
            EmailID: $('#bookingEmailID').val(),
            Address: $('#bookingAddress').val(),
            Comments: $('#bookingComments').val(),
            ReqDate: $('#pickupdatepicker').val() + ' ' + $('#pickuptimepicker').val(),
            TripEndDate: tripEndDate,
            ACTypeID: $('#hdnACType').val(),
            TotalTripFare: $('#bookingFare').val(),
            RateID: $('#hdnRateID').val(),
            ServiceNameID: $('#hdnServiceNameID').val(),
            FromLocationID: $('#hdnpickupPlaceID').val(),
            ToLocationID: $('#hdndropPlaceID').val(),
            ServiceTypeID: $('#hdnServiceTypeID').val(),
            RequestID: $('#hdnRequestID').val(),
            PaymentTypeID: $('#hdnPaymentType').val(),
            PaidAmount: $('#hdnPaidAmount').val(),
            Discount: $('#hdnDiscount').val(),
            Balance: $('#hdnBalance').val()
        });


    //submitgoogleReview("90989", $('#pickupdatepicker').val(), $('#bookingEmailID').val());

    $.ajax(
        {
            type: "POST",
            url: getTripFareURL,
            data: data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                ;
                if (data.Result == "1") {

                    var payMode = $("#hdnPaymentType").val();
                    console.log("payMode", payMode);
                    if (payMode == "5") {
                        $('#hdnBookingID').val(data.BookID);

                        $.post('/Home/SetVariable',
                            { key: "BookingID", value: data.BookID }, function (data) {


                                //submitgoogleReview(data.BookID, $('#pickupdatepicker').val(), $('#bookingEmailID').val());

                                //bootbox.alert("Booked successfully with the BookingID " + data.BookID + ". <br \> Kindly provide your valuable feedback either in our facebook or twitter page.");
                                $('.infoMsgSuccess').html("Booked successfully with the BookingID " + data.BookID + ". <br \> Kindly provide your valuable feedback either in our facebook or twitter page.");
                                //$('.infoMsgSuccess').html("Booked successfully with the BookingID. <br \> Kindly provide your valuable feedback either in one of our social network page.");
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
                        window.location.href = "https://webapis.utaxi.in/PayTM_GT.aspx?BookID=" + data.BookID;
                    }
                } else {

                    bootbox.alert("There is an issue during the booking. Please try again");
                }
            },
            failure: function () {
                //createErrorLogs(result, 'loadPackages', 'index.js');
                console.log(result);
            }
        });
}

function booknow_V1() {
    ;
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
    fd.append('coupon_code', $('#hdnCoupon_code').val());
    fd.append('coupon_code_discount_amount', $('#hdnCoupon_code_discount_amount').val());
    fd.append('coupon_code_discount_percent', $('#hdnCoupon_code_discount_amount').val());
    fd.append('category_type', $('#hdnACTypeID').val());
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
            ;

            var obj;
            if (data.status == undefined) {
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

function booknow_localbookings() {
    ;
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
    fd.append('pickup', $('#pickupPlace').html());
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
    fd.append('trip_type', '1')
    fd.append('customer_id', $('#hdncustomer_id').val());
    fd.append('type_of_booking', '2');

    $.ajax({
        url: 'https://www.deepamtaxi.com/admin/web_api/do_local_bookings',
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

function booknow_packagebookings() {
    ;
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
    fd.append('pickup', $('#pickupPlace').html());
    fd.append('pick_latitude', $('#hdnpick_latitude').val());
    fd.append('pick_longitude', $('#hdnpick_longitude').val());
    fd.append('total_price', $('#hdnFare').val());

    fd.append('package_name', $('#hdnpackage_name').val());
    fd.append('min_amount', $('#hdnmin_amount').val());
    fd.append('extra_km_charge', $('#hdnextra_km_charge').val());
    fd.append('extra_hrs_charge', $('#hdnextra_hrs_charge').val());

    fd.append('category', $('#hdncarCategory').val());
    fd.append('city_id', '1');
    fd.append('pickupdate', pickupDate);
    fd.append('pickuptime', pickuptime);
    fd.append('estimated_distance', '1');
    fd.append('percentage', '0');
    fd.append('discont_price', '0');
    fd.append('enquiry_id', '');
    fd.append('coupon_code', '');
    fd.append('coupon_code_discount_amount', '');
    fd.append('coupon_code_discount_percent', '');
    fd.append('category_type', $('#hdnACTypeID').val());
    fd.append('customer_id', $('#hdncustomer_id').val());
    fd.append('type_of_booking', '2');

    $.ajax({
        url: 'https://www.deepamtaxi.com/admin/web_api/do_package_bookings',
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
    if (tabName == 'Airport Transfer') {
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
        ;
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
    ;

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

function loadPackages() {

    ;

    var loadPackagesURL = $('#hdnWebApiURL').val() + "D_PackageType";

    $.ajax(
        {
            type: "POST",
            url: loadPackagesURL,
            data: {},
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                $('#ddlPackageType').html('');
                $('#ddlPackageType').append($("<option     />").val(-1).text('-- Select --'));

                $.each(data.PackageType, function () {
                    $('#ddlPackageType').append($("<option     />").val(this.ServiceTypeID).text(this.ServiceType));
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

function loadPackages_V1() {


    $.ajax({
        url: 'https://www.deepamtaxi.com/admin/web_api/getPackageList',
        data: {},
        processData: false,
        contentType: false,
        type: 'POST',
        success: function (data) {

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

function PaymentType() {
    var TotalTripFare = "0", DiscountOffer = "0", Discount = "0", payableamount = "0", balance = "0";
    var PaymentTypeID = $('#hdnPaymentType').val();
    TotalTripFare = $('#bookingFare').val();
    if (PaymentTypeID == "1") {

        DiscountOffer = 5; //5%
        Discount = parseFloat(TotalTripFare * 5) / 100;

        payableamount = TotalTripFare - Discount;
        balance = 0;// TotalTripFare - payableamount - Discount;
        $('.p_TripFare').html('Your current payment value is Rs. ' + payableamount + '/-');
        $('.p_TripFare').css('color', 'red');
        $('.p_Discount').html('The balance you will have to pay Rs. ' + balance + '/-');
        $('.p_Balance').html('The amount you save Rs. ' + Discount + '/-');
        $('.p_Balance').css('color', 'green');

        $('#hdnPaidAmount').val(payableamount);
        $('#hdnDiscount').val(Discount);
        $('#hdnBalance').val(balance);
    }
    else if (PaymentTypeID == "2") {

        DiscountOffer = 2.5; //2.5%
        payableamount = parseFloat(TotalTripFare * 50) / 100;
        Discount = parseFloat(TotalTripFare * 2.5) / 100;

        balance = payableamount - Discount;
        $('.p_TripFare').html('Your current payment value is Rs. ' + payableamount + '/-');
        $('.p_TripFare').css('color', 'red');
        $('.p_Discount').html('The balance you will have to pay Rs. ' + balance + '/-');
        $('.p_Balance').html('The amount you save Rs. ' + Discount + '/-');
        $('.p_Balance').css('color', 'green');
        $('#hdnPaidAmount').val(payableamount);
        $('#hdnDiscount').val(Discount);
        $('#hdnBalance').val(balance);
    }
    else if (PaymentTypeID == "3") {

        DiscountOffer = 100; //100 Rs flat discount for out station booking
        Discount = 100;

        payableamount = TotalTripFare - Discount;
        balance = TotalTripFare - payableamount - Discount;
        $('.p_TripFare').html('Your current payment value is Rs. ' + payableamount + '/-');
        $('.p_TripFare').css('color', 'red');
        $('.p_Discount').html('The balance you will have to pay Rs. ' + balance + '/-');
        $('.p_Balance').html('The amount you save Rs. ' + Discount + '/-');
        $('.p_Balance').css('color', 'green');

        $('#hdnPaidAmount').val(payableamount);
        $('#hdnDiscount').val(Discount);
        $('#hdnBalance').val(balance);
    }
    else if (PaymentTypeID == "4") {


        DiscountOffer = 50; //50 Rs flat discount for out station booking
        Discount = 50;
        payableamount = parseFloat(TotalTripFare * 50) / 100;

        // payableamount = TotalTripFare - Discount;
        balance = payableamount - Discount;
        $('.p_TripFare').html('Your current payment value is Rs. ' + payableamount + '/-');
        $('.p_TripFare').css('color', 'red');
        $('.p_Discount').html('The balance you will have to pay Rs. ' + balance + '/-');
        $('.p_Balance').html('The amount you save Rs. ' + Discount + '/-');
        $('.p_Balance').css('color', 'green');
        $('#hdnPaidAmount').val(payableamount);
        $('#hdnDiscount').val(Discount);
        $('#hdnBalance').val(balance);
    }
    else if (PaymentTypeID == "5") {

        payableamount = 0; Discount = 0; balance = TotalTripFare;

        $('.p_TripFare').html('Your current payment value is Rs. ' + payableamount + '/-');
        $('.p_TripFare').css('color', 'red');
        $('.p_Discount').html('The balance you will have to pay Rs. ' + balance + '/-');
        $('.p_Balance').html('The amount you save Rs. ' + Discount + '/-');
        $('.p_Balance').css('color', 'green');
        $('#hdnPaidAmount').val(payableamount);
        $('#hdnDiscount').val(Discount);
        $('#hdnBalance').val(balance);
    }
    else if (PaymentTypeID == "6") {

        console.log("PaymentType:", "Pay Now");

        DiscountOffer = 0; //0%
        Discount = 0;

        payableamount = TotalTripFare;
        balance = 0;
        $('.p_TripFare').html('Your current payment value is Rs. ' + payableamount + '/-');
        $('.p_TripFare').css('color', 'red');
        $('.p_Discount').html('The balance you will have to pay Rs. ' + balance + '/-');

        $('.p_Balance').html('The amount you save Rs. ' + Discount + '/-');
        $('.p_Balance').css('color', 'green');

        $('#hdnPaidAmount').val(payableamount);
        $('#hdnDiscount').val(Discount);
        $('#hdnBalance').val(balance);
    }
    else if (PaymentTypeID == "7") {

        DiscountOffer = 0; //0%
        Discount = 0;

        payableamount = 0;
        balance = TotalTripFare;

        $('.p_TripFare').html('Your current payment value is Rs. ' + payableamount + '/-');
        $('.p_TripFare').css('color', 'red');
        $('.p_Discount').html('The balance you will have to pay Rs. ' + balance + '/-');

        $('.p_Balance').html('The amount you save Rs. ' + Discount + '/-');
        $('.p_Balance').css('color', 'green');

        $('#hdnPaidAmount').val(payableamount);
        $('#hdnDiscount').val(Discount);
        $('#hdnBalance').val(balance);
    }

}

function AreaRegistration(AreaName) {

    return GAreaID;
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