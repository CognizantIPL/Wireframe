'use strict';

aie.controller('AIETrucksController', function AIETrucksController($scope, $timeout, $log, AIEMobileServices) {
    google.maps.visualRefresh = true;

    var mapOptions = {
        zoom: 4,
        center: new google.maps.LatLng(41.5, -72.6),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map_canvas"),
      mapOptions);


    AIEMobileServices.getTrackingDataForAllTrucks().then(function (result) {
        for (var i = 0; i < result.length; i++) {
            var latLng = new google.maps.LatLng(result[i].latitude, result[i].longitude);
            var marker = new google.maps.Marker({
                map: map,
                position: latLng,
                title: 'AIE Truck',
                animation: google.maps.Animation.DROP
            });
            var infowindow = new google.maps.InfoWindow({
                content: result[i].truck_number
            });
            google.maps.event.addListener(marker, 'click', function () {
                infowindow.open(map, marker);
            });
        };
    });
   
});