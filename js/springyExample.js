var graph = new Graph();

var chn_nms_router1 = graph.newNode({label: '192.168.7.1'});
var chn_nms_router2 = graph.newNode({label: '192.168.7.2'});
var chn_nms_router3 = graph.newNode({label: '192.168.7.3'});
var chn_nms_router4 = graph.newNode({label: '192.168.7.4'});
var chn_nms_router5 = graph.newNode({label: '192.168.7.161'});
var chn_nms_router6 = graph.newNode({label: '192.168.8.1'});
var chn_nms_router7 = graph.newNode({label: '192.168.8.2'});
var chn_nms_router8 = graph.newNode({label: '192.168.8.3'});
var chn_nms_router9 = graph.newNode({label: '192.168.8.4'});

graph.newEdge(chn_nms_router1, chn_nms_router2, {color: '#00A0B0'});
graph.newEdge(chn_nms_router2, chn_nms_router3, {color: '#CC333F'});
graph.newEdge(chn_nms_router3, chn_nms_router4, {color: '#EB6841'});
graph.newEdge(chn_nms_router3, chn_nms_router5, {color: '#EDC951'});
graph.newEdge(chn_nms_router5,chn_nms_router3 , {color: '#EDC951'});

graph.newEdge(chn_nms_router6, chn_nms_router7, {color: '#7DBE3C'});
graph.newEdge(chn_nms_router7, chn_nms_router8, {color: '#00A0B0'});
graph.newEdge(chn_nms_router8, chn_nms_router9, {color: '#6A4A3C'});
graph.newEdge(chn_nms_router8, chn_nms_router5, {color: '#CC333F'});
graph.newEdge(chn_nms_router5, chn_nms_router8, {color: '#CC333F'});

function drawSpringyMap(){
	var wWidth = $("#springyDialog").width();
	var wHeight = $("#springyDialog").height();
	var canvas = $("#springydemo").get(0)
	canvas.width  = wWidth - 10;
	canvas.height = wHeight - 20;
	var springy = jQuery('#springydemo').springy({
		graph: graph
	});
}
