
var GAreaID = "0";

$(document).ready(function () {

    loadPackages();
    var fare = '';
    var mobileNumber = '';
    $("#hdnPaymentType").val('5');
    $('#pickupPlaceSearch').show();
    //$('#pickupPlace').show();
    $('#dropPlaceSearch').show();
    //$('#dropPlace').show();

    $('#pickupdatepicker, #dropdatepicker').datepicker({ minDate: 0 });
    $('#pickuptimepicker, #droptimepicker').mdtimepicker();
    $('.errorMsg, .errorMsgOTP, .errorMsgBooking, .infoMsgOTP').hide();

    $('#divSearchRides').hide();
    $('#divAvailableRides').show();
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
    loadAvailableRides();

    $('#rdAirportPickup').click(function () {

        var url = window.location.href;

        if (url.indexOf("BTM") != -1) {
            window.location.href = "../BTMLayouttoAirporttransfer/AirportPickup";
        }
        else if (url.indexOf("Banashankari") != -1) {
            window.location.href = "../BanashankaritoAirporttransfer/AirportPickup";
        }
        else if (url.indexOf("Banaswadi") != -1 || url.indexOf("banaswadi") != -1) {
            window.location.href = "../BanaswaditoAirporttransfer/AirportPickup";
        }
        else if (url.indexOf("Frazertown") != -1 || url.indexOf("frazertown") != -1) {
            window.location.href = "../FrazertowntoAirporttransfer/AirportPickup";
        }
        else if (url.indexOf("Jalahalli") != -1) {
            window.location.href = "../JalahallitoAirporttransfer/AirportPickup";
        }
        else if (url.indexOf("JPNagar") != -1) {
            window.location.href = "../JPNagartoAirporttransfer/AirportPickup";
        }
        else if (url.indexOf("Krishnarajapuram") != -1) {
            window.location.href = "../KrishnarajapuramtoAirporttransfer/AirportPickup";
        }
        else if (url.indexOf("Malleswaram") != -1) {
            window.location.href = "../MalleswaramtoAirporttransfer/AirportPickup";
        }
        else if (url.indexOf("MGRoad") != -1) {
            window.location.href = "../MGRoadtoAirporttransfer/AirportPickup";
        }
        else if (url.indexOf("Rajajinagar") != -1) {
            window.location.href = "../RajajinagartoAirporttransfer/AirportPickup";
        }
        else if (url.indexOf("Peenya") != -1) {
            window.location.href = "../PeenyatoAirporttransfer/AirportPickup";
        }
        else if (url.indexOf("VijayaNagar") != -1) {
            window.location.href = "../VijayaNagartoAirporttransfer/AirportPickup";
        }
        else if (url.indexOf("Jayanagar") != -1) {
            window.location.href = "../JayanagartoAirporttransfer/AirportPickup";
        }
        else if (url.indexOf("Yelahanka") != -1) {
            window.location.href = "../YelahankatoAirporttransfer/AirportPickup";
        }
        else if (url.indexOf("Marathahalli") != -1) {
            window.location.href = "../MarathahallitoAirporttransfer/AirportPickup";
        }
        else if (url.indexOf("Whitefield") != -1) {
            window.location.href = "../WhitefieldtoAirporttransfer/AirportPickup";
        }


        clear_Fields();

        $('#pickupPlaceSearch').show();
        // $('#pickupPlace').show();
        $('#dropPlaceSearch').show();
        //$('#dropPlace').show();
        $('#divAiportPickupField').show();
        $('#divAiportDropField').hide();

        $('#divPickup').hide();
        $('#divDrop').show();
        $('#divAvailableRides').hide();

        $('#hdnServiceTypeID').val("1");
        $('#hdnStatusID').val("2");
    });

    $('#rdAirportDrop').click(function () {

        var url = window.location.href;

        if (url.indexOf("BTM") != -1) {
            window.location.href = "../BTMLayouttoAirporttransfer/AirportDrop";
        }
        else if (url.indexOf("Banashankari") != -1) {
            window.location.href = "../BanashankaritoAirporttransfer/AirportDrop";
        }
        else if (url.indexOf("Banaswadi") != -1 || url.indexOf("banaswadi") != -1) {
            window.location.href = "../BanaswaditoAirporttransfer/AirportDrop";
        }
        else if (url.indexOf("Frazertown") != -1 || url.indexOf("frazertown") != -1) {
            window.location.href = "../FrazertowntoAirporttransfer/AirportDrop";
        }
        else if (url.indexOf("Jalahalli") != -1) {
            window.location.href = "../JalahallitoAirporttransfer/AirportDrop";
        }
        else if (url.indexOf("JPNagar") != -1) {
            window.location.href = "../JPNagartoAirporttransfer/AirportDrop";
        }
        else if (url.indexOf("Krishnarajapuram") != -1) {
            window.location.href = "../KrishnarajapuramtoAirporttransfer/AirportDrop";
        }
        else if (url.indexOf("Malleswaram") != -1) {
            window.location.href = "../MalleswaramtoAirporttransfer/AirportDrop";
        }
        else if (url.indexOf("MGRoad") != -1) {
            window.location.href = "../MGRoadtoAirporttransfer/AirportDrop";
        }
        else if (url.indexOf("Rajajinagar") != -1) {
            window.location.href = "../RajajinagartoAirporttransfer/AirportDrop";
        }
        else if (url.indexOf("Peenya") != -1) {
            window.location.href = "../PeenyatoAirporttransfer/AirportDrop";
        }
        else if (url.indexOf("VijayaNagar") != -1) {
            window.location.href = "../VijayaNagartoAirporttransfer/AirportDrop";
        }
        else if (url.indexOf("Jayanagar") != -1) {
            window.location.href = "../JayanagartoAirporttransfer/AirportDrop";
        }
        else if (url.indexOf("Yelahanka") != -1) {
            window.location.href = "../YelahankatoAirporttransfer/AirportDrop";
        }
        else if (url.indexOf("Marathahalli") != -1) {
            window.location.href = "../MarathahallitoAirporttransfer/AirportDrop";
        }
        else if (url.indexOf("Whitefield") != -1) {
            window.location.href = "../WhitefieldtoAirporttransfer/AirportDrop";
        }

        clear_Fields();

        $('#pickupPlaceSearch').show();
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
    });

    $('#rdAirportRT').click(function () {

        var url = window.location.href;

        if (url.indexOf("BTM") != -1) {
            window.location.href = "../BTMLayouttoAirporttransfer/AirportRoundTrip";
        }
        else if (url.indexOf("Banashankari") != -1) {
            window.location.href = "../BanashankaritoAirporttransfer/AirportRoundTrip";
        }
        else if (url.indexOf("Banaswadi") != -1 || url.indexOf("banaswadi") != -1) {
            window.location.href = "../BanaswaditoAirporttransfer/AirportRoundTrip";
        }
        else if (url.indexOf("Frazertown") != -1 || url.indexOf("frazertown") != -1) {
            window.location.href = "../FrazertowntoAirporttransfer/AirportRoundTrip";
        }
        else if (url.indexOf("Jalahalli") != -1) {
            window.location.href = "../JalahallitoAirporttransfer/AirportRoundTrip";
        }
        else if (url.indexOf("JPNagar") != -1) {
            window.location.href = "../JPNagartoAirporttransfer/AirportRoundTrip";
        }
        else if (url.indexOf("Krishnarajapuram") != -1) {
            window.location.href = "../KrishnarajapuramtoAirporttransfer/AirportRoundTrip";
        }
        else if (url.indexOf("Malleswaram") != -1) {
            window.location.href = "../MalleswaramtoAirporttransfer/AirportRoundTrip";
        }
        else if (url.indexOf("MGRoad") != -1) {
            window.location.href = "../MGRoadtoAirporttransfer/AirportRoundTrip";
        }
        else if (url.indexOf("Rajajinagar") != -1) {
            window.location.href = "../RajajinagartoAirporttransfer/AirportRoundTrip";
        }
        else if (url.indexOf("Peenya") != -1) {
            window.location.href = "../PeenyatoAirporttransfer/AirportRoundTrip";
        }
        else if (url.indexOf("VijayaNagar") != -1) {
            window.location.href = "../VijayaNagartoAirporttransfer/AirportRoundTrip";
        }
        else if (url.indexOf("Jayanagar") != -1) {
            window.location.href = "../JayanagartoAirporttransfer/AirportRoundTrip";
        }
        else if (url.indexOf("Yelahanka") != -1) {
            window.location.href = "../YelahankatoAirporttransfer/AirportRoundTrip";
        }
        else if (url.indexOf("Marathahalli") != -1) {
            window.location.href = "../MarathahallitoAirporttransfer/AirportRoundTrip";
        }
        else if (url.indexOf("Whitefield") != -1) {
            window.location.href = "../WhitefieldtoAirporttransfer/AirportRoundTrip";
        }

        $('#pickupPlaceSearch').show();
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
    });

    $('#rdOutstationTrip').click(function () {
        clear_Fields();

        $('#pickupPlaceSearch').show();
        //$('#pickupPlace').show();
        $('#dropPlaceSearch').show();
        //$('#dropPlace').show();
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

        $('#pickupPlaceSearch').show();
        //$('#pickupPlace').show();
        $('#dropPlaceSearch').show();
        //$('#dropPlace').show();
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

    $('#ddlPackageType').change(function () {
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
        var tabName = 'Airport Transfer';//$('.nav-item .active').text();

        var pickupDate = $('#pickupdatepicker').val() + " " + $('#pickuptimepicker').val();
        var dropDate = $('#dropdatepicker').val() + " " + $('#droptimepicker').val();

        var pickupDateValue = new Date(pickupDate);
        var dropDatevalue = new Date(dropDate);
        var d2 = new Date();

        if (tabName == 'Airport Transfer') {
            $('#hdnServiceNameID').val("7");
            if ($("#rdAirportPickup").is(":checked")) {
                if (isEmptyDiv('#dropPlaceSearch') && isEmptyText('#pickupdatepicker') && isEmptyText('#pickuptimepicker')) {

                    if (compareDates(pickupDateValue, d2) == false) {
                        $('.errorMsg').show().html('<strong>!</strong> Previous time will not be allowed');
                        $('#divAvailableRides').hide();
                    } else {

                        $('.errorMsg').hide().html('<strong>!</strong> Correct the errors');
                        $('#divAvailableRides').show();

                        $('#hdnpickupPlaceID').val("564");
                        //$('#pickupPlace').html("Airport Pickup");
                        debugger;
                        GAreaID = AreaRegistration($('#dropPlaceSearch').html());
                        $('#hdndropPlaceID').val(GAreaID);
                        console.log("Drop Place ID", GAreaID);
                        $('#hdnServiceTypeID').val("1");
                        $('#hdnStatusID').val("2");


                        var PackageTypevalue = $('#hdnPackageType').val();
                        var PackageRateID = $('#hdnPackageRateID').val();
                        var PackageACTypeID = $('#hdnPackageACTypeID').val();
                        var PackageFare = $('#hdnPackageFare').val();

                        if (PackageTypevalue != '') {
                            ChooseVehicle(PackageRateID, PackageACTypeID, PackageFare);
                        } else {
                            //loadAvailableRides();

                            $('#divSearchRides').hide();
                            $('#divAvailableRides').hide();
                            $('#divOTPVerification').show();
                            $('#divMobileNumber').show();
                        }
                    }
                } else {
                    $('.errorMsg').show().html('<strong>!</strong> Correct the errors');;
                    $('#divAvailableRides').hide();
                }
            }
            else if ($("#rdAirportDrop").is(":checked")) {
                if (isEmptyDiv('#pickupPlaceSearch') && isEmptyText('#pickupdatepicker') && isEmptyText('#pickuptimepicker')) {
                    if (compareDates(pickupDateValue, d2) == false) {
                        $('.errorMsg').show().html('<strong>!</strong> Previous time will not be allowed');
                        $('#divAvailableRides').hide();
                    } else {
                        $('.errorMsg').hide();
                        $('#divAvailableRides').show();

                        $('#hdndropPlaceID').val("565");
                        $('#dropPlaceSearch').html("Airport Drop");
                        $('#hdnpickupPlaceID').val('0');

                        $('#hdnServiceTypeID').val("2");
                        $('#hdnStatusID').val("2");

                        var PackageTypevalue = $('#hdnPackageType').val();
                        var PackageRateID = $('#hdnPackageRateID').val();
                        var PackageACTypeID = $('#hdnPackageACTypeID').val();
                        var PackageFare = $('#hdnPackageFare').val();

                        if (PackageTypevalue != '') {
                            ChooseVehicle(PackageRateID, PackageACTypeID, PackageFare);
                        } else {
                            //loadAvailableRides();

                            $('#divSearchRides').hide();
                            $('#divAvailableRides').hide();
                            $('#divOTPVerification').show();
                            $('#divMobileNumber').show();
                        }
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
                    if (isEmptyDiv('#pickupPlaceSearch') && isEmptyText('#pickupdatepicker') && isEmptyText('#pickuptimepicker')) {
                        $('.errorMsg').hide();
                        $('#divAvailableRides').show();
                        $('#hdnpickupPlaceID').val('0');
                        $('#hdndropPlaceID').val("563");
                        $('#dropPlaceSearch').html("Airport Up And Down");
                        $('#hdnServiceTypeID').val("3");
                        $('#hdnStatusID').val("2");

                        var PackageTypevalue = $('#hdnPackageType').val();
                        var PackageRateID = $('#hdnPackageRateID').val();
                        var PackageACTypeID = $('#hdnPackageACTypeID').val();
                        var PackageFare = $('#hdnPackageFare').val();

                        if (PackageTypevalue != '') {
                            ChooseVehicle(PackageRateID, PackageACTypeID, PackageFare);
                        } else {
                            //loadAvailableRides();

                            $('#divSearchRides').hide();
                            $('#divAvailableRides').hide();
                            $('#divOTPVerification').show();
                            $('#divMobileNumber').show();
                        }
                    } else {
                        $('.errorMsg').show().html('<strong>!</strong> Correct the errors');
                        $('#divAvailableRides').hide();
                    }
                }
            }
        }
        else if (tabName == 'City taxi') {
            if (isEmptyDiv('#dropPlaceSearch') && isEmptyDiv('#pickupPlaceSearch') && isEmptyText('#pickupdatepicker') && isEmptyText('#pickuptimepicker')) {
                if (compareDates(pickupDateValue, d2) == false) {
                    $('.errorMsg').show().html('<strong>!</strong> Previous time will not be allowed');
                    $('#divAvailableRides').hide();
                } else {
                    $('.errorMsg').hide().html('<strong>!</strong> Correct the errors');
                    $('#divAvailableRides').show();

                    GAreaID = AreaRegistration($('#pickupPlaceSearch').html());
                    $('#hdnpickupPlaceID').val(GAreaID);

                    GAreaID = AreaRegistration($('#dropPlaceSearch').html());
                    $('#hdndropPlaceID').val(GAreaID);

                    $('#hdnServiceNameID').val("1");
                    $('#hdnServiceTypeID').val("1");
                }

            } else {
                $('.errorMsg').show().html('<strong>!</strong> Correct the errors');
                $('#divAvailableRides').hide();
            }
        } else if (tabName == 'Package') {
            if (compareDates(pickupDateValue, d2) == false) {
                $('.errorMsg').show().html('<strong>!</strong> Previous time will not be allowed');
                $('#divAvailableRides').hide();
            } else {
                $('#hdnServiceNameID').val("2");
                if (isEmptyDiv('#pickupPlaceSearch') && isEmptyDropDown('#ddlPackageType') && isEmptyText('#pickupdatepicker') && isEmptyText('#pickuptimepicker')) {
                    $('.errorMsg').hide().html('<strong>!</strong> Correct the errors');;
                    var ServiceTypeID = $('#ddlPackageType option:selected').val();
                    $('#hdnServiceTypeID').val(ServiceTypeID);
                    $('#dropPlaceSearch').html("Package");
                    $('#divAvailableRides').show();
                } else {
                    $('.errorMsg').show().html('<strong>!</strong> Correct the errors');
                    $('#divAvailableRides').hide();
                }
            }
        } else if (tabName == 'Outstation') {
            $('#hdnServiceNameID').val("3");
            $('#hdnServiceTypeID').val("4");

            if ($('#hdnOutstationTypeID').val() == "1") {
                if (isEmptyDiv('#pickupPlaceSearch') && isEmptyDiv('#dropPlaceSearch') && isEmptyText('#pickupdatepicker') && isEmptyText('#pickuptimepicker')) {

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
                if (isEmptyDiv('#pickupPlaceSearch') && isEmptyDiv('#dropPlaceSearch') && isEmptyText('#pickupdatepicker') && isEmptyText('#pickuptimepicker') && isEmptyText('#dropdatepicker') && isEmptyText('#droptimepicker')) {

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
                if (isEmptyDiv('#pickupPlaceSearch') && isEmptyDiv('#dropPlaceSearch') && isEmptyText('#pickupdatepicker') && isEmptyText('#pickuptimepicker')) {
                    $('.errorMsg').hide().html('<strong>!</strong> Correct the errors');;
                    $('#divAvailableRides').show();
                } else {
                    $('.errorMsg').show().html('<strong>!</strong> Correct the errors');
                    $('#divAvailableRides').hide();
                }
            }
        } else {
        }
    });

    $('#btnSubmitOTP').click(function () {

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
    });

    $('#btnBooknow').click(function () {

        if (isEmptyText('#bookingMobileNumber') && isEmptyText('#bookingName') && isEmptyText('#bookingEmailID') && isEmptyDropDown('#bookingACType') && isEmptyText('#bookingAddress')) {

            debugger;
            var bookpayoption = $('input[name=bookingPayOption]:checked').val()
            if (bookpayoption == "" || bookpayoption == undefined) {
                bootbox.alert("Payment option is required to proceed");
                $('#paymentOption').addClass("errors");
                $('.errorMsgBooking').show();
            } else {
                $('#paymentOption').removeClass("errors");
                $('.errorMsgBooking').hide();
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

function sendSMS() {
    debugger;

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
                debugger;

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

function TimeCheck() {
    var today = new Date();
    var Christmas = new Date("12-25-2012");
    var diffMs = (Christmas - today); // milliseconds between now & Christmas
    var diffDays = Math.floor(diffMs / 86400000); // days
    var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours 
}

function loadAvailableRides() {
    debugger;
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
    var getTripFareURL = $('#hdnWebApiURL').val() + "D_GetTripFare";
    var fromLocationval = "";
    var toLocationval = "";

    if ($('#hdnServiceTypeID').val() == "1") {
        fromLocationval = "Airport Pickup";
        toLocationval = $('#dropPlaceSearch').val();
    } else if ($('#hdnServiceTypeID').val() == "2") {
        fromLocationval = $('#pickupPlaceSearch').val();
        toLocationval = "Airport Drop";
    } else if ($('#hdnServiceTypeID').val() == "3") {
        fromLocationval = $('#pickupPlaceSearch').val();
        toLocationval = "Airport Up And Down";
    }

    var d = new Date();

    var month = d.getMonth() + 1;
    var day = d.getDate();

    var ReqDateGenerated = d.getFullYear() + '/' +
        (month < 10 ? '0' : '') + month + '/' +
        (day < 10 ? '0' : '') + day;

    var data = JSON.stringify(
        {
            FromLocationID: $('#hdnpickupPlaceID').val(),
            ToLocationID: $('#hdndropPlaceID').val(),
            ServiceTypeID: $('#hdnServiceTypeID').val(),
            ServiceNameID: $('#hdnServiceNameID').val(),
            ReqDate: ReqDateGenerated,
            ReqTime: "06:00 PM",
            TripEndDate: $('#dropdatepicker').val(),
            TripEndTime: $('#droptimepicker').val(),
            FromLocation: "",
            ToLocation: "",
        });
    console.log(data);
    $.ajax(
        {
            type: "POST",
            url: getTripFareURL,
            data: data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                debugger;

                $('.ratelistAirportPickup').html('');
                $('#divAvailableRides').show();

                $.each(data.ApproximateTripFare, function () {
                    debugger;

                    if ($('#hdnServiceTypeID').val() == "1") {
                        $('#hdndropPlaceID').val(this.ToLocationID);
                    } else {
                        $('#hdnpickupPlaceID').val(this.FromLocationID);
                    }

                    $('#hdnRequestID').val(this.RequestID);

                    var appendRateText = "<li class='list-group-item'><div class='row'><div class='col-md-2'><img src='/Images/car-11-24.png' /></div>";
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

                    $('.ratelistAirportPickup').append(appendRateText);

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
                        debugger;
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
                        debugger;
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

    //Airport Drop

    //fromLocationval = $('#pickupPlaceSearch').val();
    //toLocationval = "Airport Drop";
    //$('#hdnServiceTypeID').val("2");

    //var data = JSON.stringify(
    //{
    //    FromLocationID: $('#hdnpickupPlaceID').val(),
    //    ToLocationID: $('#hdndropPlaceID').val(),
    //    ServiceTypeID: $('#hdnServiceTypeID').val(),
    //    ServiceNameID: $('#hdnServiceNameID').val(),
    //    ReqDate: ReqDateGenerated,
    //    ReqTime: "06:00 AM",
    //    TripEndDate: $('#dropdatepicker').val(),
    //    TripEndTime: $('#droptimepicker').val(),
    //    FromLocation: fromLocationval,
    //    ToLocation: toLocationval,
    //    });

    //$.ajax(
    //    {
    //        type: "POST",
    //        url: getTripFareURL,
    //        data: data,
    //        contentType: "application/json; charset=utf-8",
    //        dataType: "json",
    //        success: function (data) {
    //            debugger;

    //            $('.ratelistAirportDrop').html('');
    //            $('#divAvailableRides').show();

    //            $.each(data.ApproximateTripFare, function () {
    //                debugger;

    //                if ($('#hdnServiceTypeID').val() == "1") {
    //                    $('#hdndropPlaceID').val(this.ToLocationID);
    //                } else {
    //                    $('#hdnpickupPlaceID').val(this.FromLocationID);
    //                }

    //                $('#hdnRequestID').val(this.RequestID);

    //                var appendRateText = "<li class='list-group-item'><div class='row'><div class='col-md-2'><img src='/Images/car-11-24.png' /></div>";
    //                appendRateText = appendRateText + "<div class='col-md-5 cabName' style='text-align: left;'>" + this.VehicleType + "</div>";
    //                appendRateText = appendRateText + "<div class='col-md-5 cabName'>";

    //                var tooltipText = '';

    //                console.log("this.FxedRateNAC_S ", this.FxedRateNAC_S);

    //                if (this.FxedRateNAC_S == "0") {
    //                    appendRateText = appendRateText + "<button type='button' class='btn btn-primary booking' disabled data-toggle='popover' title='Fare' data-content='And here's fare details' value='NA'>NA</button>";
    //                } else {
    //                    if (this.ServiceNameID == 3) {
    //                        tooltipText = '<b>Rate Per KM :</b> ' + this.RatePerKM_NonAC + '<br /><b>Min KM :</b> ' + this.MinKMNAC + '<br /><b>Min KM Rate :</b> ' + this.MinKMRateNAC + '<br /><b>Day Bata :</b> ' + this.DayBata + '<br /><b>Night Bata :</b> ' + this.NightBata;
    //                    }
    //                    else if (this.ServiceNameID == 2) {
    //                        tooltipText = '<b>Min Rate :</b> ' + this.MinKMRateNAC + '<br /><b>Extra KM Rate :</b> ' + this.ExtraKMRateNAC + '<br /><b>Extra Hour Rate :</b> ' + this.pkgExtHrRateNAC;
    //                    }
    //                    else {
    //                        tooltipText = '<b>Min KM :</b> ' + this.MinKMNAC + '<br /><b>Min KM Rate :</b> ' + this.MinKMRateNAC + '<br /><b>Extra KM Rate :</b> ' + this.ExtraKMRateNAC;
    //                    }
    //                    appendRateText = appendRateText + "<button type='button' class='btn btn-primary booking1 DemoTooltipOffset' title='" + tooltipText + "' value='" + this.FxedRateNAC_S + "'onclick=ChooseVehicle(" + this.RateID + ",2," + this.FxedRateNAC_S + ") >₹" + this.FxedRateNAC_S + "</button>";
    //                }

    //                if (this.FxedRateAC_S == "0") {
    //                    appendRateText = appendRateText + "<button type='button' class='btn btn-success booking marginleft3px' disabled value='NA'>NA</button>";
    //                } else {

    //                    if (this.ServiceNameID == 3) {
    //                        tooltipText = '<b>Rate Per KM :</b> ' + this.RatePerKM_AC + '<br /><b>Min KM :</b> ' + this.MinKMAC + '<br /><b>Min KM Rate :</b> ' + this.MinKMRateAC + '<br /><b>Day Bata :</b> ' + this.DayBata + '<br /><b>Night Bata :</b> ' + this.NightBata;
    //                    }
    //                    else if (this.ServiceNameID == 2) {
    //                        tooltipText = '<b>Min Rate :</b> ' + this.MinKMRateAC + '<br /><b>Extra KM Rate :</b> ' + this.ExtraKMRateAC + '<br /><b>Extra Hour Rate :</b> ' + this.pkgExtHrRateAC;
    //                    }
    //                    else {
    //                        tooltipText = '<b>Min KM :</b> ' + this.MinKMAC + '<br /><b>Min KM Rate :</b> ' + this.MinKMRateAC + '<br /><b>Extra KM Rate :</b> ' + this.ExtraKMRateAC;
    //                    }
    //                    appendRateText = appendRateText + "<button type='button' class='btn btn-success booking1 marginleft3px DemoTooltipOffset' title='" + tooltipText + "' value='" + this.FxedRateAC_S + "' onclick=ChooseVehicle(" + this.RateID + ",1," + this.FxedRateAC_S + ")>₹" + this.FxedRateAC_S + "</button><span style='display:none'>1</span><input type='hidden' value='" + this.RateID + "' />";
    //                }

    //                appendRateText = appendRateText + "</div></div></li>";

    //                $('.ratelistAirportDrop').append(appendRateText);

    //                if ($('#hdnServiceTypeID').val() != '1' && $('#hdnServiceTypeID').val() != '2' && $('#hdnServiceTypeID').val() != '3') {
    //                    $('.DemoTooltipOffset').jBox('Tooltip', {
    //                        offset: {
    //                            x: 5,
    //                            y: -5
    //                        }
    //                    });
    //                }

    //                $('.booking_AC').click(function () {
    //                    $('#hdnACTypeID').val('1');
    //                    $('#divSearchRides').hide();
    //                    $('#divAvailableRides').hide();
    //                    $('#divOTPVerification').show();
    //                    $('#divMobileNumber').show();
    //                    $('#divOTP').hide();
    //                    $('.errorMsg, .errorMsgOTP, .errorMsgBooking, .infoMsgOTP').hide();
    //                    debugger;
    //                    $('#hdnFare').val($(this).next().val());
    //                });

    //                $('.booking').click(function () {

    //                    $('#hdnACType').val($(this).next().next().text());
    //                    $('#hdnRateID').val($(this).next().next().next().val());
    //                    console.log("hdnACType", $('#hdnACType').val());
    //                    clear_OTPFields();
    //                    $('#hdnACTypeID').val('1');
    //                    $('#divSearchRides').hide();
    //                    $('#divAvailableRides').hide();
    //                    $('#divOTPVerification').show();
    //                    $('#divMobileNumber').show();
    //                    $('#divOTP').hide();
    //                    $('.errorMsg, .errorMsgOTP, .errorMsgBooking, .infoMsgOTP').hide();
    //                    debugger;
    //                    $('#hdnFare').val($(this).val());
    //                    $('#hdnACType').val($(this).next().text());
    //                    $('#hdnRateID').val($(this).next().next().val());
    //                    console.log(" .booking hdnACType", $('#hdnACType').val());
    //                    clear_OTPFields();
    //                });
    //            });

    //        },
    //        complete: function () {
    //        },
    //        failure: function () {
    //            console.log(result);
    //        }
    //    });

    ////Airport Up & Down

    //fromLocationval = $('#pickupPlaceSearch').val();
    //toLocationval = "Airport Up And Down";
    //$('#hdnServiceTypeID').val("3");

    //var data = JSON.stringify(
    //{
    //    FromLocationID: $('#hdnpickupPlaceID').val(),
    //    ToLocationID: $('#hdndropPlaceID').val(),
    //    ServiceTypeID: $('#hdnServiceTypeID').val(),
    //    ServiceNameID: $('#hdnServiceNameID').val(),
    //    ReqDate: ReqDateGenerated,
    //    ReqTime: "06:00 AM",
    //    TripEndDate: $('#dropdatepicker').val(),
    //    TripEndTime: $('#droptimepicker').val(),
    //    FromLocation: fromLocationval,
    //    ToLocation: toLocationval,
    //});

    //$.ajax(
    //    {
    //        type: "POST",
    //        url: getTripFareURL,
    //        data: data,
    //        contentType: "application/json; charset=utf-8",
    //        dataType: "json",
    //        success: function (data) {
    //            debugger;

    //            $('.ratelistAirportupdown').html('');
    //            $('#divAvailableRides').show();

    //            $.each(data.ApproximateTripFare, function () {
    //                debugger;

    //                if ($('#hdnServiceTypeID').val() == "1") {
    //                    $('#hdndropPlaceID').val(this.ToLocationID);
    //                } else {
    //                    $('#hdnpickupPlaceID').val(this.FromLocationID);
    //                }

    //                $('#hdnRequestID').val(this.RequestID);

    //                var appendRateText = "<li class='list-group-item'><div class='row'><div class='col-md-2'><img src='/Images/car-11-24.png' /></div>";
    //                appendRateText = appendRateText + "<div class='col-md-5 cabName' style='text-align: left;'>" + this.VehicleType + "</div>";
    //                appendRateText = appendRateText + "<div class='col-md-5 cabName'>";

    //                var tooltipText = '';

    //                console.log("this.FxedRateNAC_S ", this.FxedRateNAC_S);

    //                if (this.FxedRateNAC_S == "0") {
    //                    appendRateText = appendRateText + "<button type='button' class='btn btn-primary booking' disabled data-toggle='popover' title='Fare' data-content='And here's fare details' value='NA'>NA</button>";
    //                } else {
    //                    if (this.ServiceNameID == 3) {
    //                        tooltipText = '<b>Rate Per KM :</b> ' + this.RatePerKM_NonAC + '<br /><b>Min KM :</b> ' + this.MinKMNAC + '<br /><b>Min KM Rate :</b> ' + this.MinKMRateNAC + '<br /><b>Day Bata :</b> ' + this.DayBata + '<br /><b>Night Bata :</b> ' + this.NightBata;
    //                    }
    //                    else if (this.ServiceNameID == 2) {
    //                        tooltipText = '<b>Min Rate :</b> ' + this.MinKMRateNAC + '<br /><b>Extra KM Rate :</b> ' + this.ExtraKMRateNAC + '<br /><b>Extra Hour Rate :</b> ' + this.pkgExtHrRateNAC;
    //                    }
    //                    else {
    //                        tooltipText = '<b>Min KM :</b> ' + this.MinKMNAC + '<br /><b>Min KM Rate :</b> ' + this.MinKMRateNAC + '<br /><b>Extra KM Rate :</b> ' + this.ExtraKMRateNAC;
    //                    }
    //                    appendRateText = appendRateText + "<button type='button' class='btn btn-primary booking1 DemoTooltipOffset' title='" + tooltipText + "' value='" + this.FxedRateNAC_S + "'onclick=ChooseVehicle(" + this.RateID + ",2," + this.FxedRateNAC_S + ") >₹" + this.FxedRateNAC_S + "</button>";
    //                }

    //                if (this.FxedRateAC_S == "0") {
    //                    appendRateText = appendRateText + "<button type='button' class='btn btn-success booking marginleft3px' disabled value='NA'>NA</button>";
    //                } else {

    //                    if (this.ServiceNameID == 3) {
    //                        tooltipText = '<b>Rate Per KM :</b> ' + this.RatePerKM_AC + '<br /><b>Min KM :</b> ' + this.MinKMAC + '<br /><b>Min KM Rate :</b> ' + this.MinKMRateAC + '<br /><b>Day Bata :</b> ' + this.DayBata + '<br /><b>Night Bata :</b> ' + this.NightBata;
    //                    }
    //                    else if (this.ServiceNameID == 2) {
    //                        tooltipText = '<b>Min Rate :</b> ' + this.MinKMRateAC + '<br /><b>Extra KM Rate :</b> ' + this.ExtraKMRateAC + '<br /><b>Extra Hour Rate :</b> ' + this.pkgExtHrRateAC;
    //                    }
    //                    else {
    //                        tooltipText = '<b>Min KM :</b> ' + this.MinKMAC + '<br /><b>Min KM Rate :</b> ' + this.MinKMRateAC + '<br /><b>Extra KM Rate :</b> ' + this.ExtraKMRateAC;
    //                    }
    //                    appendRateText = appendRateText + "<button type='button' class='btn btn-success booking1 marginleft3px DemoTooltipOffset' title='" + tooltipText + "' value='" + this.FxedRateAC_S + "' onclick=ChooseVehicle(" + this.RateID + ",1," + this.FxedRateAC_S + ")>₹" + this.FxedRateAC_S + "</button><span style='display:none'>1</span><input type='hidden' value='" + this.RateID + "' />";
    //                }

    //                appendRateText = appendRateText + "</div></div></li>";

    //                $('.ratelistAirportupdown').append(appendRateText);

    //                if ($('#hdnServiceTypeID').val() != '1' && $('#hdnServiceTypeID').val() != '2' && $('#hdnServiceTypeID').val() != '3') {
    //                    $('.DemoTooltipOffset').jBox('Tooltip', {
    //                        offset: {
    //                            x: 5,
    //                            y: -5
    //                        }
    //                    });
    //                }

    //                $('.booking_AC').click(function () {
    //                    $('#hdnACTypeID').val('1');
    //                    $('#divSearchRides').hide();
    //                    $('#divAvailableRides').hide();
    //                    $('#divOTPVerification').show();
    //                    $('#divMobileNumber').show();
    //                    $('#divOTP').hide();
    //                    $('.errorMsg, .errorMsgOTP, .errorMsgBooking, .infoMsgOTP').hide();
    //                    debugger;
    //                    $('#hdnFare').val($(this).next().val());
    //                });

    //                $('.booking').click(function () {

    //                    $('#hdnACType').val($(this).next().next().text());
    //                    $('#hdnRateID').val($(this).next().next().next().val());
    //                    console.log("hdnACType", $('#hdnACType').val());
    //                    clear_OTPFields();
    //                    $('#hdnACTypeID').val('1');
    //                    $('#divSearchRides').hide();
    //                    $('#divAvailableRides').hide();
    //                    $('#divOTPVerification').show();
    //                    $('#divMobileNumber').show();
    //                    $('#divOTP').hide();
    //                    $('.errorMsg, .errorMsgOTP, .errorMsgBooking, .infoMsgOTP').hide();
    //                    debugger;
    //                    $('#hdnFare').val($(this).val());
    //                    $('#hdnACType').val($(this).next().text());
    //                    $('#hdnRateID').val($(this).next().next().val());
    //                    console.log(" .booking hdnACType", $('#hdnACType').val());
    //                    clear_OTPFields();
    //                });
    //            });

    //        },
    //        complete: function () {
    //        },
    //        failure: function () {
    //            console.log(result);
    //        }
    //    });

}

function ChooseVehicle(RateID, ACTypeID, Fare) {
    debugger;
    $('#hdnACTypeID').val(ACTypeID);
    $('#divSearchRides').show();
    $('#divAvailableRides').hide();
    $('#divOTPVerification').hide();
    $('#divMobileNumber').hide();
    $('#divOTP').hide();
    $('.errorMsg, .errorMsgOTP, .errorMsgBooking, .infoMsgOTP').hide();

    $('#hdnFare').val(Fare);
    $('#hdnACType').val(ACTypeID);
    $('#hdnRateID').val(RateID);
    console.log("hdnACType", $('#hdnACType').val());
    clear_OTPFields();
    debugger;
    $('html, body').animate({ scrollTop: 0 }, "slow");
}

function booknow() {
    debugger;

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

    $.ajax(
        {
            type: "POST",
            url: getTripFareURL,
            data: data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                debugger;
                if (data.Result == "1") {

                    var payMode = $("#hdnPaymentType").val();
                    $.post('/Home/SetVariable',
                        { key: "BookingID", value: data.BookID }, function (data) {


                            console.log("payMode", payMode);
                            if (payMode == "5") {
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
                            }
                            else {
                                $('.p_PaymentProcessing').html('<b>Please wait. We are processing your payment .</b>');
                                $('.p_PaymentProcessing').css('color', 'green');
                                window.location.href = "https://webapis.utaxi.in/PayTM_GT.aspx?BookID=" + data.BookID;
                            }
                        });
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

function showTabs(tabName) {
    if (tabName == 'Airport') {
        $('#hdnPackageType').val('');
        clear_Fields();

        $('#pickupPlaceSearch').show();
        //$('#pickupPlace').show();
        $('#dropPlaceSearch').show();
        //$('#dropPlace').show();
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

    } else if (tabName == 'Citytaxi') {
        clear_Fields();
        $('#hdnPackageType').val('');

        $('#pickupPlaceSearch').show();
        //$('#pickupPlace').show();
        $('#dropPlaceSearch').show();
        //$('#dropPlace').show();
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
    } else if (tabName == 'Package') {
        loadPackages();
        clear_Fields();
        $('#pickupPlaceSearch').show();
        //$('#pickupPlace').show();
        $('#dropPlaceSearch').show();
        //$('#dropPlace').show();
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
    } else if (tabName == 'Outstation') {

        $('#hdnPackageType').val('');
        clear_Fields();
        $('#pickupPlaceSearch').show();
        //$('#pickupPlace').show();
        $('#dropPlaceSearch').show();
        //$('#dropPlace').show();
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

    if ($(element).val().trim() != 'Enter Search Place') {
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
    //$('#dropPlace').html('Enter Search Place');
    $('#pickupdatepicker, #dropdatepicker').val('');
    $('#pickuptimepicker, #droptimepicker').val('');
    //$('#pickupPlace').html('Enter Search Place');
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

    debugger;

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

function loadPickupDropOptions() {
    debugger;
    if ($("#rdAirportPickup").is(":checked")) {

        clear_Fields();

        $('#pickupPlaceSearch').show();
        $('#dropPlaceSearch').show();
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

        $('#pickupPlaceSearch').show();
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

        $('#pickupPlaceSearch').show();
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