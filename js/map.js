var i = 0;
var gap = 10;
function drawLines() {
	updateCanvas($(".blk"), null);
	createMenu();
	makeDraggable();
	$("#info").draggable({
		containment: '#mapDiv'
	});
}

function updateCanvas(blkEls, dragObj) {
	$(blkEls).each( function() {
		var divId = $(this).attr("id");
		$("li", this).each( function() {
			var li = $(this);
			if (li.attr("rel")) {
				var linkCount = 0;
				var srcOffset = li.offset();
				var srcMidHeight = li.height() / 2;
				var srcMidWidth = li.width() / 2;
				if (li.attr("rel").indexOf(',') != -1) {
					var temp = new Array();
					var tempColor = new Array();
					var linkNames = new Array();
					temp = li.attr("rel").split(',');
					linkNames = li.attr("name").split(',');
					linkLabels = li.attr("label").split(',');
					tempColor = li.attr("color").split(',');
					for ( var index = 0; index < temp.length; index = index + 1) {
						// alert(linkCount);
						var targetLi = $("#"+ temp[index]);
						var target = temp[index];
						var lineColor = tempColor[index];
						if (target.indexOf('*') != -1) {
							var repeatLink = new Array();
							repeatLink = target.split('*');
							var w = 0;
								if (dragObj != null && ((repeatLink[0] != dragObj && divId != dragObj))) {
									for ( var index1 = 0; index1 < repeatLink[1]; index1 = index1 + 1) {
										linkCount++;
									}
									continue;
								}
								targetLi = $("#"+ repeatLink[0]);
								var noOfLinks = repeatLink[1];
								var targetOffset = targetLi.offset();
								var targetMidHeight = targetLi.height() / 2;
								var targetMidWidth = targetLi.width() / 2;
								var srcX = srcOffset.left + srcMidWidth;
								var srcY = srcOffset.top + srcMidHeight;
								var targetX = targetOffset.left + targetMidWidth;
								var targetY = targetOffset.top + targetMidHeight;
								for ( var index1 = 0; index1 < repeatLink[1]; index1 = index1 + 1) {
									if (targetLi.length) {
										if (((srcX > targetX) && (srcY > targetY)) || ((srcX < targetX) && (srcY < targetY))) {
											if(index1 == 0) {
												var x = srcX - ((srcMidWidth / noOfLinks) * (noOfLinks/2)) - gap;
												var y = srcY + ((srcMidWidth / noOfLinks) * (noOfLinks/2)) ;
												var x1 = targetX - ((targetMidWidth / noOfLinks) * (noOfLinks/2)) - gap;
												var y1 = targetY + ((targetMidWidth / noOfLinks) * (noOfLinks/2)) - w;
											} else {
												var x = x + w;
												var y = y - w;
												var x1 = x1 + w;
												var y1 = y1 - w;
											}
											w = (srcMidWidth / noOfLinks) + 10/noOfLinks;
											createLine(x, y, x1, y1, tempColor[linkCount], linkNames[linkCount], linkLabels[linkCount]);
										} else if (((srcX > targetX) && (srcY < targetY)) || ((srcX < targetX) && (srcY > targetY))) {
											var x = srcX - srcMidWidth/ noOfLinks+ w;
											var y = srcY - srcMidHeight / noOfLinks + w;
											var x1 = targetX - targetMidWidth / noOfLinks + w;
											var y1 = targetY - targetMidHeight / noOfLinks + w;
											w += (srcMidWidth / noOfLinks) * 2;
											createLine(x, y, x1, y1, tempColor[linkCount], linkNames[linkCount], linkLabels[linkCount]);
										} else if (srcX == targetX && (srcY > targetY || srcY < targetY)) {
											var x = srcX - srcMidWidth / noOfLinks + w;
											var y = srcY + srcMidHeight / noOfLinks;
											var x1 = targetX - targetMidWidth / noOfLinks - w;
											var y1 = targetY + targetMidHeight / noOfLinks;
											w += (srcMidWidth / noOfLinks) * 2;
											createLine(x, y, x1, y1, tempColor[linkCount], linkNames[linkCount], linkLabels[linkCount]);
										} else if (srcY == targetY && (srcX > targetX || srcX < targetX)) {
											var x = srcX + srcMidWidth / noOfLinks;
											var y = srcY - srcMidHeight / noOfLinks + w;
											var x1 = targetX + targetMidWidth / noOfLinks;
											var y1 = targetY - targetMidHeight / noOfLinks + w;
											w += (srcMidWidth / noOfLinks) * 2;
											createLine(x, y, x1, y1, tempColor[linkCount], linkNames[linkCount], linkLabels[linkCount]);
										} else {
											var x = srcOffset.left + srcMidWidth + w;
											var y = srcOffset.top + (srcMidHeight) + w;
											var x1 = targetOffset.left + targetMidWidth + w;
											var y1 = targetOffset.top + targetMidHeight + w;
											createLine(x, y, x1, y1, tempColor[linkCount], linkNames[linkCount], linkLabels[linkCount]);
											w += 2;
										}
									}
									linkCount++;
								}
							} else {
								if (targetLi.length) {
									if (dragObj != null && (temp[index] != dragObj && divId != dragObj)) {
										linkCount++;
										continue;
									} else {
										var trgOffset = targetLi.offset();
										var targetMidHeight = targetLi.height() / 2;
										var targetMidWidth = targetLi.width() / 2;
										var x = srcOffset.left + srcMidWidth;
										var y = srcOffset.top + srcMidHeight;
										var x1 = trgOffset.left + targetMidWidth;
										var y1 = trgOffset.top + targetMidHeight;
										createLine(x, y, x1, y1, tempColor[linkCount], linkNames[linkCount], linkLabels[linkCount]);
										linkCount++;
									}
								}
							}
						}
					} else {
						var targetLi = $("#" + li.attr("rel"));
						var target = li.attr("rel");
						var linkName = li.attr("name");
						var linkLabel = li.attr("label");
						var lineColor = li.attr("color");
						if (target.indexOf('*') != -1) {
							var linkCount = 0;
							var repeatLink = new Array();
							var linkNames = new Array();
							var linkLabels = new Array();
							var tempColor = new Array();
							repeatLink = target.split('*');
							linkNames = linkName.split(',');
							linkLabels = linkLabel.split(',');
							tempColor = li.attr("color").split(',');
							var w = 0;
							targetLi = $("#" + repeatLink[0]);
							var noOfLinks = repeatLink[1];
							if (dragObj != null && (repeatLink[0] != dragObj && divId != dragObj)) {
								for ( var index1 = 0; index1 < repeatLink[1]; index1 = index1 + 1) {
									linkCount++;
								}
							} else {
								var targetOffset = targetLi.offset();
								var targetMidHeight = targetLi.height() / 2;
								var targetMidWidth = targetLi.width() / 2;
								var srcX = srcOffset.left + srcMidWidth;
								var srcY = srcOffset.top + srcMidHeight;
								var targetX = targetOffset.left + targetMidWidth;
								var targetY = targetOffset.top + targetMidHeight;
								for (index1 = 0; index1 < repeatLink[1]; index1 = index1 + 1) {
									if (targetLi.length) {
										if (((srcX > targetX) && (srcY > targetY)) || ((srcX < targetX) && (srcY < targetY))) {
											if(index1 == 0) {
												var x = srcX - ((srcMidWidth / noOfLinks) * (noOfLinks/2)) - gap;
												var y = srcY + ((srcMidWidth / noOfLinks) * (noOfLinks/2)) ;
												var x1 = targetX - ((targetMidWidth / noOfLinks) * (noOfLinks/2)) - gap;
												var y1 = targetY + ((targetMidWidth / noOfLinks) * (noOfLinks/2));
											} else {
												var x = x + w;
												var y = y - w;
												var x1 = x1 + w;
												var y1 = y1 - w;
											}
											w = (srcMidWidth / noOfLinks) + gap/noOfLinks;
											createLine(x, y, x1, y1, tempColor[linkCount], linkNames[linkCount], linkLabels[linkCount]);
										} else if (((srcX > targetX) && (srcY < targetY)) || ((srcX < targetX) && (srcY > targetY))) {
											if(index1 == 0) {
												var x = srcX - ((srcMidWidth / noOfLinks) * (noOfLinks/2)) - gap
												var y = srcY - ((srcMidWidth / noOfLinks) * (noOfLinks/2));
												var x1 = targetX  - ((targetMidWidth / noOfLinks) * (noOfLinks/2)) - gap;
												var y1 = targetY - ((targetMidWidth / noOfLinks) * (noOfLinks/2));	
											} else {
												var x = x + w;
												var y = y + w;
												var x1 = x1 + w;
												var y1 = y1 + w;
											}
											w = (srcMidWidth / noOfLinks) + gap/noOfLinks;
											createLine(x, y, x1, y1, tempColor[linkCount], linkNames[linkCount], linkLabels[linkCount]);
										} else if (srcX == targetX && (srcY > targetY || srcY < targetY)) {
											if(index1 == 0) {
												var x = srcX - srcMidWidth;
												var y = srcY;
												var x1 = targetX - targetMidWidth;
												var y1 = targetY;	
											} else {
												var x = x + w;
												var x1 = x1 + w;
											}
											w = (srcMidWidth / noOfLinks) + srcMidWidth/noOfLinks;
											createLine(x, y, x1, y1, tempColor[linkCount], linkNames[linkCount], linkLabels[linkCount]);
										} else if (srcY == targetY && (srcX > targetX || srcX < targetX)) {
											if(index1 == 0) {
												var x = srcX;
												var y = srcY - srcMidHeight;
												var x1 = targetX ;
												var y1 = targetY - targetMidHeight;	
											} else {
												var y = y + w;
												var y1 = y1 + w;
											}
											w = (srcMidHeight/ noOfLinks) + srcMidHeight/noOfLinks;
											createLine(x, y, x1, y1, tempColor[linkCount], linkNames[linkCount], linkLabels[linkCount]);
										} else {
											var x = srcOffset.left + srcMidWidth + w;
											var y = srcOffset.top + (srcMidHeight) + w;
											var x1 = targetOffset.left + targetMidWidth + w;
											var y1 = targetOffset.top + targetMidHeight + w;
											createLine(x, y, x1, y1, tempColor[linkCount], linkNames[linkCount], linkLabels[linkCount]);
											w += 2;
										}
									}
									linkCount++;
								}
							}
						} else {
							if (targetLi.length) {
								var trgOffset = targetLi.offset();
								var targetMidHeight = targetLi.height() / 2;
								var targetMidWidth = targetLi.width() / 2;
								var x = srcOffset.left + srcMidWidth;
								var y = srcOffset.top + srcMidHeight;
								var x1 = trgOffset.left + targetMidWidth;
								var y1 = trgOffset.top + targetMidHeight;
								createLine(x, y, x1, y1, lineColor, linkName, linkLabel);
							}
						}
					}
			}
		});
	});
}

String.prototype.startsWith = function(str) {
	return (this.indexOf(str) === 0);
};

function reDrawMap() {
	clearLines();
	updateCanvas($(".blk"), null);
	createMenu();
	$(".blk").draggable("destroy");
}

function makeDraggable() {
	var innerDivs = $("div[class^='blk']");
	for ( var i = 0; i < innerDivs.length; i++) {
		$("#" + innerDivs[i].id).draggable({
			stop : function(event, ui) {
				var position = $(this).position();
				updateLines($(this).attr("id"));
				createMenu();
			}
		});
	}
}

Array.prototype.contains = function(element) {
	for ( var i = 0; i < this.length; i++) {
		if (this[i] == element) {
			return true;
		}
	}
	return false;
};

function updateLines(dragObj) {
	var srcList = $("div[src='" + dragObj + "']");
	var destList = $("div[dest='" + dragObj + "']");
	var srcLength = srcList.length;
	var destLength = destList.length;
	var updateList = new Array();
	var index = 0;

	for ( var i = 0; i < srcLength; i++) {
		var id = srcList[i].id;
		if ($("#" + id).attr("src") == dragObj) {
			if (!updateList.contains($("#" + id).attr("dest"))) {
				updateList[index] = $("#" + id).attr("dest");
			}
			index++;
			$("#" + id).remove();
		}
	}
	for ( var i = 0; i < destLength; i++) {
		var id = destList[i].id;
		if ($("#" + id).attr("dest") == dragObj) {
			if (!updateList.contains($("#" + id).attr("src"))) {
				updateList[index] = $("#" + id).attr("src");
			}
			index++;
			$("#" + id).remove();
		}
	}
	updateCanvas($("#" + dragObj), dragObj);
	for ( var i = 0; i < updateList.length; i++) {
		if (updateList[i] != undefined) {
			updateCanvas($("#" + updateList[i]), dragObj);
		}
	}

}

function createLine(x1, y1, x2, y2, color, linkName, linkLabel) {
	var length = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
	var angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
	var id = linkName;
	if(id != undefined) {
		id = id.replace(/\./g, "_");
		id = id.replace(/\//g, "_");
		id = id.replace(/\=/g, "_");
		var ids = new Array();
		var src = id.split("-")[0];
		var dest = id.split("-")[1];
	}
	
	var transform = 'rotate(' + angle + 'deg)';
	var line = jQuery('<div/>', {
		id : id,
		name : linkName,
		src : src,
		dest : dest,
		onmouseover : "Tip('" + linkLabel + "')",
		onMouseOut : "UnTip()",
		class : 'line'
	}).appendTo('#mapDiv').css({
		'position' : 'absolute',
		'-webkit-transform' : transform,
		'-moz-transform' : transform,
		'transform' : transform,
		'backgroundColor' : color
	}).width(length).offset({
		left : x1,
		top : y1
	});
	return line;
}

function clearLines() {
	$('.line').remove();
}

function resizeCanvas() {
	if (document.getElementById("mapDiv")) {
		var dimension = [ document.documentElement.clientWidth, document.documentElement.clientHeight ];
		var c = document.getElementById("mapDiv");
		c.width = dimension[0];
		c.height = dimension[1];
		reDrawMap();
	}
	if (document.getElementById("panel")) {
		var panel = document.getElementById("panel");
		panel.width = dimension[0];
	}
}

$(window).resize(function() {
	resizeCanvas();
});

function createMenu() {
	var divList = $("div[type^='router']");
	for ( var i = 0; i < divList.length; i++) {
		$("#" + divList[i].id).contextMenu({
			menu : 'routerMenu'
		}, function(action, el, pos) {
			var name = $(el).attr('name');
			if (action == 'displayProperties') {
				alert("You clicked on Device Info");
			}
		});
	}
}

function viewMapSource() {
	$("#viewSource").dialog({
		autoOpen : true,
		width : $(window).width()*0.9,
		height : $(window).height()*0.8,
		resizable : true,
		draggable : false,
		closeOnEscape : true,
		modal: true
	});
}

function corner() {
	$("#explanationhighlighter").corner("30px");
}