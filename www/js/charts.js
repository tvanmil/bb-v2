function buyLineMove(updown) {

	var xPos = $(".outcome_container.0 .graph .horizontal.buy").position().left;
	var yPos = $(".outcome_container.0 .graph .horizontal.buy").position().top;

	console.log('x2: ' + xPos);
	console.log('y2: ' + yPos);

	var yPosNew = (updown === 'up' ? yPos - 10 : yPos + 10);

	yPosNew = (yPosNew < 0 ? 0 : yPosNew);
	yPosNew = (yPosNew > 150 ? 150 : yPosNew);

	$(".outcome_container.0 .graph .horizontal.buy").css({
		top : yPosNew
	});
};

function initializeOutcomes() {
	//console.log("outcomes");
	var dataOutcomes = {
		title : "titel",
		outcomes : ['Nederland', 'Italië', 'Gelijkspel']
	};
	var htmlOutcomes = new EJS({
		url : "templates/outcome.ejs"
	}).render(dataOutcomes);
	$(".container#outcomes").html(htmlOutcomes);
	// .html() is synchroon dus hierna graph initializen...

	for (var i = 0; i < dataOutcomes.outcomes.length; i++) {
		initializeChart(i);
	}

	$(".graph .horizontal.sell").draggable({
		containment : "parent"
	});
	$(".graph .horizontal.buy").draggable({
		containment : "parent",
		start : function() {
		},
		drag : function() {
		},
		stop : function(event, ui) {
			// when dragging stopped, get the dragged outcome to id which number
			// should be updated.
			var offset = $(this).offset();
			var xPos = offset.left;
			var yPos = offset.top;
			console.log('x: ' + xPos + ", curr: " + $(this).position().left);
			console.log('y: ' + yPos + ", curr: " + $(this).position().top);
			console.log($(event.target).parent().parent().parent().attr("class"));
			// set the position: $("#anotherElementName").css({left:x,top:y});
		}
	});
};


function initializeChart2(id) {
	// Create the chart
	var darkColor = '#f5f5f5';
	var lightColor = '#fff';
	// generate an array of random data
	data[id] = [];
	var time = (new Date()).getTime() * 1000;//, i;
	//range: 1 * 1 * 1 * 2 * 60 * 1000, // six months
	
	for ( i = -99; i <= 0; i++) {
		var y = Math.round(Math.random() * 100);
		data[id].push([
			time + i * 1 * 60 * 1000, 
			y
		]);
		//console.log("d: "+ (time + i * 1 * 60 * 1000) +", y: "+y );
	}
	console.log("range: "+ (1 * 1 * 1 * 2 * 60 * 1000) );
	//console.log("chart: " + chart);
	//chart[id] = {};

	chart[id] = $('#graph' + id).highcharts('StockChart', {

		addSeries : function(name) {
			this.chart.addSeries({
				name : name,
				data : [],
				id : Math.floor(Math.random() * 1000)
			});
		},
		chart : {
			//margin: 20,
			marginBottom : -10,
			marginLeft : 0,
			marginTop : 0,
			marginRight : 0,
			borderWidth : 0,
			backgroundColor : 'transparent',
			spacing : 0,
			border : 0,
			//backgroundColor: '#eff'
		},
		rangeSelector : {
			buttons : [{
				count : 1,
				type : 'minute',
				text : '1M'
			}, {
				count : 5,
				type : 'minute',
				text : '5M'
			}, {
				type : 'all',
				text : 'All'
			}],
			enabled : false,
			inputEnabled : false,
			selected : 2

		},
		credits : {
			enabled : false
		},
		title : {
			text : null
		},
		minTickInterval : 100,
		showLastLabel : true,

		yAxis : {
			GridLineWidth : 0,
			minorGridLineWidth : 0,
			gridLineColor : '#ffffff',
			min : 0,
			//max : 100,
			labels : {
				enabled : false,
				//align : 'left',
				//y : 25,
				//x : 50
			},
			plotBands : [
				{color : lightColor,from : 0,to : 10}, 
				{color : darkColor,from : 10,to : 20}, 
				{color : lightColor,from : 20,to : 30}, 
				{color : darkColor,from : 30,to : 40}, 
				{color : lightColor,from : 40,to : 50}, 
				{color : darkColor,from : 50,to : 60}, 
				{color : lightColor,from : 60,to : 70},
				{color : darkColor,from : 70,to : 80}, 
				{color : lightColor,from : 80,to : 90}, 
				{color : darkColor,from : 90,to : 100 }

				/*
				 { color: '#ffffff',from: 0,to: 10},
				 { color: '#f5f5f5',from: 10,to: 20},
				 { color: '#ffffff',from: 20,to: 30},
				 { color: '#f5f5f5',from: 30,to: 40},
				 { color: '#ffffff',from: 40,to: 50},
				 { color: '#ffffff',from: 50,to: 60},
				 { color: '#ffffff',from: 60,to: 70},
				 { color: '#ffffff',from: 70,to: 80},
				 { color: '#ffffff',from: 80,to: 90},
				 { color: '#f5f5f5',from: 90,to: 100}
				 */
			],

		},
		xAxis : {
			//range: 6 * 30 * 24 * 3600 * 1000, // six months
			//range: 1 * 1 * 1 * 2 * 60 * 1000 + 1*1000, // six months
			gridLineWidth : 0,
			minorGridLineWidth : 0,
			//type: 'datetime',
			tickWidth : 0,
			lineWidth : 0,
			startOnTick: true,
			endOnTick: true,
			offset : 2,
			labels : {
				enabled : false
			}
		},
		navigator : {
			enabled : true
		},
		exporting : {
			enabled : false
		},
		scrollbar : {
			barBackgroundColor : 'gray',
			//barBorderRadius: 3,
			//barBorderWidth: 0,
			//buttonBackgroundColor: 'gray',
			//buttonBorderWidth: 0,
			//buttonBorderRadius: 3,
			//trackBackgroundColor: 'none',
			//trackBorderWidth: 1,
			//trackBorderRadius: 3,
			//trackBorderColor: '#CCC',
			height : 6
		},
		series : [{
			name : 'Stock0',
			data : data[id],
			tooltip : {
				valueDecimals : 2
			}
		}]
	});

	console.log('2');
	console.log(chart[id]);

}




function initializeChart3(id) {
	var chart;
	$( '#graph' + id ).highcharts('StockChart', {
		// $('#container').highcharts({
		chart : {
			type : 'spline',
			animation : Highcharts.svg, // don't animate in old IE
			marginRight : 10,
			events : {
				load : function() {

					// set up the updating of the chart each second
					var series = this.series[0];
					setInterval(function() {
						var x = (new Date()).getTime(), // current time
						y = Math.random();
						//series.addPoint([x, y], true, true);
					}, 1000);
				}
			}
		},
		title : {
			text : null//'Live random data'
		},
		xAxis : {
			type : 'datetime',
			tickPixelInterval : 150
		},
		yAxis : {
			title : {
				text : 'Value'
			},
			plotLines : [{
				value : 0,
				width : 1,
				color : '#808080'
			}]
		},
		rangeSelector : {
			buttons: [{
				count: 1,
				type: 'minute',
				text: '1M'
			}, {
				count: 5,
				type: 'minute',
				text: '5M'
			}, {
				type: 'all',
				text: 'All'
			}],
			enabled : true,
			inputEnabled : true,
			selected : 2

		},
		navigator : {
			enabled : true
		},
		tooltip : {
			formatter : function() {
				//return '<b>' + this.series.name + '</b><br/>' + Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' + Highcharts.numberFormat(this.y, 2);
			}
		},
		legend : {
			enabled : false
		},
		exporting : {
			enabled : false
		},
		series : [{
			name : 'Random data',
			data : (function() {
				// generate an array of random data
				var data = [], time = (new Date()).getTime(), i;

				for ( i = -19; i <= 0; i++) {
					data.push({
						x : time + i * 1000,
						y : Math.random()
					});
				}
				return data;
			})()
		}]
	});

}

function initializeChart(id) {
		Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });
        
        var lastY = 0.5*100;
        var darkColor = '#f5f5f5';
	    var lightColor = '#fff';
        var chart;
        $( '#graph' + id ).highcharts('StockChart', {
        //$('#container').highcharts({
            chart: {
                type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE
                //marginRight: 10,
                margin: 0,
                marginBottom: 20,
                events: {
                    load: function() {
    
                        // set up the updating of the chart each second
                        var series = this.series[0];
                        setInterval(function() {
                            var m = Math.random();
                            var x = (new Date()).getTime(), // current time
                                y = (m < 0.9 ? lastY : lastY + 100*(Math.random() < 0.5 ? 0.05 : -0.05));
                            series.addPoint([x, y], true, true);
                        }, 1000);
                    }
                }
            },
            title: {
                text: null//'Live random data'
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150
            },
            yAxis: {
                min : 0,
			    max : 100,
                title: {
                    text: null//'Value'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }],
                labels : {
				    enabled : false
			    },
                GridLineWidth : 0,
			    minorGridLineWidth : 0,
                gridLineColor : '#ffffff',
                plotBands : [
                    {color : lightColor,from : 0,to : 10}, 
                    {color : darkColor,from : 10,to : 20}, 
                    {color : lightColor,from : 20,to : 30}, 
                    {color : darkColor,from : 30,to : 40}, 
                    {color : lightColor,from : 40,to : 50}, 
                    {color : darkColor,from : 50,to : 60}, 
                    {color : lightColor,from : 60,to : 70},
                    {color : darkColor,from : 70,to : 80}, 
                    {color : lightColor,from : 80,to : 90}, 
                    {color : darkColor,from : 90,to : 100 }
                ]
            },
            scrollbar: { enabled: false },
            credits: { enabled: false},
            navigator: {enabled: false},
            rangeSelector: {enabled: false,inputEnabled: false},
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                turboThreshold : 100000,
                name: 'Random data',
                data: (function() {
                    // generate an array of random data
                    var data = [],
                        time = (new Date()).getTime(),
                        i;

                    for (i = -(5*60); i <= 0; i++) {
                        var m = Math.random();
                        y = (m < 0.9 ? lastY : lastY + 100*(Math.random() < 0.5 ? 0.05 : -0.05));
                        if (y>100) y=100;
                        if (y<0) y=0;
                        lastY = y;
                        data.push({
                            x: time + i * 1000,
                            y: y
                        });
                    }
                    return data;
                })()
            }]
        });

	
}

