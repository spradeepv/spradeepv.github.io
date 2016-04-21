var chart;
function drawPieChart() {
	chart = new Highcharts.Chart({
		chart : {
			renderTo : 'container',
			borderWidth : 2,
			borderColor : '#000'
		},
		title : {
			text : 'Browser market shares at a specific website, 2010'
		},
		tooltip : {
			formatter : function() {
				return '<b>' + this.point.name + '</b>: ' + this.y + ' %';
			}
		},
		plotOptions : {
			pie : {
				allowPointSelect : true,
				cursor : 'pointer',
				dataLabels : {
					enabled : false,
					color : '#000000',
					connectorColor : '#000000',
					formatter : function() {
						return '<b>' + this.point.name + '</b>: ' + this.y + ' %';
					}
				},
				showInLegend : true
			}
		},
		credits : {
			enabled : false
		},
		series : [ {
			type : 'pie',
			name : 'Browser share',
			data : [ [ 'Firefox', 45.0 ], [ 'IE', 26.8 ], {
				name : 'Chrome',
				y : 12.8,
				sliced : true,
				selected : true
			}, [ 'Safari', 8.5 ], [ 'Opera', 6.2 ], [ 'Others', 0.7 ] ]
		}]
	});
}