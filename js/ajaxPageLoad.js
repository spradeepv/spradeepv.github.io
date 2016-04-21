var prevLink;
var presentLink;
var bustcachevar = 0;
/* bust potential caching of external pages after initial request? (1=yes, 0=no) */
var loadedobjects = "";
var rootdomain = "http://" + window.location.hostname;
var bustcacheparameter = "";

function ajaxPage(url, containerid) {
	var page_request = false;
	/* if Mozilla, Safari etc */
	if (window.XMLHttpRequest) {
		page_request = new XMLHttpRequest();
	}
	/* if IE */
	else if (window.ActiveXObject) {
		try {
			page_request = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				page_request = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {
			}
		}
	} else
		return false
	page_request.onreadystatechange = function() {
		loadpage(page_request, containerid, url);
	}
	/* if bust caching of external page */
	if (bustcachevar) {
		bustcacheparameter = (url.indexOf("?") != -1) ? "&"
				+ new Date().getTime() : "?" + new Date().getTime();
	}
	page_request.open('GET', url + bustcacheparameter, true);
	page_request.send(null);
}

function loadpage(page_request, containerid, url) {
	if (page_request.readyState == 4
			&& (page_request.status == 200 || window.location.href
					.indexOf("http") == -1)) {
		if (prevLink == undefined) {
			prevLink = url;
		} else {
			prevLink = presentLink;
		}
		presentLink = url;
		removeDialog(url);

		document.getElementById(containerid).innerHTML = "";
		document.getElementById(containerid).innerHTML = page_request.responseText
		if (presentLink != prevLink) {
			removeDialog(prevLink);
		}
		if (url == 'drag_drop.htm') {
			$('div.ui-dialog').remove();
			$("#tabs").tabs().bind('tabsshow', function(event, ui) {
				var selectedTab = $("#tabs").tabs("option", "selected");
				clearLines();
				drawLines();
			});
			clearLines();
			drawLines();
		} else if (url == 'jqGridHowTo.htm') {
		 	createDialog('jqGridHowTo', 'jqGridHowToDialog');
			createGrid();
		} else if (url == 'jqGrid.htm') {
			createDialog('jqGrid', 'jqGridDialog');
			createGrid();
		} else if (url == 'jqSubGrid.htm') {
			createDialog('jqSubGrid', 'jqSubGridDialog');
			createSubGrid();
		} else if (url == 'barChart.htm') {
			createDialog('barChart', 'barChartDialog');
			drawBarChart();
		} else if (url == 'columnChart.htm') {
			createDialog('columnChart', 'columnChartDialog');
			drawColumnChart();
		} else if (url == 'pieChart.htm') {
			createDialog('pieChart', 'pieChartDialog');
			drawPieChart();
		} else if (url == 'lineChart.htm') {
			createDialog('lineChart', 'lineChartDialog');
			drawLineChart();
		} else if (url == 'dynamicChart.htm') {
			createDialog('dynamicChart', 'dynamicChartDialog');
			drawDynamicChart();
		} else if (url == 'comboChart.htm') {
			createDialog('comboChart', 'comboChartDialog');
			drawComboChart();
		} else if (url == 'highcharts.htm') {
			createDialog('highcharts', 'highchartsDialog');
		} else if (url == 'highchartsHowTo.htm') {
			createDialog('highchartsHowTo', 'highchartsHowToDialog');
		} else if(url == 'googleViewStart.htm') {
			createDialog('googleViewStart', 'googleViewStartDialog');
		} else if(url == 'googleView.htm') {
			createDialog('googleView', 'googleViewDialog');
			drawGoogleMap();
		} else if(url == 'googleRoutesHowTo.htm') {
			createDialog('googleRoutesHowTo', 'googleRoutesHowToDialog');
		} else if(url == 'arbor.htm') {
			createDialog('arbor', 'arborDialog');
			drawArborMap();
		} else if(url == 'springy.htm') {
			createDialog('springy', 'springyDialog');
			drawSpringyMap();
		} 
	}
}

function loadobjs() {
	if (!document.getElementById) {
		return

	}

	for (i = 0; i < arguments.length; i++) {
		var file = arguments[i]
		var fileref = "";
		/*
		 * Check to see if this object has not already been added to page before
		 * proceeding
		 */
		if (loadedobjects.indexOf(file) == -1) {
			/* If object is a js file */
			if (file.indexOf(".js") != -1) {
				fileref = document.createElement('script')
				fileref.setAttribute("type", "text/javascript");
				fileref.setAttribute("src", file);
			}
			/* If object is a css */
			else if (file.indexOf(".css") != -1) {
				fileref = document.createElement("link")
				fileref.setAttribute("rel", "stylesheet");
				fileref.setAttribute("type", "text/css");
				fileref.setAttribute("href", file);
			}
		}
		if (fileref != "") {
			document.getElementsByTagName("head").item(0).appendChild(fileref)
			/* Remember this object as being already added to page */
			loadedobjects += file + " ";
		}
	}
}

function createDialog(container, id) {
	var wWidth = $("#" + container).width();
	var wHeight = $("#" + container).height();
	var x = $("#" + container).offset().left;
	var y = $("#" + container).offset().top;
	$("#" + id).dialog({
		autoOpen : false,
		width : wWidth,
		height : wHeight,
		position : [ x, y ],
		resizable : false,
		draggable : false,
		closeOnEscape : false,
		open : function(event, ui) {
			$(".ui-dialog-titlebar-close").hide();
		}
	});
	$("#" + id).dialog("open");
}

function removeDialog(url) {
	$('div#' + url.split('.')[0] + "Dialog").remove();
}

function zoomIn(id) {
	$('#' + id).dialog({
		autoOpen : true,
		closeOnEscape : true,
		width: 'auto',
		modal: true,
	});
}

function zoomOut(id) {
	$('#'+id).mouseout(function() {
		$(this).animate({
			width : "200px",
			height : "100px"
		}, 'fast');
	});
}

function viewSource(id) {
	$('#' + id).dialog({
		autoOpen : true,
		closeOnEscape : true,
		width: 800,
		modal: true,
		height: 600,
		title: id
	});
}

function openDialog(url) {
	var dialog = $('<div style="display:none"></div>').appendTo('body');
	dialog.load(url).dialog({
		modal:true,
		width: 800,
		height: 600,
		close : function(event, ui) {
			dialog.remove();
		}
	});
}

function viewCookies() {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
       	alert(cookie);
    }
}
