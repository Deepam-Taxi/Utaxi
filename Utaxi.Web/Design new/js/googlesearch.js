function LoadGoogleMAP() {
    debugger;

    var markers = [];
    var map = new google.maps.Map(document.getElementById('divloadMap'),
    {
        mapTypeId: google.maps.MapTypeId.ROADMAP
        });

    var defaultBounds = new google.maps.LatLngBounds(new google.maps.LatLng(12.988709, 77.588491), new google.maps.LatLng(12.988709, 77.588491));
    map.fitBounds(defaultBounds);

    var inputPickupPlace = (document.getElementById('pickupPlaceSearch'));
    var searchBoxpickupPlace = new google.maps.places.SearchBox((inputPickupPlace));

    google.maps.event.addListener(searchBoxpickupPlace, 'places_changed', function () {

        var places = searchBoxpickupPlace.getPlaces();
        if (places.length == 0) {
            return
        }
        for (var i = 0, marker; marker = markers[i]; i++) {
            marker.setMap(null)
        }
    });

    google.maps.event.addListener(map, 'bounds_changed', function () {

        var bounds = map.getBounds();
        searchBoxpickupPlace.setBounds(bounds)
    })

    var inputdropPlace = (document.getElementById('dropPlaceSearch'));
    var searchBoxdropPlace = new google.maps.places.SearchBox((inputdropPlace));

    google.maps.event.addListener(searchBoxdropPlace, 'places_changed', function () {

        var places = searchBoxdropPlace.getPlaces();
        if (places.length == 0) {
            return
        }
        for (var i = 0, marker; marker = markers[i]; i++) {
            marker.setMap(null)
        }
    });

    google.maps.event.addListener(map, 'bounds_changed', function () {

        var bounds = map.getBounds();
        searchBoxdropPlace.setBounds(bounds)
    });



    var inputPickupPlaceEdit = (document.getElementById('pickupPlaceSearchEdit'));
    var searchBoxpickupPlaceEdit = new google.maps.places.SearchBox((inputPickupPlaceEdit));

    google.maps.event.addListener(searchBoxpickupPlaceEdit, 'places_changed', function () {

        var places = searchBoxpickupPlaceEdit.getPlaces();
        if (places.length == 0) {
            return
        }
        for (var i = 0, marker; marker = markers[i]; i++) {
            marker.setMap(null)
        }
    });

    google.maps.event.addListener(map, 'bounds_changed', function () {

        var bounds = map.getBounds();
        searchBoxpickupPlaceEdit.setBounds(bounds)
    })

    var inputdropPlaceEdit = (document.getElementById('dropPlaceSearchEdit'));
    var searchBoxdropPlaceEdit = new google.maps.places.SearchBox((inputdropPlaceEdit));

    google.maps.event.addListener(searchBoxdropPlaceEdit, 'places_changed', function () {

        var places = searchBoxdropPlaceEdit.getPlaces();
        if (places.length == 0) {
            return
        }
        for (var i = 0, marker; marker = markers[i]; i++) {
            marker.setMap(null)
        }
    });

    google.maps.event.addListener(map, 'bounds_changed', function () {

        var bounds = map.getBounds();
        searchBoxdropPlaceEdit.setBounds(bounds)
    });

}
google.maps.event.addDomListener(window, 'load', LoadGoogleMAP);