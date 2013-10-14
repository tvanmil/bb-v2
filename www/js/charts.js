
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
		start : function() {},
		drag : function() {},
		stop : function(event, ui) {
			// when dragging stopped, get the dragged outcome to id which number
			// should be updated.
			// Max is 126, min is 0.
			var offset = $(this).offset();
			var xPos = offset.left;
			var yPos = offset.top;
			console.log('x: ' + xPos + ", curr: " + $(this).position().left);
			console.log('y: ' + yPos + ", curr: " + $(this).position().top);
			var className = $(event.target).parent().parent().parent().parent().attr("class");
			console.log("cl: "+className);
			console.log( className.substring( className.lastIndexOf(" ") + 1 ) );
			var outcome = className.substring( className.lastIndexOf(" ") + 1 );
			console.log("div.outcome_container." + outcome + " .content .left .buy .content .price input"  );
			console.log("d:" + ( $(this).position().top/130 ).toFixed(2).toString() );
			
			// The area height is 130px from top to bottom of the graph
			$( "div.outcome_container." + outcome + " .content .left .buy .content .price input" ).val( 100 - ( $(this).position().top/130*100 ).toFixed().toString() );
			// set the position: $("#anotherElementName").css({left:x,top:y});
		}
	});
};



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
                                y = (m < 0.8 ? lastY : lastY + 100*(Math.random() < 0.5 ? 0.05 : -0.05));
                            //series.addPoint([x, y], true, true);
                        }, 1000);
                    }
                }
            },
			colors: [ '#000' ],
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
			tooltip: {
	            shared: true,
	            useHTML: true,
	            backgroundColor: {
	                linearGradient: [0, 0, 0, 50],
	                stops: [
	                    [0, '#303030'],
	                    [1, '#1f1f1f']
	                ]
	            },
	            borderColor: '#000',
	            style: {
	                padding: 10,
	                fontSize: '10px',
	                fontWeight: 'bold',
	                color: '#fff'
	            },
	            headerFormat: '',
	            formatter: function() {
	                return '&euro; ' + (this.y/100).toFixed(2);
	            },
	        },
			plotOptions: {
	            series: {
	                lineWidth: 2,
	                states: {
	                    hover: { 
	                    	enabled: true,
	                    	lineWidth: 2
						}
	                },
					shadow: {
						color: '#000',
						width: 3,
						opacity: 0.15,
						offsetY: 1,
						offsetX: 1
					},
					marker: {
						//radius:0,
						//lineWidth:0,
						lineColor:"#fff",
						fillColor:"#000",
	                    enabled: false,
	                    states: {
	                        hover: {
	                            enabled: true
	                        }
	                    }
	                }
	            }
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
                        y = (m < 0.8 ? lastY : lastY + 100*(Math.random() < 0.5 ? 0.05 : -0.05));
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

