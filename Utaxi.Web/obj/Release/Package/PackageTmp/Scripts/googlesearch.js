var BlokedAreaList = []; $(document).ready(function () { ServiceBlockAreaList() }); function ServiceBlockAreaList() { debugger; var loadServiceBlockAreaListURL = $('#hdnWebApiURL').val() + "D_ServiceBlokedAreaList"; $.ajax({ type: "POST", url: loadServiceBlockAreaListURL, data: {}, contentType: "application/json; charset=utf-8", dataType: "json", success: function (data) { BlokedAreaList.push(data.BlockedAreaList) }, failure: function () { console.log(result) } }) }
function LoadGoogleMAP() {
    var markers = []; var map = new google.maps.Map(document.getElementById('divloadMap'), { mapTypeId: google.maps.MapTypeId.ROADMAP }); var defaultBounds = new google.maps.LatLngBounds(new google.maps.LatLng(12.988709, 77.588491), new google.maps.LatLng(12.988709, 77.588491)); map.fitBounds(defaultBounds); var input = (document.getElementById('pickupPlaceSearch')); var inputdropPlace = (document.getElementById('dropPlaceSearch')); var searchBox = new google.maps.places.SearchBox((input)); var searchBoxdropPlace = new google.maps.places.SearchBox((inputdropPlace)); debugger; google.maps.event.addListener(searchBox, 'places_changed', function () {
        debugger; var places = searchBox.getPlaces(); if (places.length == 0) { return }
        for (var i = 0, marker; marker = markers[i]; i++) { marker.setMap(null) }
        $('#pickupPlace').show().html($('#pickupPlaceSearch').val()); $('#pickupPlaceSearch').hide(); $('#divAvailableRides').hide(); debugger; var ServiceAvailable = CheckServiceAvailability($('#hdnServiceNameID').val(), $('#pickupPlaceSearch').val()); if (ServiceAvailable == !0) { $('.E_FromPlace').html('') }
        else { $('.E_FromPlace').html('Service is not avilable for ' + $('#pickupPlaceSearch').val()); $('.E_FromPlace').css('color', 'red'); $('#pickupPlaceSearch').val('') }
    }); google.maps.event.addListener(searchBoxdropPlace, 'places_changed', function () {
        debugger; var places = searchBoxdropPlace.getPlaces(); if (places.length == 0) { return }
        for (var i = 0, marker; marker = markers[i]; i++) { marker.setMap(null) }
        $('#dropPlace').show().html($('#dropPlaceSearch').val()); $('#dropPlaceSearch').hide(); $('#divAvailableRides').hide(); var ServiceAvailable = CheckServiceAvailability($('#hdnServiceNameID').val(), $('#dropPlaceSearch').val()); if (ServiceAvailable == !0) { $('.E_ToPlace').html('') }
        else { $('.E_ToPlace').html('Service is not avilable for ' + $('#dropPlaceSearch').val()); $('.E_ToPlace').css('color', 'red'); $('#dropPlaceSearch').val('') }
    }); google.maps.event.addListener(map, 'bounds_changed', function () { debugger; var bounds = map.getBounds(); searchBoxdropPlace.setBounds(bounds) }); google.maps.event.addListener(map, 'bounds_changed', function () { debugger; var bounds = map.getBounds(); searchBox.setBounds(bounds) })
}
google.maps.event.addDomListener(window, 'load', LoadGoogleMAP); function CheckServiceAvailability(ServiceTypeID, PlaceName) {
    debugger; var Status = !0; if (ServiceTypeID == "1") { if (BlokedAreaList.length > 0) { var Place = BlokedAreaList[0]; for (var j = 0; j < Place.length; j++) { if (Place[j].AreaName == PlaceName) { Status = !1; j = Place.length } } } }
    return Status
}