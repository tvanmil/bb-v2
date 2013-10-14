$(function (){
	// Attach event handlers for the buy and sell buttons //
	
	// Attach handler to the large buy and sell button state
	$( ".container" ).delegate( ".content .left .button" , "click", function(e) { 
		e.stopPropagation();
		
		var buysell = $(event.target).attr("class").substring( $(event.target).attr("class").lastIndexOf(" ") + 1 );
		var outcome = $(event.target).parent().parent().parent().parent().attr("class").substring( $(event.target).parent().parent().parent().parent().attr("class").lastIndexOf(" ") + 1 );
		
		$(this).parent().flip({
			direction: "rl",
			color: "#6c6c6c",
			speed: 200,
			content:new EJS({ url: "templates/buttonStates.ejs" }).render({ buysell: buysell, state: "back" }),
			onEnd: function(){
				// show the horizontal line as dashed
				$( ".outcome_container."+outcome+" .content .graph .horizontal."+buysell ).addClass( "dashed" );
			}
		});
	});
	
	// Attach handler to pressing the cancel icon on the top right of the 'place order' state
	$( ".container" ).delegate( ".back.none .header .cancel" , "click", function(e) {
		e.stopPropagation();

		var buysell = $(event.target).parent().parent().parent().attr("class");
		var outcome = $(event.target).parent().parent().parent().parent().parent().parent().attr("class").substring( $(event.target).parent().parent().parent().parent().parent().parent().attr("class").lastIndexOf(" ") + 1 );

		$(this).parent().parent().parent().flip({
			direction: "lr",
			color: "#6c6c6c",
			speed: 200,
			content:new EJS({ url: "templates/buttonStates.ejs" }).render({ buysell: buysell, state: "front" }),
			onEnd: function() {
				// remove the horizontal line
				$( ".outcome_container."+outcome+" .content .graph .horizontal."+buysell ).removeClass( "dashed" );
			}
		});
	});
	
	// Attach handler to pressing the "OK" button  in the 'place order' state
	$( ".container" ).delegate( ".back.none .content .button_ok" , "click", function(e) {
		e.stopPropagation();

		var buysell = $(event.target).parent().parent().parent().attr("class");
		var outcome = $(event.target).parent().parent().parent().parent().parent().parent().attr("class").substring( $(event.target).parent().parent().parent().parent().parent().parent().attr("class").lastIndexOf(" ") + 1 );
		
		$(this).parent().parent().parent().flip({
			direction: "rl",
			color: "#6c6c6c",
			speed: 200,
			content:new EJS({ url: "templates/buttonStates.ejs" }).render({ buysell: $(this).parent().parent().parent().attr( "class" ), state: "open" }),
			onEnd: function() {
				// show the horizontal line as solid
				$( ".outcome_container."+outcome+" .content .graph .horizontal."+buysell ).removeClass( "dashed" ).addClass( "solid" );
			}
		});
	});			
	
	// Attach handler to step 4 (pressing cancel button on 'open order' layout)
	$( ".container" ).delegate( ".back.open .header .cancel" , "click", function(e) {
		e.stopPropagation();
		
		var buysell = $(event.target).parent().parent().parent().attr("class");
		var outcome = $(event.target).parent().parent().parent().parent().parent().parent().attr("class").substring( $(event.target).parent().parent().parent().parent().parent().parent().attr("class").lastIndexOf(" ") + 1 );

		$(this).parent().parent().parent().flip({
			direction: "lr",
			color: "#6c6c6c",
			speed: 200,
			content:new EJS({ url: "templates/buttonStates.ejs" }).render({ buysell: $(this).parent().parent().parent().attr( "class" ), state: "front" }),
			onEnd: function() {
				// remove the horizontal line
				$( ".outcome_container."+outcome+" .content .graph .horizontal."+buysell ).removeClass( "solid" );				
			}
		});
	});
	
	// TODO: Attach handler to step 4 (pressing edit button on 'open order' layout)
	$( ".container" ).delegate( ".back.open .header .edit" , "click", function(e) {
		e.stopPropagation();

		var buysell = $(event.target).parent().parent().parent().attr("class");
		var outcome = $(event.target).parent().parent().parent().parent().parent().parent().attr("class").substring( $(event.target).parent().parent().parent().parent().parent().parent().attr("class").lastIndexOf(" ") + 1 );
		console.log("b: "+buysell+", o: "+outcome);
		$(this).parent().parent().parent().flip({
			direction: "lr",
			color: "#6c6c6c",
			speed: 200,
			content:new EJS({ url: "templates/buttonStates.ejs" }).render({ buysell: $(this).parent().parent().parent().attr( "class" ), state: "back" }),
			onEnd: function() {
				// show the horizontal line as dashed
				$( ".outcome_container."+outcome+" .content .graph .horizontal."+buysell ).removeClass( "solid" ).addClass( "dashed" );

			}
		});
	});	
});
	