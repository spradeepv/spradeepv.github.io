	var latLon;
    var map;
    var marker;
	var marker = [];

	function drawGoogleMap() 
	{
			var latlng = new google.maps.LatLng(23.725011735951796, 77.34375);
	    	var myOptions = {
	                zoom: 2,
	                center: latlng,
	                overviewMapControl: true,
	                overviewMapControlOptions: {    
	                        opened: true,
	                        position: google.maps.ControlPosition.LEFT_CENTER
	                },
	                mapTypeId: google.maps.MapTypeId.SATELLITE
	        };
	    	map = new google.maps.Map(document.getElementById("gmap"), myOptions);
	    	var point = '';
	    	var lat = getCookie("latitude");
	    	var long = getCookie("longitude");
	    	if(lat != undefined && long != undefined) {
	    		point = new google.maps.LatLng(lat, long);
	    	} else {
	    		point = new google.maps.LatLng(13.0011774, 80.25649569999996);	
	    	}
	    	var loc = getCookie("location");
	    	var location1 = "Adyar";
	    	if(loc != undefined) {
	    		location1 = loc;
	    	} 
			var rrname="192.168.9.209";
			var ipAddress="192.168.9.209";
			var iconName = "router_clear";
			var regionName = "Chennai";
			var status = "clear";
			var marker = new google.maps.Marker({
                position: point, 
                map: map,
                title: rrname+"\r\nLocation - "+location1+"\r\nRegion - Chennai",
                animation: google.maps.Animation.BOUNCE,
                icon: 'images/'+iconName+'_marker.png',
                zIndex: 1,
                visible: true
        	});
			setMessage(marker, rrname, location1, ipAddress, regionName, status);
	}
	
	function setMessage(marker, deviceName, location, ipAddress, regionName, status) {
		var statusStr = "";
		if(status == 'critical'){
			statusStr = "Critical";
		} else if(status == 'major'){
			statusStr = "Major";
		} else if(status == 'minor'){
			statusStr = "Minor";
		} else if(status == 'warning'){
			statusStr = "Warning";
		} else if(status == 'clear'){
			statusStr = "Clear";
		}
		var name = "'"+deviceName+"'";
		var msg = "";
		msg += "<table width=250 border=0 cellspacing=0 cellpadding=0>";
		msg += "<tr><td width='33%'>Router Name:</td><td class='text'><a href='#'>"+deviceName+"</a></td></tr>";
		msg += "<tr><td width='33%'>IP Address:&nbsp;</td><td class='text'>"+ipAddress+"</td></tr>";
		msg += "<tr><td width='33%'>Location:&nbsp;</td><td class='text'>"+location+"</td></tr>";
		msg += "<tr><td width='33%'>Status:&nbsp;</td><td class='text'><img src='images/severity_"+status+".gif'/>"+status+"</td></tr>";
		msg += "</table>";
        var infowindow = new google.maps.InfoWindow(
        {
                content: msg,
                size: new google.maps.Size(100,50)
        });
        google.maps.event.addListener(marker, 'click', function(){
                infowindow.open(map,marker);
        });
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
	
	function openEditLocation() {
		var w = 700;
		var h = 600;
		var left = (screen.width/2)-(w/2);
		var top = (screen.height/2)-(h/2);
		window.open('googleMapsEditLocation.htm','Edit Location','height='+h+',width='+w+',top='+top+',left='+left);
	}