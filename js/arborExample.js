//
//  main.js
//
//  A project template for using arbor.js
//

function drawArborMap() {
	var Renderer = function(canvas) {
		var canvas = $(canvas).get(0)
		var wWidth = $("#arborDialog").width();
		var wHeight = $("#arborDialog").height();
		canvas.width  = wWidth - 10;
		canvas.height = wHeight - 20;
		var ctx = canvas.getContext("2d");
		ctx.clearRect( 0, 0, ctx.canvas.width, ctx.canvas.height);
		var particleSystem;
		var that = {
			init : function(system) {
				//
				// the particle system will call the init function once, right
				// before the
				// first frame is to be drawn. it's a good place to set up the
				// canvas and
				// to pass the canvas size to the particle system
				//
				// save a reference to the particle system for use in the
				// .redraw() loop
				particleSystem = system

				// inform the system of the screen dimensions so it can map
				// coords for us.
				// if the canvas is ever resized, screenSize should be called
				// again with
				// the new dimensions
				particleSystem.screenSize(canvas.width, canvas.height)
				particleSystem.screenPadding(80) // leave an extra 80px of
				// whitespace per side

				// set up some event handlers to allow for node-dragging
				that.initMouseHandling()
			},

			redraw : function() {
				// 
				// redraw will be called repeatedly during the run whenever the
				// node positions
				// change. the new positions for the nodes can be accessed by
				// looking at the
				// .p attribute of a given node. however the p.x & p.y values
				// are in the coordinates
				// of the particle system rather than the screen. you can either
				// map them to
				// the screen yourself, or use the convenience iterators
				// .eachNode (and .eachEdge)
				// which allow you to step through the actual node objects but
				// also pass an
				// x,y point in the screen's coordinate system
				// 
				ctx.fillStyle = "rgba(255,255,255,1.0)";
				ctx.fillRect(0, 0, canvas.width, canvas.height);

				particleSystem.eachEdge(function(edge, pt1, pt2) {
					// edge: {source:Node, target:Node, length:#, data:{}}
					// pt1: {x:#, y:#} source position in screen coords
					// pt2: {x:#, y:#} target position in screen coords

					// draw a line from pt1 to pt2
					ctx.strokeStyle = "rgba(0,0,0, .333)"
					ctx.lineWidth = 1
					ctx.beginPath()
					ctx.moveTo(pt1.x + 10, pt1.y + 10)
					ctx.lineTo(pt2.x + 10, pt2.y + 10)
					// ctx.moveTo(pt1.x, pt1.y)
					// ctx.lineTo(pt2.x, pt2.y)
					ctx.stroke()
				})

				particleSystem.eachNode(function(node, pt) {
					// node: {mass:#, p:{x,y}, name:"", data:{}}
					// pt: {x:#, y:#} node position in screen coords

					// draw a rectangle centered at pt
					var w = 10
					// ctx.fillStyle = (node.data.alone) ? "orange" : "black"
					// ctx.fillRect(pt.x-w/2, pt.y-w/2, w,w)
					var imageObj = new Image();
					imageObj.class = 'symbolClass';
					imageObj.id = pt.x + "_" + pt.y;
					imageObj.src = "images/router.png";
					ctx.fillStyle = (node.data.alone) ? "black" : ctx
							.drawImage(imageObj, pt.x, pt.y, 40, 40);
					//alert(imageObj);
					createMenu(imageObj.id);
					//ctx.fillRect(pt.x-w/2, pt.y-w/2, w,w);
				})
			},

			initMouseHandling : function() {
				// no-nonsense drag and drop (thanks springy.js)
				var dragged = null;

				// set up a handler object that will initially listen for
				// mousedowns then for moves and mouseups while dragging
				var handler = {
					clicked : function(e) {
						var pos = $(canvas).offset();
						_mouseP = arbor.Point(e.pageX - pos.left, e.pageY - pos.top);
						dragged = particleSystem.nearest(_mouseP);

						if (e.which === 3) {
							return false;
						}

						if (dragged && dragged.node !== null) {
							// while we're dragging, don't let physics move the node
							dragged.node.fixed = true;
						}

						$(canvas).bind('mousemove', handler.dragged);
						$(window).bind('mouseup', handler.dropped);

						return false;
					},
					dragged : function(e) {
						var pos = $(canvas).offset();
						var s = arbor.Point(e.pageX - pos.left, e.pageY
								- pos.top);

						if (dragged && dragged.node !== null) {
							var p = particleSystem.fromScreen(s);
							dragged.node.p = p;
						}

						return false;
					},

					dropped : function(e) {
						if (dragged === null || dragged.node === undefined) {
							return;
						}
						if (dragged.node !== null) {
							dragged.node.fixed = false;
						}
						dragged.node.tempMass = 1000;
						dragged = null;
						$(canvas).unbind('mousemove', handler.dragged);
						$(window).unbind('mouseup', handler.dropped);
						_mouseP = null;
						return false;
					}
				}
				// start listening
				$(canvas).mousedown(handler.clicked);

			},
		}
		return that;
	}

	$(document).ready(function() {
		// create the system with sensible repulsion/stiffness/friction
		var sys = arbor.ParticleSystem(2600, 512, 0.6); 
		sys.parameters({
			gravity : true
		}) // use center-gravity to make the graph settle nicely (ymmv)
		// our newly created renderer
		sys.renderer = Renderer("#viewport");
		// will have its .init() method
		// called shortly by sys...
		// add some nodes to the graph and watch it go...
		sys.addEdge('a', 'b');
		sys.addEdge('b', 'a');
		sys.addEdge('a', 'c');
		sys.addEdge('a', 'd');
		sys.addEdge('a', 'e');
		sys.addEdge('1', '2');
		sys.addEdge('2', '3');
		sys.addEdge('5', '4');
		sys.addEdge('6', '1');
		sys.addEdge('t', 'r');
		sys.addEdge('t', '6');
		sys.addEdge('a', '7');
		sys.addEdge('8', 'e');
		sys.addEdge('a', '10');
		sys.addEdge('9', '12');
		sys.addEdge('aa', 'ea');
		sys.addEdge('ad', 'es');
		sys.addEdge('as', 'eb');
		sys.addEdge('ak', 'evb');
		sys.addEdge('al', 'ei');
		sys.addEdge('an', 'em');
		sys.addEdge('ab', 'ev');
		sys.addEdge('ax', 'ec');
		sys.addEdge('az', 'e');
		sys.addEdge('a', 'e4');
		sys.addEdge('a', 'e5');
		sys.addEdge('a', 'e6');
		sys.addEdge('a', 'e7');
		sys.addEdge('a', 'e8');
		sys.addEdge('a', 'e9');
		sys.addEdge('a', 'e0');
		sys.addEdge('a', 'e1');
		sys.addEdge('a', 'e2');
		sys.addEdge('a2', 'e');
		sys.addEdge('a3', 'e');
		sys.addEdge('a4', 'e');
		sys.addEdge('a5', 'e');
		sys.addEdge('a6', 'e');
		sys.addEdge('a7', 'e');
		sys.addNode('f', {
			alone : true,
			mass : .25
		});
	});
}
