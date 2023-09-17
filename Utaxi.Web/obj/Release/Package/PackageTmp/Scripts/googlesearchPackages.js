//creating function to load initial MAP when page loading   
function LoadGoogleMAP() {
    debugger;

    var markers = [];
    var map = new google.maps.Map(document.getElementById('divloadMap'), {
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var defaultBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(12.988709, 77.588491),
      new google.maps.LatLng(12.988709, 77.588491));
    map.fitBounds(defaultBounds);

    // Create the search box and link it to the UI element.  
    var input = (document.getElementById('pickupPlaceSearch'));
    //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    var inputdropPlace = (document.getElementById('dropPlaceSearch'));
    //map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputdropPlace);

    var searchBox = new google.maps.places.SearchBox((input));
    var searchBoxdropPlace = new google.maps.places.SearchBox((inputdropPlace));
    debugger;

    // Listen for the event fired when the user selects an item from the  
    // pick list. Retrieve the matching places for that item.  
    google.maps.event.addListener(searchBox, 'places_changed', function () {
        debugger;
        var places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }
        for (var i = 0, marker; marker = markers[i]; i++) {
            marker.setMap(null);
        }

        $('#pickupPlace').show().html($('#pickupPlaceSearch').val());
        $('#pickupPlaceSearch').hide();

        $('#divAvailableRides').hide();
        debugger;
        var ServiceAvailable = CheckServiceAvailability($('#hdnServiceNameID').val(), $('#pickupPlaceSearch').val());
        if (ServiceAvailable == true) {
            $('.E_FromPlace').html('');
        }
        else {
            $('.E_FromPlace').html('Service is not avilable for ' + $('#pickupPlaceSearch').val());
            $('.E_FromPlace').css('color', 'red');
            $('#pickupPlaceSearch').val('');
        }
    });

    google.maps.event.addListener(searchBoxdropPlace, 'places_changed', function () {
        debugger;
        var places = searchBoxdropPlace.getPlaces();

        if (places.length == 0) {
            return;
        }
        for (var i = 0, marker; marker = markers[i]; i++) {
            marker.setMap(null);
        }
        $('#dropPlace').show().html($('#dropPlaceSearch').val());
        $('#dropPlaceSearch').hide();

        $('#divAvailableRides').hide();

        var ServiceAvailable = CheckServiceAvailability($('#hdnServiceNameID').val(), $('#dropPlaceSearch').val());
        if (ServiceAvailable == true) {
            $('.E_ToPlace').html('');
        }
        else {
            $('.E_ToPlace').html('Service is not avilable for ' + $('#dropPlaceSearch').val());
            $('.E_ToPlace').css('color', 'red');
            $('#dropPlaceSearch').val('');
        }
    });

    // current map's viewport.  
    google.maps.event.addListener(map, 'bounds_changed', function () {
        debugger;
        var bounds = map.getBounds();
        searchBoxdropPlace.setBounds(bounds);
    });

    // current map's viewport.  
    google.maps.event.addListener(map, 'bounds_changed', function () {
        debugger;
        var bounds = map.getBounds();
        searchBox.setBounds(bounds);
    });
}

google.maps.event.addDomListener(window, 'load', LoadGoogleMAP);




function CheckServiceAvailability(ServiceTypeID, PlaceName) {
    debugger;
    var Status = true;
    if (ServiceTypeID == "1") {
        if (PlaceName == "KIAL, Gangamuthanahalli, Karnataka, India" ||
            PlaceName == "BIAL Hub, Bengaluru, Karnataka, India" ||
            PlaceName == "Kempegowda International Airport (BLR), KIAL Road, Devanahalli, Bengaluru, Karnataka, India" ||
            PlaceName == "Kempegowda International Airport Road, Hunachur, Karnataka, India" ||
            PlaceName == "Kempegowda International Airport (BLR), BIAL P2 Toll Booth, Bengaluru International Airport, Gangamuthanahalli, Karnataka, India" ||
            PlaceName == "Kempegowda International Airport Road, Hunachur, Karnataka, India" ||
            PlaceName == "Kempegowda International Airport (BLR), KIAL Road, Devanahalli, Bengaluru, Karnataka" ||
            PlaceName == "Kempegowda International Airport (BLR), Gangamuthanahalli, Karnataka" ||
            PlaceName == "Kempegowda International Airport, Bengaluru International Airport, Gangamuthanahalli, Karnataka" ||
            PlaceName == "Kempegowda International Airport Road, Hunachur, Karnataka" ||
            PlaceName == "Kempegowda International Airport Police Station, Hunachur, Karnataka" ||
            // PlaceName == "" ||
            PlaceName == "KIAL Parking 3, Gangamuthanahalli, Karnataka" ||
            PlaceName == "Jiva Spa at Taj Bangalore, Near Kempegowda International Airport, Devanahalli, Bengaluru, Karnataka 560300" ||
            PlaceName == "Devanahalli International Airport" ||
            PlaceName == "Taj KIAL, Gangamuthanahalli, Karnataka" ||
            PlaceName == "KIAL Duty Free Store, Bengaluru International Airport, Gangamuthanahalli, Karnataka 562300" ||
            PlaceName == "KIAL Parking 3, Gangamuthanahalli, Karnataka 560300" ||
            PlaceName == "International Airport Bus Stop, Bengaluru, 560009, Kempegowda, Majestic, Bengaluru, Karnataka 560009" ||
            PlaceName == "Kempegowda International" ||
            PlaceName == "Kempegowda International Airport, KIAL Rd, Devanahalli, Bengaluru, Karnataka 560300" ||
            PlaceName == "Kempegowda International Airport, KIAL Rd, Devanahalli, Bengaluru, Karnataka 560300" ||
            PlaceName == "Kempegowda Int'l Airport Rd, Hunachur, Karnataka" ||
            PlaceName == "Kempegowda International Airport, Bengaluru International Airport, Gangamuthanahalli, Karnataka 562300" ||
            PlaceName == "Kempegowda International Airport (BLR), ವಿಮಾನ ನಿಲ್ದಾಣ ರಸ್ತೆ, Gangamuthanahalli, Karnataka 560300" ||
            PlaceName == "Kempegowda International Airport Police Station, Kempegowda International Airport, Hunachur, Karnataka 560300" ||
             PlaceName == "Kempegowda International Airport, KIAL Rd, Devanahalli, Bengaluru, Karnataka 560300" ||
            // PlaceName == "" || 
            PlaceName == "BIAL P2 Toll Booth, Bengaluru International Airport, Gangamuthanahalli, Karnataka, India") {
            Status = false;
        }
    }
    return Status;
}