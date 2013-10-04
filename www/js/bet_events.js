$(function (){
	// Attach event handlers for the buy and sell buttons //
	
	// Attach handler to the large buy and sell button state
	$( ".container" ).delegate( ".content .left .button" , "click", function(e) { 
		e.stopPropagation();
		$(this).parent().flip({
			direction: "rl",
			color: "#6c6c6c",
			speed: 200,
			content:new EJS({ url: "templates/buttonStates.ejs" }).render({ buysell: "sell", state: "back" }),
		});
	});
	
	// Attach handler to pressing the cancel icon on the top right of the 'place order' state
	$( ".container" ).delegate( ".back.none .header .cancel" , "click", function(e) {
		e.stopPropagation();
		$(this).parent().parent().parent().flip({
			direction: "lr",
			color: "#6c6c6c",
			speed: 200,
			content:new EJS({ url: "templates/buttonStates.ejs" }).render({ buysell: $(this).parent().parent().parent().attr( "class" ), state: "front" }),
		});
	});
	
	// Attach handler to pressing the "OK" button  in the 'place order' state
	$( ".container" ).delegate( ".back.none .content .button_ok" , "click", function(e) {
		e.stopPropagation();
		$(this).parent().parent().parent().flip({
			direction: "rl",
			color: "#6c6c6c",
			speed: 200,
			content:new EJS({ url: "templates/buttonStates.ejs" }).render({ buysell: $(this).parent().parent().parent().attr( "class" ), state: "open" }),
		});
	});			
	
	// Attach handler to step 4 (pressing cancel button on 'open order' layout)
	$( ".container" ).delegate( ".back.open .header .cancel" , "click", function(e) {
		e.stopPropagation();
		$(this).parent().parent().parent().flip({
			direction: "lr",
			color: "#6c6c6c",
			speed: 200,
			content:new EJS({ url: "templates/buttonStates.ejs" }).render({ buysell: $(this).parent().parent().parent().attr( "class" ), state: "front" }),
		});
	});
	
	// TODO: Attach handler to step 4 (pressing edit button on 'open order' layout)
	$( ".container" ).delegate( ".back.open .header .edit" , "click", function(e) {
		e.stopPropagation();
		$(this).parent().parent().parent().flip({
			direction: "lr",
			color: "#6c6c6c",
			speed: 200,
			content:new EJS({ url: "templates/buttonStates.ejs" }).render({ buysell: $(this).parent().parent().parent().attr( "class" ), state: "back" }),
		});
	});	
});
	