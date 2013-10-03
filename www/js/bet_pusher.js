

/* DEFINE the BetBidding namespace for the web application. */

var BetBidding = BetBidding || {};


BetBidding.test_setNewScore = function(){
	data={
		type:'setNewScore',scoreHome:$('#test_scoreHome').val(),scoreAway:$('#test_scoreAway').val()
	};
	$.ajax({
		type:'POST',
		url:'push.php',
		cache:false,
		data:data,
		success:(function (d){
			//console.log("message received: "+d);
		})
	});
};

BetBidding.test_pushMarketInfo = function() {
	// update "player" and "invested"
	data={
		type:'pushMarketInfo',players:$('#test_players').val(),invested:$('#test_invested').val()
	};
	$.ajax({
		type:'POST',
		url:'push.php',
		cache:false,
		data:data,
		success:(function (d){
			//console.log("message received: "+d);
		})
	});
};

BetBidding.test_pushStockPrice = function() {
	// update "player" and "invested"
	data={
		type:'pushStockPrice',0:$('#test_stock0').val(),1:$('#test_stock1').val(),2:$('#test_stock2').val()
	};
	$.ajax({
		type:'POST',
		url:'push.php',
		cache:false,
		data:data,
		success:(function (d){
			//console.log("message received: "+d);
		})
	});
};