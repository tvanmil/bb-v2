<!DOCTYPE HTML>
<html class='no-js'>
	<head>
		<meta charset="utf-8">
		<title>
			BetBidding.com
		</title>

		<link rel="stylesheet" type="text/css" href="css/bet.css">
		<link rel="stylesheet" type="text/css" href="css/menu.css">
		<link rel="stylesheet" type="text/css" href="css/flipclock.css">
		<!-- Include the following conditional to get click-throughs to work with IE -->
		<!-- this is used to let mouse events pass through the horizontalBarContainer div -->
		<!--[if IE]>
		<style type="text/css">
	        .sample {
				filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='sample_600x600.png', sizingMethod='scale');
				background:none !important;
			}
        </style>
		<![endif]-->
		<script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
		<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>
		<script src="js/menu_new.js"></script>
		<script src="js/bet_events.js"></script>
		<script src="js/jquery.flip.js"></script>
		<script src="js/ejs.js"></script>
		<script src="js/prefixfree.min.js"></script>
		<script src="js/base.js"></script>
		<script src="js/flipclock.js"></script>
		<script src="js/modernizr.js"></script>
		<script src="js/bet_pusher.js"></script>
		<script src="http://js.pusher.com/2.1/pusher.min.js" type="text/javascript"></script>
		<script src="js/highstock.js"></script>
		<script src="http://code.highcharts.com/modules/exporting.js"></script>
		<script src="js/charts.js"></script>
		<script type="text/javascript">
			// Enable pusher logging - don't include this in production
			var charts = [];
			var data = [];
			var dataAll = [];
			var currentY = []; // this variable should be update by the pusher messages
			var demoMode = false;
			
			var pusherEnabled = false;
			if (pusherEnabled) {
				
			Pusher.log = function(message) {
				if (window.console && window.console.log) {
					window.console.log(message);
				}
			};
			var pusher = new Pusher( "de4807612efef0b72d12" );
			var channel = pusher.subscribe( "test_channel" );
			channel.bind( "my_event" , function(data) {
				console.log(data);
				if (data.type === 'setNewScore') {
					scoreSingleUp( "home" );
				}
				if (data.type === 'pushMarketInfo') {
					$( "div.left span.stockprice" ).text(data.players);
					$( "div.right span.stockprice" ).html(data.invested)
				}	
				if (data.type === 'pushStockPrice') {
					console.log("length: "+data.data.length);
					for (var i = 0; i<data.data.length; i++) {
						$( ".outcome_container." + i + " .header span.stockprice" ).text( data.data[i]+"ct" );
					}
				}
			});
			
			}

			
		</script>		
		

		<script type="text/javascript">
			/*
			Flipclock uses CSS3 animations
			Website uses boxshadow, borderradius, cssgradients, fontface
			Highcharts uses csstransforms
			Not used are: csstransforms3d

			if (Modernizr.borderradius) console.log("This browser supports borderradius");
			if (Modernizr.boxshadow) console.log("This browser supports boxshadow");
			if (Modernizr.cssanimations) console.log("This browser supports cssanimations");
			if (Modernizr.cssgradients) console.log("This browser supports cssgradients");
			if (Modernizr.csstransforms) console.log("This browser supports csstransforms");
			if (Modernizr.csstransforms3d) console.log("This browser supports csstransforms3d");
			if (Modernizr.fontface) console.log("This browser supports fontface");
			*/
			
			$(function (){

				$( "body" ).delegate( "#insertSeries" , "click", function(e) {
					
					var chart2 = $('#graph0').highcharts();
					var points=chart2.series[0].points;
					//points.length == currently visible points
					
					console.log("# graph: "+data[0].length+", # dataAll: "+dataAll[0].length+", #chart: "+points.length);
					
					//console.log("JSON: "+JSON.stringify(dataAll[0]));

					// The basic working of 'zoom' buttons. Remove the current series
					// and add a new series as a subset of the total available data.
					
					// data[0] should contain a slice of the total array of values
					data[0] = dataAll[0].slice();

					// remove the old series, add the new slice, then redraw.
					charts[0].series[0].remove();
					charts[0].addSeries( { name: 'test', data: data[0] } );
					charts[0].series[0].redraw();
					
				});
				
				$( "body" ).delegate( "#testbutton" , "click", function(e) {
					
					var chart2 = $('#graph0').highcharts();
					
					console.log('first: '+dataAll[0][0][1]+", last: "+dataAll[0][dataAll[0].length-1][1]);

					var zoomLevels = [];
					zoomLevels[0] = 1;
					//(new Date()).getTime() - zoomLevels[0] * 1000
					chart2.xAxis[0].setExtremes(
						(new Date()).getTime() - zoomLevels[0] * 1000,
						(new Date()).getTime()
					);
					
					// trigger zoom button
					// trigger a press on the first button
					$( "#graph0.graphDimension g.highcharts-button" ).trigger("click")
					console.log("ok: "+$( "#graph0.graphDimension g.highcharts-button" ).length );
					
					// update graph with series or points
					// get the graph to update
					//var chart2 = $('#graph0').highcharts();
					
					// add a new series
					//chart2.addSeries({ name: 'New Series', data: data[1] });
					
					// add a new point to a series
					chart2.series[0].addPoint([(new Date()).getTime()*1*1000, Math.round(Math.random() * 100)], true, true);

				});
					
				
				setTimeout(function(){
					//console.log('sethome');
					scoreSingleSet('home',2);
				}, 10);
				setTimeout(function() {
					//scoreDoubleSet('home',3);
				}, 100);					
				setTimeout(function(){
					//console.log('sethome');
					scoreSingleSet('away',2);
				}, 10);
				setTimeout(function() {
					//scoreDoubleSet('away',2);
				}, 100);

				$( "#clock-up" ).bind( "click" , function(){ scoreSingleUp( "home" ); });
				
				var dataFlipClock = { title: "klok", numbers: [10,10], scores: ['home','away']	};
				var htmlFlipClock = new EJS({url: "templates/flipclock.ejs" }).render(dataFlipClock);
				$( ".scoreBoard" ).html(htmlFlipClock);
				
				$( ".content .left .sell" ).html( new EJS({url: 'templates/buttonStates.ejs'}).render({ buysell: 'sell', state: 'front' }) );
				$( ".content .left .buy" ).html( new EJS({url: 'templates/buttonStates.ejs'}).render({ buysell: 'buy', state: 'front' }) );
				
				
				// initialize when the game data has been retrieved.
				// That includes outcome titles as well as latest currentY values
				// The part below is placeholder for now..
				currentY[0] = 10;
				currentY[1] = 30;
				currentY[2] = 55;
				var dataOutcomes = {
					title : "titel",
					outcomes : ['Nederland', 'Italië', 'Gelijkspel']
				};
				initializeOutcomes(dataOutcomes);

			});
		</script>
		
	</head>
	<body>

		<div id="insertSeries" style="position:relative;left:56px;top:10px;width:150px;height:25px;background-color:lightblue">refresh series</div>
		<div id="testbutton" style="position:relative;left:56px;top:10px;width:150px;height:25px;background-color:red">click button</div>
		<div id="clock-up" style="position:relative;left:56px;top:10px;width:150px;height:25px;background-color:red">Add 1 to score</div>
		<div style="position:relative;left:56px;top:10px;width:640px;height:115px;background-color:lightgreen">
			<p>Pusher dashboard</p>
			<div style="float:left;width:150px;background-color:#efefef;">
				<button type="button" onclick="BetBidding.test_setNewScore()">Push score</button>
				<input type="text" id="test_scoreHome" value="3" />
				<input type="text" id="test_scoreAway" value="2" />
			</div>
			<div style="float:left;width:150px;margin-left:5px;background-color:#efefef;">
				<button type="button" onclick="BetBidding.test_pushMarketInfo()">Push market info</button>
				<input type="text" id="test_players" value="450" />
				<input type="text" id="test_invested" value="1075" />
			</div>
			<div style="float:left;width:150px;margin-left:5px;background-color:#efefef;">
				<button type="button" onclick="BetBidding.test_pushStockPrice()">Push stock price</button>
				<input type="text" id="test_stock0" value="40" />
				<input type="text" id="test_stock1" value="30" />
				<input type="text" id="test_stock2" value="25" />
			</div>
			<div style="float:left;width:150px;margin-left:5px;background-color:#efefef;">
				<button type="button" onclick="BetBidding.test_setNewScore()">Push portfolio</button>
				<input type="text" id="test_scoreHome" value="40" />
				<input type="text" id="test_scoreAway" value="40" />
			</div>
		</div>
		
		<div class="full_width_spacer"></div>
		
		<div class="container">
		
			<div id="notifications_container">
				<div class="header">
					<div class="standardFont bbFont">notifications</div>
				</div>
				<div class="content"></div>
				<div class="footer">
					<div class="left">
						<div class="standardFont bbFontLight">investment <span class="stockprice bbFontLight">&euro; 0.00</span></div>
					</div>
					<div class="right">
						<div class="standardFont bbFontLight">value <span class="stockprice bbFontLight">&euro; 8.45</span></div>
					</div>
				</div>
			</div>
			<div id="score_container">
				<div class="header">
					<div class="standardFont bbFont">Nederland - Italie</div>
				</div>
				<div class="content"><div class="scoreBoard"></div></div>
				<div class="footer">
					<div class="standardFont bbFontLight">match open</div>
				</div>
			</div>
			<div id="market_container">
				<div class="header">
					<div class="standardFont bbFont">market activity</div>
				</div>
				<div class="content"></div>
				<div class="footer">
					<div class="left">
						<div class="standardFont bbFontLight">players <span class="stockprice bbFontLight">10.000</span></div>
					</div>
					<div class="right">
						<div class="standardFont bbFontLight">invested <span class="stockprice bbFontLight">&euro; 10203.54</span></div>
					</div>
				</div>
			</div>
			
		</div>
		
		<div class="full_width_spacer"></div>
		
		<div class="container" id="outcomes"></div>
		
		<div class="full_width_spacer"></div>
		<div class="full_width_spacer"></div>
		<div class="full_width_spacer"></div>
		<?php include('includes/menu.php'); ?>
		
	</body>
</html>