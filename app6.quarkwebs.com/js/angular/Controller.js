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
        var marker,i,infowindow = new google.maps.InfoWindow();
        for (var i = 0; i < result.length; i++) {
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(result[i].latitude, result[i].longitude),
                map: map,
                title: result[i].address
            });

            google.maps.event.addListener(marker, 'click', (function (marker, i) {
                return function () {
                    infowindow.setContent(result[i].truck_number);
                    infowindow.open(map, marker);
                }
            })(marker, i));
        };
    });
   
});

