$(document).ready(function () {
    loadAirportRates();
});

function loadAirportRates() {

    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth() + 1; //Month from 0 to 11
    var y = date.getFullYear();
    var pickupDate = '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);

    let hours = date.getHours();
    let minutes = date.getMinutes();
    var pickuptime = hours + ":" + minutes + ":00";

    var fd = new FormData();
    fd.append('trip_type', $('#hdnServiceTypeID').val());
    fd.append('airport_pickup', $('#pickupPlaceSearch').val());
    fd.append('airport_dropoff', $('#dropPlaceSearch').val());
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

            $('.ratelistAirportTransfer').html('');

            $.each(obj.response, function () {

                var appendRateText = "<li class='list-group-item'><div class='row'><div class='col-md-2 col-6 d-none d-md-block'><img src='/Images/car-11-24.png' /></div>";
                appendRateText = appendRateText + "<div class='col-md-5 col-12 cabName'>" + getCategorybyIDDisplay(this.category_id) + "</div>";
                appendRateText = appendRateText + "<div class='col-md-2 col-6 cabName'>";

                var tooltipText = '';

                if (this.FxedRateAC_S == "0") {
                    appendRateText = appendRateText + "<button type='button' class='btn btn-success booking marginleft3px' disabled value='NA'>NA</button>";
                } else {
                    tooltipText = '<b>Min KM :</b> ' + this.min_per_day_km_ac + '<br /><b>Min KM Rate :</b> ' + this.min_amount_ac + '<br /><b>Extra KM Rate :</b> ' + this.extra_km_charge_ac;
                    appendRateText = appendRateText + "<label class='col-form-label DemoTooltipOffset btn btn-link' title='" + tooltipText + "'  onclick=redirectHomePage()><b>₹ " + this.final_price_ac + "</b></label>  </div>";
                    appendRateText = appendRateText + "<div class='col-md-3 col-6 cabName'><button type='button' class='btn btn-outline-primary booking1' onclick=redirectHomePage() value='" + this.final_price_ac + "'>Book Now</button>";
                }

                appendRateText = appendRateText + "</div></div></li>";

                $('.ratelistAirportTransfer').append(appendRateText);

                $('.DemoTooltipOffset').jBox('Tooltip', {
                    offset: {
                        x: 5,
                        y: -5
                    }
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
    } else if (CategoryID == 6) {
        return 'Mini Bus';
    } 
}

function redirectHomePage() {
    window.location.href = "/Home/Index";
}