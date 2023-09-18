var GAreaID = "0";
$(document).ready(function () {
    loadPackages();
    var fare = '';
    var mobileNumber = '';
    $("#hdnPaymentType").val('5');
    $('#pickupPlaceSearch').hide();
    $('#pickupPlace').show();
    $('#dropPlaceSearch').hide();
    $('#dropPlace').show();
    $('#pickupdatepicker, #dropdatepicker').datepicker(
        {
            minDate: 0
        });
    $('#pickuptimepicker, #droptimepicker').mdtimepicker();
    $('.errorMsg, .errorMsgOTP, .errorMsgBooking, .infoMsgOTP').hide();
    $('#divSearchRides').show();
    $('#divAvailableRides').hide();
    $('#divOTPVerification').hide();
    $('#divBooking').hide();
    $('#divOTP').hide();
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
    var PackageTypevalue = $('#hdnPackageType').val();
    var AirportServiceNameID = $('#hdnAirportServiceNameID').val();
    if (PackageTypevalue != '') {
        showTabs('Package');
        $('#idAirportTab').removeClass('active');
        $('#idPackageTab').addClass('active')
    }
    else if (AirportServiceNameID == '6') {
        showTabs('Outstation');
        $('#idAirportTab').removeClass('active');
        $('#idOutstationTab').addClass('active')
    }
    else if (AirportServiceNameID != '') {
        $("input[name=pickupOption][value=" + AirportServiceNameID + "]").attr('checked', 'checked');
        $('#hdnServiceTypeID').val(AirportServiceNameID);
        $('#hdnStatusID').val("2")
    }
    showTabs('Outstation');
    $('.A_FD_AC').click(function () {
        $('#FD_FareModal').modal('show')
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
        $('#hdnStatusID').val("2")
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
        $('#hdnStatusID').val("2")
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
        $('#hdnStatusID').val("2")
    });
    $('#rdOutstationOneway').click(function () {
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
        $('#hdnServiceNameID').val("8");
        $('#hdnServiceTypeID').val("48");
        $('#hdnStatusID').val("2");
        $('#hdnOutstationTypeID').val("1")
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
        $('#hdnServiceNameID').val("8");
        $('#hdnServiceTypeID').val("49");
        $('#hdnStatusID').val("2");
        $('#hdnOutstationTypeID').val("2")
    });
    $('#pickupPlace').click(function () {
        $('#pickupPlaceSearch').show().val('').focus();
        $('#pickupPlace').hide();
        $('#divAvailableRides').hide()
    });
    $('#pickupdatepicker').click(function () {
        $('#divAvailableRides').hide()
    });
    $('#dropdatepicker').click(function () {
        $('#divAvailableRides').hide()
    });
    $('#pickuptimepicker').click(function () {
        $('#divAvailableRides').hide()
    });
    $('#droptimepicker').click(function () {
        $('#divAvailableRides').hide()
    });
    $('#ddlPackageType').change(function () {
        $('#divAvailableRides').hide()
    });
    $('#dropPlace').click(function () {
        $('#dropPlaceSearch').show().val('').focus();
        $('#dropPlace').hide();
        $('#divAvailableRides').hide()
    });

    $('#btnSubmit').click(function () {
        var tabName = $('.nav-item .active').text();
        var pickupDate = $('#pickupdatepicker').val() + " " + $('#pickuptimepicker').val();
        var dropDate = $('#dropdatepicker').val() + " " + $('#droptimepicker').val();
        var pickupDateValue = new Date(pickupDate);
        var dropDatevalue = new Date(dropDate);
        var d2 = new Date();
        $('#hdnServiceNameID').val("8");

        if ($('#hdnOutstationTypeID').val() == "1") {
            if (isEmptyDiv('#pickupPlace') && isEmptyDiv('#dropPlace') && isEmptyText('#pickupdatepicker') && isEmptyText('#pickuptimepicker')) {
                if (compareDates(pickupDateValue, d2) == !1) {
                    $('.errorMsg').show().html('<strong>!</strong> Previous dates will not be allowed');
                    $('#divAvailableRides').hide()
                }
                else {
                    $('.errorMsg').hide().html('<strong>!</strong> Correct the errors');
                    $('#divAvailableRides').show()
                }
            }
            else {
                $('.errorMsg').show().html('<strong>!</strong> Correct the errors');
                $('#divAvailableRides').hide()
            }
        }
        else {
            if (isEmptyDiv('#pickupPlace') && isEmptyDiv('#dropPlace') && isEmptyText('#pickupdatepicker') && isEmptyText('#pickuptimepicker') && isEmptyText('#dropdatepicker') && isEmptyText('#droptimepicker')) {
                $('#hdnServiceTypeID').val("49");
                if (compareDates(pickupDateValue, d2) == !1 || compareDates(dropDatevalue, d2) == !1) {
                    $('.errorMsg').show().html('<strong>!</strong> Previous dates will not be allowed');
                    $('#divAvailableRides').hide()
                }
                else {
                    $('.errorMsg').hide().html('<strong>!</strong> Correct the errors');
                    $('#divAvailableRides').show()
                }
            }
            else {
                $('.errorMsg').show().html('<strong>!</strong> Correct the errors');
                $('#divAvailableRides').hide()
            }
        }
        loadOutstationRates();
    });

    $('#btnSubmitOTP').click(function () {
        if ($('#divMobileNumber').is(":visible")) {
            if (isEmptyText('#mobileNumber')) {
                sendSMS_V1();
            }
            else {
                $('.errorMsgOTP').show()
            }
        }
        else {
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
                    $('.errorMsgOTP').hide().html('<strong>!</strong> Correct the errors')
                }
                else {
                    $('.errorMsgOTP').show().html('<strong>!</strong> Entered wrong OTP')
                }
            }
            else {
                $('.errorMsgOTP').show()
            }
        }
    });

    $('#btnBooknow').click(function () {
        if (isEmptyText('#bookingMobileNumber') && isEmptyText('#bookingName') && isEmptyText('#bookingEmailID') && isEmptyDropDown('#bookingACType') && isEmptyText('#bookingAddress')) {
            var bookpayoption = $('input[name=bookingPayOption]:checked').val()
            if (bookpayoption == "" || bookpayoption == undefined) {
                bootbox.alert("Payment option is required to proceed");
                $('#paymentOption').addClass("errors");
                $('.errorMsgBooking').show()
            }
            else {
                $('#paymentOption').removeClass("errors");
                $('.errorMsgBooking').hide();
                booknow_V1();
            }
        }
        else {
            $('.errorMsgBooking').show()
        }
    });

    $('#btnCancelOTP, #btnReplan').click(function () {
        $('#divSearchRides').show();
        $('#divAvailableRides').show();
        $('#divOTPVerification').hide();
        $('#divBooking').hide();
        clear_OTPFields()
    });

    $('#paymentOption').click(function () {
        $('#hdnPaymentType').val($('input[name=bookingPayOption]:checked').val());
        console.log("hdnPaymentType:", $('#hdnPaymentType').val());
        $('.E_paymentOption').html('');
        $('.p_Fare').html('');
        $('.div_fareCalculation').show();
        PaymentType()
    });
});

function sendSMS() {
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
                $('#bookingName').val('');
                $('#bookingEmailID').val('');
                $('#bookingAddress').val('');
                if (data.Status == !0 && data.StatusID == "1") {
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
                    $("#paymentOption").trigger("click")
                }
                else if (data.OTP != "") {
                    $('.infoMsgOTP').show();
                    $('#hdnCustomerOTP').val(data.OTP);
                    $('#divOTP').show();
                    $('#divMobileNumber').hide()
                }
            },
            failure: function () {
                console.log(result)
            }
        })
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
            //var obj = JSON.parse(data);
            var obj = data;

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

function sendSMS() {
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
                $('#bookingName').val('');
                $('#bookingEmailID').val('');
                $('#bookingAddress').val('');
                if (data.Status == !0 && data.StatusID == "1") {
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
                    $("#paymentOption").trigger("click")
                }
                else if (data.OTP != "") {
                    $('.infoMsgOTP').show();
                    $('#hdnCustomerOTP').val(data.OTP);
                    $('#divOTP').show();
                    $('#divMobileNumber').hide()
                }
            },
            failure: function () {
                console.log(result)
            }
        })
}

function loadAvailableRides() {
    var TripEndDate = "";
    var TripEndTime = "";
    if ($('#rdOutstationOneway').is(":checked")) {
        TripEndDate = $('#pickupdatepicker').val();
        TripEndTime = "11:55 PM"
    }
    else {
        TripEndDate = $('#dropdatepicker').val();
        TripEndTime = $('#droptimepicker').val()
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
            TripEndDate: TripEndDate,
            TripEndTime: TripEndTime,
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
            beforeSend: function () { },
            success: function (data) {
                $('.ratelist').html('');
                $.each(data.ApproximateTripFare, function () {
                    $('#hdnpickupPlaceID').val(this.FromLocationID);
                    $('#hdndropPlaceID').val(this.ToLocationID);
                    $('#hdnRequestID').val(this.RequestID);
                    $("#hdnEnableOnlinePayment").val(this.EnableOnlinePayment);
                    var appendRateText = "<li class='list-group-item'><div class='row'><div class='col-md-2'><img src='/Images/car-11-24.png' /></div>";
                    appendRateText = appendRateText + "<div class='col-md-5 cabName' style='text-align: left;'>" + this.VehicleType + "</div>";
                    appendRateText = appendRateText + "<div class='col-md-5 cabName'>";
                    var tooltipText = '';
                    if (this.FxedRateNAC_S == "0") {
                        appendRateText = appendRateText + "<button type='button' class='btn btn-primary booking' disabled data-toggle='popover' title='Fare' data-content='And here's fare details' value='NA'>NA</button>"
                    }
                    else {
                        if (this.ServiceNameID == 3) {
                            tooltipText = '<b>Rate Per KM :</b> ' + this.RatePerKM_NonAC + '<br /><b>Min KM :</b> ' + this.MinKMNAC + '<br /><b>Min KM Rate :</b> ' + this.MinKMRateNAC + '<br /><b>Day Bata :</b> ' + this.DayBata + '<br /><b>Night Bata :</b> ' + this.NightBata
                        }
                        else if (this.ServiceNameID == 2) {
                            tooltipText = '<b>Min Rate :</b> ' + this.MinKMRateNAC + '<br /><b>Extra KM Rate :</b> ' + this.ExtraKMRateNAC + '<br /><b>Extra Hour Rate :</b> ' + this.pkgExtHrRateNAC
                        }
                        else {
                            tooltipText = '<b>Min KM :</b> ' + this.MinKMNAC + '<br /><b>Min KM Rate :</b> ' + this.MinKMRateNAC + '<br /><b>Extra KM Rate :</b> ' + this.ExtraKMRateNAC
                        }
                        appendRateText = appendRateText + "<button type='button' class='btn btn-primary booking1 DemoTooltipOffset' title='" + tooltipText + "' value='" + this.FxedRateNAC_S + "'onclick=ChooseVehicle(" + this.RateID + ",2," + this.FxedRateNAC_S + ") >₹ " + this.FxedRateNAC_S + "</button>"
                    }
                    appendRateText += "&nbsp;";
                    if (this.FxedRateAC_S == "0") {
                        appendRateText = appendRateText + "<button type='button' class='btn btn-success booking marginleft3px' disabled value='NA'>NA</button>"
                    }
                    else {
                        if (this.ServiceNameID == 3) {
                            tooltipText = '<b>Rate Per KM :</b> ' + this.RatePerKM_AC + '<br /><b>Min KM :</b> ' + this.MinKMAC + '<br /><b>Min KM Rate :</b> ' + this.MinKMRateAC + '<br /><b>Day Bata :</b> ' + this.DayBata + '<br /><b>Night Bata :</b> ' + this.NightBata
                        }
                        else if (this.ServiceNameID == 2) {
                            tooltipText = '<b>Min Rate :</b> ' + this.MinKMRateAC + '<br /><b>Extra KM Rate :</b> ' + this.ExtraKMRateAC + '<br /><b>Extra Hour Rate :</b> ' + this.pkgExtHrRateAC
                        }
                        else {
                            tooltipText = '<b>Min KM :</b> ' + this.MinKMAC + '<br /><b>Min KM Rate :</b> ' + this.MinKMRateAC + '<br /><b>Extra KM Rate :</b> ' + this.ExtraKMRateAC
                        }
                        appendRateText = appendRateText + "<button type='button' class='btn btn-success booking1 marginleft3px DemoTooltipOffset' title='" + tooltipText + "' value='" + this.FxedRateAC_S + "' onclick=ChooseVehicle(" + this.RateID + ",1," + this.FxedRateAC_S + ")>₹ " + this.FxedRateAC_S + "</button><span style='display:none'>1</span><input type='hidden' value='" + this.RateID + "' />"
                    }
                    appendRateText += "<br />";
                    if (this.FxedRateNAC_S != "0") {
                        appendRateText += "<a style='cursor: pointer;text-decoration: underline;' class='A_FD_AC' onclick='ShowFareDetails(\"" + this.Comment_FromPalceToPlace + "\",\"" + this.Comment_TravelTime + "\",\"" + this.Comment_ExtKmFareNAC + "\",\"" + this.Comment_TollParking + "\",\"" + this.VehicleType + "\",\"" + this.FxedRateNAC_S + "\",\"Non AC\")' >Details</a>"
                    }
                    if (this.FxedRateAC_S != "0") {
                        if (this.FxedRateNAC_S == "0") {
                            appendRateText += "<a style='cursor: pointer;text-decoration: underline;margin-left: 70px;' class='A_FD_AC' onclick='ShowFareDetails(\"" + this.Comment_FromPalceToPlace + "\",\"" + this.Comment_TravelTime + "\",\"" + this.Comment_ExtKmFareAC + "\",\"" + this.Comment_TollParking + "\",\"" + this.VehicleType + "\",\"" + this.FxedRateAC_S + "\",\"AC\")' >Details</a>"
                        }
                        else {
                            appendRateText += "<a style='cursor: pointer;text-decoration: underline;margin-left: 25px;' class='A_FD_AC' onclick='ShowFareDetails(\"" + this.Comment_FromPalceToPlace + "\",\"" + this.Comment_TravelTime + "\",\"" + this.Comment_ExtKmFareAC + "\",\"" + this.Comment_TollParking + "\",\"" + this.VehicleType + "\",\"" + this.FxedRateAC_S + "\",\"AC\")' >Details</a>"
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
                        $('#hdnFare').val($(this).next().val())
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
                        $('#hdnFare').val($(this).val());
                        $('#hdnACType').val($(this).next().text());
                        $('#hdnRateID').val($(this).next().next().val());
                        console.log(" .booking hdnACType", $('#hdnACType').val());
                        clear_OTPFields()
                    })
                })
            },
            complete: function () { },
            failure: function () {
                console.log(result)
            }
        })
}

function convertToDate(date) {

    var d = date.getDate();
    var m = date.getMonth() + 1; //Month from 0 to 11
    var y = date.getFullYear();
    var pickupDate = '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);

    return pickupDate;
}

function convertToTime(time) {

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

    return pickuptime;
}


function loadOutstationRates() {
    ;

    $('#pickupPlace').val($("#pickupPlaceSearch").val());
    $('#dropPlace').val($("#dropPlaceSearch").val());

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
    var pickupDate = convertToDate(date);

    var time = $("#pickuptimepicker").val();
    var pickuptime = convertToTime(time);

    var drop_date = "";
    if ($('#dropdatepicker').val() != '') {
        drop_date = new Date($('#dropdatepicker').val());
        drop_date = convertToDate(drop_date);
    }

    var drop_time = "";
    if ($("#droptimepicker").val() != '') {
        drop_time = $("#droptimepicker").val();
        drop_time = convertToTime(drop_time);
    }

    var fd = new FormData();
    fd.append('trip_type', $('#hdnOutstationTypeID').val());
    fd.append('pickup', $('#pickupPlace').val());
    fd.append('dropoff', $('#dropPlace').html());
    fd.append('pickupdate', pickupDate);
    fd.append('pickuptime', pickuptime);
    fd.append('dropoffdate', drop_date);
    fd.append('dropofftime', drop_time);
    console.log(fd);

    $.ajax({
        url: 'https://www.deepamtaxi.com/admin/web_api/outstation_price_details',
        data: fd,
        processData: false,
        contentType: false,
        type: 'POST',
        success: function (data) {
            ;
            var obj = JSON.parse(data);
            console.log(data);
            console.log(obj.response);

            $('#hdnpick_latitude').val(obj.pick_latitude);
            $('#hdnpick_longitude').val(obj.pick_longitude);
            $('#hdndrop_latitude').val(obj.drop_latitude);
            $('#hdndrop_longitude').val(obj.drop_longitude);

            var pickupPlace = obj.pickup;
            var dropoffPlace = obj.dropoff;

            $('.ratelist').html('');

            $.each(obj.response, function () {

                ;

                $('#hdnEstimatedDistance').val(this.distance_ac);

                var appendRateText = "<li class='list-group-item'><div class='row'><div class='col-md-2'><img src='/Images/car-11-24.png' /></div>";
                appendRateText = appendRateText + "<div class='col-md-5 cabName' style='text-align: left;'>" + getCategorybyIDDisplay(this.total_price.car_category_id) + "</div>";
                appendRateText = appendRateText + "<div class='col-md-5 cabName'>";

                if (this.final_price_non_ac == "0") {
                    appendRateText = appendRateText + "<button type='button' class='btn btn-primary booking' disabled data-toggle='popover' title='Fare' data-content='And here's fare details' value='NA'>NA</button>"
                }
                else {
                    appendRateText = appendRateText + "<button type='button' class='btn btn-primary booking1 DemoTooltipOffset' value='" + this.final_price_non_ac + "' onclick=ChooseVehicle_V1(" + this.total_price.car_category_id + ",0," + this.final_price_non_ac + ") >₹ " + this.final_price_non_ac + "</button>"
                }

                appendRateText += "&nbsp;";

                if (this.final_price_ac == "0") {
                    appendRateText = appendRateText + "<button type='button' class='btn btn-success booking marginleft3px' disabled value='NA'>NA</button>"
                }
                else {
                    appendRateText = appendRateText + "<button type='button' class='btn btn-success booking1 marginleft3px DemoTooltipOffset' value='" + this.final_price_ac + "' onclick=ChooseVehicle_V1(" + this.total_price.car_category_id + ",1," + this.final_price_ac + ")>₹ " + this.final_price_ac + "</button>"
                }

                appendRateText += "<br />";

                var Comment_TollParking = '';

                if (this.final_price_non_ac != "0") {
                    appendRateText += "<a style='cursor: pointer;text-decoration: underline;' class='A_FD_AC' onclick='ShowFareDetails_V1(\"" + pickupPlace + "\",\"" + dropoffPlace + "\",\"" + this.time + "\",\"" + this.distance + "\",\"" + this.extra_km_charge + "\",\"" + Comment_TollParking + "\",\"" + getCategorybyIDDisplay(this.total_price.car_category_id) + "\",\"" + this.final_price_non_ac + "\",\"Non AC\",\"" + this.extra_km_charge + "\",\"" + this.total_price.base_value + "\",\"" + this.driver_travel_days + "\",\"" + this.discont_price_non_ac + "\",\"" + this.driver_allowance + "\",\"" + this.total_price.day_allowance + "\")' >Details</a>"
                }
                if (this.final_price_ac != "0") {
                    if (this.final_price_ac == "0") {
                        appendRateText += "<a style='cursor: pointer;text-decoration: underline;margin-left: 70px;' class='A_FD_AC' onclick='ShowFareDetails_V1(\"" + pickupPlace + "\",\"" + dropoffPlace + "\",\"" + this.time + "\",\"" + this.distance + "\",\"" + this.extra_km_charge_ac + "\",\"" + Comment_TollParking + "\",\"" + getCategorybyIDDisplay(this.total_price_ac.car_category_id) + "\",\"" + this.final_price_ac + "\",\"AC\",\"" + this.extra_km_charge_ac + "\",\"" + this.total_price_ac.base_value_ac + "\",\"" + this.driver_travel_days + "\",\"" + this.discont_price_ac + "\",\"" + this.driver_allowance + "\",\"" + this.total_price_ac.day_allowance + "\")' >Details</a>"
                    }
                    else {
                        appendRateText += "<a style='cursor: pointer;text-decoration: underline;margin-left: 25px;' class='A_FD_AC' onclick='ShowFareDetails_V1(\"" + pickupPlace + "\",\"" + dropoffPlace + "\",\"" + this.time + "\",\"" + this.distance + "\",\"" + this.extra_km_charge_ac + "\",\"" + Comment_TollParking + "\",\"" + getCategorybyIDDisplay(this.total_price_ac.car_category_id) + "\",\"" + this.final_price_ac + "\",\"AC\",\"" + this.extra_km_charge_ac + "\",\"" + this.total_price_ac.base_value_ac + "\",\"" + this.driver_travel_days + "\",\"" + this.discont_price_ac + "\",\"" + this.driver_allowance + "\",\"" + this.total_price_ac.day_allowance + "\")' >Details</a>"
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

        },
        failure: function () {
            console.log(result);
        }
    });
}

function ShowFareDetails_V1(FromPalce, ToPlace, TravelTime, distance, ExtKmFare, TollParking, VehicleType, Rate, ACType, extra_km_charge, min_amount, driver_travel_days, discont_price, driver_allowance, day_allowance) {
    TollParking = 'Toll Charge and Parking will be extra';
    var TripDate = $('#pickupdatepicker').val(),
        TripTime = $('#pickuptimepicker').val();
    $('.FD_FromPalceToPlace').html(FromPalce + ' > ' +ToPlace);
    $('.FD_VehicleType').html(VehicleType);
    $('.FD_ACType').html(ACType);
    $('.FD_Rate').html(Rate);
    $('.FD_PickupDate').html(TripDate);
    $('.FD_PickupTime').html(TripTime);
    $('.FD_distance').html(distance);
    $('.FD_extra_km_charge').html(extra_km_charge);
    $('.FD_min_amount').html(min_amount);
    $('.FD_driver_travel_days').html(driver_travel_days);
    $('.FD_driver_allowance').html(driver_allowance);
    $('.FD_driver_day_allowance').html(day_allowance);   
    $('.FD_discont_price').html(discont_price);

    var TripsTerms = "<li> Vehicle Type : " + VehicleType + " " + ACType + " , Min KM Rate: ₹" + Rate + "</li>"
    TripsTerms += "<li>" + TravelTime + " of driving time</li>"
    TripsTerms += "<li>Distance travelled beyond " + distance + " KM will be charged at Rs." + ExtKmFare + "/KM</li>"
    TripsTerms += "<li>" + TollParking + "</li>"
    ;
    $('#FD_FareModal').modal('show');
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
    ;
    $('html, body').animate({ scrollTop: 0 }, "slow");
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
    $('html, body').animate(
        {
            scrollTop: 0
        }, "slow");
    $('.FD_FareModal').show()
}

function booknow() {
    var tripEndDate = "";
    var getTripFareURL = $('#hdnWebApiURL').val() + "D_Booknow";
    if ($('#hdnOutstationTypeID').val() == "1") {
        tripEndDate = $('#pickupdatepicker').val() + ' ' + $('#pickuptimepicker').val()
    }
    else {
        tripEndDate = $('#dropdatepicker').val() + ' ' + $('#droptimepicker').val()
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
                if (data.Result == "1") {
                    $.post('/Home/SetVariable',
                        {
                            key: "BookingID",
                            value: data.BookID
                        }, function (data) {
                            var payMode = $("#hdnPaymentType").val();
                            console.log("payMode", payMode);
                            if (payMode == "5") {
                                bootbox.alert("Booked successfully with the BookingID " + data.BookID + ". <br \> Kindly provide your valuable feedback either in our facebook or twitter page.");
                                clear_BookingFields();
                                clear_OTPFields();
                                clear_Fields();
                                $('#divSearchRides').show();
                                $('#divAvailableRides').hide();
                                $('#divOTPVerification').hide();
                                $('#divBooking').hide();
                                $('#divOTP').hide();
                                window.location.href = '/Thank-You-Utaxi.aspx'
                            }
                            else {
                                $('.p_PaymentProcessing').html('<b>Please wait. We are processing your payment .</b>');
                                $('.p_PaymentProcessing').css('color', 'green');
                                window.location.href = "https://webapis.utaxi.in/PayTM_GT.aspx?BookID=" + data.BookID
                            }
                        })
                }
                else {
                    bootbox.alert("There is an issue during the booking. Please try again")
                }
            },
            failure: function () {
                console.log(result)
            }
        })
}

function booknow_V1() {
    ;

    var date = new Date($('#pickupdatepicker').val());
    var pickupDate = convertToDate(date);

    var time = $("#pickuptimepicker").val();
    var pickuptime = convertToTime(time);

    var drop_date = "";
    if ($('#dropdatepicker').val() != '') {
        drop_date = new Date($('#dropdatepicker').val());
        drop_date = convertToDate(drop_date);
    }

    var drop_time = "";
    if ($("#droptimepicker").val() != '') {
        drop_time = $("#droptimepicker").val();
        drop_time = convertToTime(drop_time);
    }

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
    fd.append('trip_type', $('#hdnOutstationTypeID').val());
    fd.append('dropoffdate', drop_date);
    fd.append('dropofftime', drop_time);
    fd.append('customer_id', $('#hdncustomer_id').val());
    //fd.append('type_of_booking', '2');

    $.ajax({
        url: 'https://www.deepamtaxi.com/admin/web_api/do_outstation_bookings',
        data: fd,
        processData: false,
        contentType: false,
        type: 'POST',
        success: function (data) {
            ;

            //var obj = JSON.parse(data);
            var obj = data;

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
        $('#divAiportPickupField').hide();
        $('#divAiportDropField').show();
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
        $('#hdnStatusID').val("2")
    }
    else if (tabName == 'Citytaxi') {
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
        $('#hdnStatusID').val("2")
    }
    else if (tabName == 'Package') {
        loadPackages();
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
        $('#hdnStatusID').val("1")
    }
    else if (tabName == 'Outstation') {
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
        $('#hdnStatusID').val("2")
    }
    else if (tabName == 'OutstationPackages') {
        $('#hdnPackageType').val('');
        clear_Fields();
        $('#pickupPlaceSearch').show();
        $('#pickupPlace').show();
        $('#dropPlaceSearch').show();
        $('#dropPlace').show();
        $('#divAiportPickupField').hide();
        $('#divAiportDropField').hide();
        $('#divSearchRides').show();
        $('#divAvailableRides').hide();
        $('#divOTPVerification').hide();
        $('#divBooking').hide();
        $('#airportPickupOptions').hide();
        $('#divPackageType').hide();
        $('#outstationOptions').hide();
        $('#divPickup').hide();
        $('#divPickupTime').hide();
        $('#divDrop').hide();
        $('#divDropTime').hide();
        $('#btnSearchNext').show();
        $('#hdnServiceNameID').val("3");
        $('#hdnServiceTypeID').val("3");
        $('#hdnStatusID').val("2")
    }
    else { }
}

function isEmptyText(element) {
    var isValid = !1;
    if ($(element).val() != '') {
        isValid = !0;
        $(element).removeClass('errors')
    }
    else {
        $(element).addClass('errors')
    }
    return isValid
}

function isEmptyDiv(element) {
    var isValid = !1;
    if ($(element).html().trim() != 'Enter Search Place') {
        isValid = !0;
        $(element).removeClass('errors')
    }
    else {
        $(element).addClass('errors')
    }
    return isValid
}

function isEmptyDropDown(element) {
    var isValid = !1;
    if ($(element).val() != '-1') {
        isValid = !0;
        $(element).removeClass('errors')
    }
    else {
        $(element).addClass('errors')
    }
    return isValid
}

function clear_Fields() {
    $('#dropPlace').html('Enter Search Place');
    $('#pickupdatepicker, #dropdatepicker').val('');
    $('#pickuptimepicker, #droptimepicker').val('');
    $('#pickupPlace').html('Enter Search Place');
    $('*').removeClass('errors')
}

function clear_BookingFields() {
    $('#bookingMobileNumber').val('');
    $('#bookingName').val('');
    $('#bookingEmailID').val('');
    $('#bookingACType').val('-1');
    $('#bookingAddress').val('');
    $('#bookingComments').val('');
    $('#hdnServiceNameID').val('');
    $('#hdnServiceTypeID').val('');
    $('#hdnStatusID').val('');
    $('#hdnOutstationTypeID').val('1');
    $('#hdndropPlaceID').val('');
    $('#hdnpickupPlaceID').val('');
    $('#hdnFare').val('');
    $('#hdnACType').val('');
    $('#hdnRateID').val('')
}

function clear_OTPFields() {
    $('#mobileNumber').val('');
    $('#OTP').val('');
    $('.errorMsgOTP').hide()
}

function loadPackages() {
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
    var TotalTripFare = "0",
        DiscountOffer = "0",
        Discount = "0",
        payableamount = "0",
        balance = "0";
    var PaymentTypeID = $('#hdnPaymentType').val();
    TotalTripFare = $('#bookingFare').val();
    if (PaymentTypeID == "1") {
        DiscountOffer = 5;
        Discount = parseFloat(TotalTripFare * 5) / 100;
        payableamount = TotalTripFare - Discount;
        balance = 0;
        $('.p_TripFare').html('Your current payment value is Rs. ' + payableamount + '/-');
        $('.p_TripFare').css('color', 'red');
        $('.p_Discount').html('The balance you will have to pay Rs. ' + balance + '/-');
        $('.p_Balance').html('The amount you save Rs. ' + Discount + '/-');
        $('.p_Balance').css('color', 'green');
        $('#hdnPaidAmount').val(payableamount);
        $('#hdnDiscount').val(Discount);
        $('#hdnBalance').val(balance)
    }
    else if (PaymentTypeID == "2") {
        DiscountOffer = 2.5;
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
        $('#hdnBalance').val(balance)
    }
    else if (PaymentTypeID == "3") {
        DiscountOffer = 100;
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
        $('#hdnBalance').val(balance)
    }
    else if (PaymentTypeID == "4") {
        DiscountOffer = 50;
        Discount = 50;
        payableamount = parseFloat(TotalTripFare * 50) / 100;
        balance = payableamount - Discount;
        $('.p_TripFare').html('Your current payment value is Rs. ' + payableamount + '/-');
        $('.p_TripFare').css('color', 'red');
        $('.p_Discount').html('The balance you will have to pay Rs. ' + balance + '/-');
        $('.p_Balance').html('The amount you save Rs. ' + Discount + '/-');
        $('.p_Balance').css('color', 'green');
        $('#hdnPaidAmount').val(payableamount);
        $('#hdnDiscount').val(Discount);
        $('#hdnBalance').val(balance)
    }
    else if (PaymentTypeID == "5") {
        payableamount = 0;
        Discount = 0;
        balance = TotalTripFare;
        $('.p_TripFare').html('Your current payment value is Rs. ' + payableamount + '/-');
        $('.p_TripFare').css('color', 'red');
        $('.p_Discount').html('The balance you will have to pay Rs. ' + balance + '/-');
        $('.p_Balance').html('The amount you save Rs. ' + Discount + '/-');
        $('.p_Balance').css('color', 'green');
        $('#hdnPaidAmount').val(payableamount);
        $('#hdnDiscount').val(Discount);
        $('#hdnBalance').val(balance)
    }
    else if (PaymentTypeID == "6") {
        console.log("PaymentType:", "Pay Now");
        DiscountOffer = 0;
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
        $('#hdnBalance').val(balance)
    }
    else if (PaymentTypeID == "7") {
        DiscountOffer = 0;
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
        $('#hdnBalance').val(balance)
    }
}

function AreaRegistration(AreaName) {
    return GAreaID
}

function compareDates(d1, d2) {
    return d1 > d2
}

function ShowFareDetails(FromPalce, ToPlace, TravelTime, ExtKmFare, TollParking, VehicleType, Rate, ACType) {
    var TripDate = $('#pickupdatepicker').val(),
        TripTime = $('#pickuptimepicker').val();
    $('.FD_FromPalceToPlace').html(FromPalceToPlace);
    $('.FD_VehicleType').html(VehicleType);
    $('.FD_Rate').html(Rate);
    $('.FD_PickupDate').html(TripDate);
    $('.FD_PickupTime').html(TripTime);
    var TripsTerms = "<li> Vehicle Type : " + VehicleType + " " + ACType + " , Min KM Rate: ₹" + Rate + "</li>"
    TripsTerms += "<li>" + TravelTime + "</li>"
    TripsTerms += "<li>" + ExtKmFare + "</li>"
    TripsTerms += "<li>" + TollParking + "</li>"
    $('.TripsTerms').html(TripsTerms);
    $('#FD_FareModal').modal('show')
}

function getCategorybyIDDisplay(CategoryID) {
    ;
    console.log(CategoryID);
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
    } else if (CategoryID == 6) {
        return 'Mini Bus';
    }else if (CategoryID == 7) {
        return 'Toyota Innova Crysta (7+1)';
    }    
}

function getCategorybyID(CategoryID) {
    ;
    console.log(CategoryID);
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
    } else if (CategoryID == 6) {
        return 'Mini Bus';
    }else if (CategoryID == 7) {
        return 'Toyota Innova Crysta';
    }
}