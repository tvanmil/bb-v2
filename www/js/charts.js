
		function buyLineMove(updown) {
				
				var xPos = $( ".outcome_container.0 .graph .horizontal.buy" ).position().left;
				var yPos = $( ".outcome_container.0 .graph .horizontal.buy" ).position().top;
				
				console.log('x2: ' + xPos);
				console.log('y2: ' + yPos);
				
				var yPosNew = (updown === 'up' ? yPos - 10 : yPos + 10);
				
				yPosNew = (yPosNew < 0 ? 0 : yPosNew);
				yPosNew = (yPosNew > 150 ? 150 : yPosNew);

				$( ".outcome_container.0 .graph .horizontal.buy" ).css({top:yPosNew});
		}
		
			function initializeOutcomes() {
				//console.log("outcomes");
				var dataOutcomes = { title: "titel", outcomes:['Nederland','Italië','Gelijkspel'] };
				var htmlOutcomes = new EJS({url: "templates/outcome.ejs" }).render(dataOutcomes);
				$( ".container#outcomes" ).html(htmlOutcomes);
				// .html() is synchroon dus hierna graph initializen...

				for ( var i = 0; i < dataOutcomes.outcomes.length; i++ ) {
					initializeChart(i);
				}
				
				$( ".graph .horizontal.sell" ).draggable({ containment: "parent" });
				$( ".graph .horizontal.buy" ).draggable({ containment: "parent",
					start: function() {},
					drag: function() {},
					stop: function( event, ui ) {
						// when dragging stopped, get the dragged outcome to id which number
						// should be updated.
			            var offset = $(this).offset();
			            var xPos = offset.left;
			            var yPos = offset.top;
			            console.log('x: ' + xPos+", curr: "+$(this).position().left);
			            console.log('y: ' + yPos+", curr: "+$(this).position().top);
						console.log( $( event.target ).parent().parent().parent().attr( "class" ) );
						// set the position: $("#anotherElementName").css({left:x,top:y});
					}
				});
			}
			
//function initializeChart(id) {
//$( "#graph"+id ).highcharts('StockChart',{
		        	
function initializeChart3(id) {		        	
	
	Highcharts.setOptions({
		global : {
			useUTC : false
		}
	});
	
	// Create the chart
	$('#graph'+id).highcharts({
		chart : {
			events : {
				load : function() {

					// set up the updating of the chart each second
					var series = this.series[0];
					setInterval(function() {
						var x = (new Date()).getTime(), // current time
						y = Math.round(Math.random() * 100);
						series.addPoint([x, y], true, true);
					}, 1000);
				}
			}
		},
		
		rangeSelector: {
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
			inputEnabled: false,
			selected: 0
		},
		
		title : {
			text: null//'Live random data'
		},

		yAxis: {
            title: {
                //text: null
            },
            max : 100,
            min : 0
        },
        
		navigator : {
				enabled : false
		},
		
		exporting: {
			enabled: false
		},
		
		series : [{
			name : 'Random data',
			//showInLegend : false,
			data : (function() {
				// generate an array of random data
				var data = [], time = (new Date()).getTime(), i;
				console.log(time * 1000);
				for( i = -99; i <= 0; i++) {
					data.push([
						time + i * 1000,
						Math.round(Math.random() * 100)
					]);
				}
				return data;
			})()
		}]
	});

}


function initializeChart2(id) {		        	
	
	Highcharts.setOptions({
		global : {
			useUTC : false
		}
	});
	
	// Create the chart
	$('#graph'+id).highcharts('StockChart', {
		chart : {
			events : {
				load : function() {

					// set up the updating of the chart each second
					var series = this.series[0];
					setInterval(function() {
						var x = (new Date()).getTime(), // current time
						y = Math.round(Math.random() * 100);
						series.addPoint([x, y], true, true);
					}, 1000);
				}
			}
		},
		
		rangeSelector: {
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
			inputEnabled: false,
			selected: 0
		},
		
		title : {
			text : 'Live random data'
		},
		
		exporting: {
			enabled: false
		},
		
		series : [{
			name : 'Random data',
			data : (function() {
				// generate an array of random data
				var data = [], time = (new Date()).getTime(), i;

				for( i = -99; i <= 0; i++) {
					data.push([
						time + i * 1000,
						Math.round(Math.random() * 100)
					]);
				}
				return data;
			})()
		}]
	});

}
			







function initializeChart(id) {
// Create the chart
		$('#graph'+id).highcharts('StockChart', {
			
			chart: {
		        //margin: 20,
		        marginBottom: 20,
		        marginLeft: 0,
		        marginTop: 0,
		        marginRight: 0,
		        borderWidth: 0,
		        backgroundColor: 'transparent',
		        spacing:0,
		        border:0,
		        //backgroundColor: '#eff'
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
				inputEnabled: false,
				selected: 0

			},
			credits: {
				enabled: false
			},
			title : {
				text : null
			},
			yAxis : {
				min: 0
			},
			xAxis : {
				//type: 'datetime',
				tickWidth: 0,
				lineWidth: 0,
				offset: 2,
				labels : {
				  enabled: false
				}
			},
			navigator : {
				enabled : false
			},
			exporting: {
				enabled: false
			},
		    scrollbar: {
				barBackgroundColor: 'gray',
				//barBorderRadius: 3,
				//barBorderWidth: 0,
				//buttonBackgroundColor: 'gray',
				//buttonBorderWidth: 0,
				//buttonBorderRadius: 3,
				//trackBackgroundColor: 'none',
				//trackBorderWidth: 1,
				//trackBorderRadius: 3,
				//trackBorderColor: '#CCC',
				height: 6
		    },
			series : [{
				name : null,
				data : (function() {
				// generate an array of random data
				var data = [], time = (new Date()).getTime(), i;

				for( i = -99; i <= 0; i++) {
					data.push([
						time + i * 1000,
						Math.round(Math.random() * 100)
					]);
				}
				return data;
			})(),
				tooltip: {
					valueDecimals: 2
				}
			}]
		});	





}