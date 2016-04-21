var directionsDisplay;
var directionsService = new google.maps.DirectionsService();

function drawGoogleRoutes() 
{
	directionsDisplay = new google.maps.DirectionsRenderer();
	var latlng = new google.maps.LatLng(23.725011735951796, 77.34375);
	var myOptions = {
			center: latlng,
			zoom:7,
		    mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById("rmap"), myOptions);
	directionsDisplay.setMap(map);
	
	var control = document.getElementById('control');
    control.style.display = 'block';
    map.controls[google.maps.ControlPosition.RIGHT_TOP].push(control);
}

function calcRoute() {
	var start = document.getElementById("source").value;
	var end = document.getElementById("dest").value;
	var request = {
			origin:start,
			destination:end,
			travelMode: google.maps.TravelMode.DRIVING
	};
	
	directionsService.route(request, function(result, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			directionsDisplay.setDirections(result);
		}
	});
}

function openPopup(url, name) {
	var w = 700;
	var h = 600;
	var left = (screen.width/2)-(w/2);
	var top = (screen.height/2)-(h/2);
	window.open(url,name,'height='+h+',width='+w+',top='+top+',left='+left);
}