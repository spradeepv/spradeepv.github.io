var latLon;
var gmap;
var point;
var marker;
var geocoder;

function loadMap() {
	var latlng = new google.maps.LatLng(23.725011735951796, 77.34375);
	var myOptions = {
		zoom : 2,
		center : latlng,
		overviewMapControl : true,
		overviewMapControlOptions : {
			opened : true,
			position : google.maps.ControlPosition.LEFT_CENTER
		},
		mapTypeId : google.maps.MapTypeId.SATELLITE
	};
	gmap = new google.maps.Map(document.getElementById("gmapEdit"), myOptions);
	geocoder = new google.maps.Geocoder();
	var loc = getCookie("location");
	var location = "Adyar";
	if(loc != undefined) {
		location = loc;
	} 
	document.getElementById("location1").value = location;
	if (location != undefined || location != '' || location != 'Unknown') {
		var lat = "13.0011774";
		if(getCookie("latitude") != undefined) {
			lat = getCookie("latitude");
		}
		var lng = "80.25";
		if(getCookie("longitude") != undefined) {
			lng = getCookie("longitude");
		}
		var latlng_marker = new google.maps.LatLng(lat, lng);
		marker = new google.maps.Marker({
			map : gmap,
			position : latlng_marker,
			animation: google.maps.Animation.BOUNCE
		});
		google.maps.event.addListener(marker, 'click', function() {
			this.setMap(null);
		});
	}
}

function showLocation() {
	var location1 = document.getElementById("location1").value;
	if (location1 == '') {
		alert("Please enter the location name...");
		return;
	}
	geocoder.geocode({'address' : location1}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			var point = results[0].geometry.location;
			var zoomLevel = 8;
			if (location1.indexOf(",") != -1) {
				zoomLevel = 17;
			}
			gmap.setCenter(point, zoomLevel);
			marker = new google.maps.Marker({
				map : gmap,
				position : point,
				animation: google.maps.Animation.BOUNCE
			});
			latLon = point;
			var infoDetails = "<table width='250' border=0 class='dbborder1' height='60' cellpadding='5'>";
			infoDetails += "<tr height='50' class='tableLightHeader'><td valign='middle'>Address</td><td align='center' valign='middle'>"
			+ location1 + "</td></tr>";
			infoDetails += "</table>";
			var infowindow = new google.maps.InfoWindow({
				content : infoDetails,
				size : new google.maps.Size(50, 50)
			});
			google.maps.event.addListener(marker, 'click', function() {
				this.setMap(null);
			});
		} else {
			alert("The given location  " + location1 + " is not found");
		}
	});
}

function checkAndSaveLocation() {
	location1 = trimAll(document.getElementById("location1").value);
	if (location1 == '') {
		alert("Please enter a valid location");
	} else {
		if (latLon) {
			document.getElementById("latitude").value = latLon.lat();
			document.getElementById("longitude").value = latLon.lng();
			setCookie("location",location1);
			//alert(latLon.lat()+","+latLon.lng());
			setCookie("latitude",latLon.lat());
			setCookie("longitude",latLon.lng());
			window.close();
		} else {
			alert("Please select the location on map ");
		}
	}
}

function trimAll(str) {
	if (str == null) {
		return "";
	}

	// check for all spaces
	var objRegExp = /^(\s*)$/;
	if (objRegExp.test(str)) {
		str = str.replace(objRegExp, '');
		if (str.length == 0)
			return str;
	}
	// check for leading and trailing spaces
	objRegExp = /^(\s*)([\W\w]*)(\b\s*$)/;
	if (objRegExp.test(str)) {
		str = str.replace(objRegExp, '$2');
	}
	return str;
}

function setCookie(c_name,value,exdays)
{
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires=0");
	document.cookie=c_name + "=" + c_value;
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;
}

function getCookie(c_name)
{
	var i,x,y,ARRcookies=document.cookie.split(";");
	for (i=0;i<ARRcookies.length;i++)
	{
		x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
		y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
		x=x.replace(/^\s+|\s+$/g,"");
		if (x==c_name)
		{
			return unescape(y);
		}
	}
}