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
					//$('.outcome_container .header span.stockprice').text(data.stock0);
				}
			});
		</script>		
		

		<script type="text/javascript">
			/*
			if (Modernizr.borderradius) console.log("This browser supports borderradius");
			if (Modernizr.boxshadow) console.log("This browser supports boxshadow");
			if (Modernizr.cssanimations) console.log("This browser supports cssanimations");
			if (Modernizr.cssgradients) console.log("This browser supports cssgradients");
			if (Modernizr.csstransforms) console.log("This browser supports csstransforms");
			if (Modernizr.csstransforms3d) console.log("This browser supports csstransforms3d");
			if (Modernizr.fontface) console.log("This browser supports fontface");
			*/
			
			$(function (){
				
				$( "#lineup" ).bind( "click" , function(){ buyLineMove("up"); });
				$( "#linedown" ).bind( "click" , function(){ buyLineMove("down"); });

				
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
				
				initializeOutcomes();

			});
		</script>
		
	</head>
	<body>
		
		<div id="clock-up" style="position:relative;left:56px;top:10px;width:150px;height:25px;background-color:red">Add 1 to score</div>
		<div id="lineup" style="position:relative;left:56px;top:10px;width:150px;height:25px;background-color:#efe">Add 10 buy line</div>
		<div id="linedown" style="position:relative;left:56px;top:10px;width:150px;height:25px;background-color:#efe">Minus 10 buy line</div>
		<div id="clock-up" style="position:relative;left:56px;top:10px;width:640px;height:115px;background-color:lightgreen">
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