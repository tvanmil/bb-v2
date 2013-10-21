
var BetBiddingMenu = {};
BetBiddingMenu.widths = {};
BetBiddingMenu.widths.profile = 227+577;//819;
BetBiddingMenu.widths.friends = 450; 
BetBiddingMenu.widths.favourites = 320;  
BetBiddingMenu.widths.search = 819; 
BetBiddingMenu.widths.activematches = 320;
BetBiddingMenu.animationSpeed = 400;

$(document).ready(function() {
	
	$( "div#status" ).html( new EJS({ url: 'templates/statusStates.ejs' }).render( { state: 'loggedOut' } ) );
	
	// attach event handlers to the menu
	$( 'div#menu' ).delegate( ".item", 'click', function(event) {
		
		event.preventDefault();
		
		var menuItem = $( this ).attr( 'id' );//.substr(9);
		
		if ( menuItem === 'home' ) {
			// Stop execution and redirect to home page 
			location.href = 'index.php'; return true;
		} 
		

		// if the submenucontainer is already open, first retract it. When
		// complete, open the new item in the container
		if ( $( "div#submenucontainer" ).data( "type" ) === menuItem ) {
			// item is already open, do nothing and return.
			return true;
			// TODO: or close the menu again?
			
		} else if ( $( "div#submenucontainer" ).data( "open" ) === true ) {
			// The submenucontainer is already yet open. First retract current
			// and then open the new (clicked) content.
			retractMenu( $( "div#submenucontainer" ).data( "type" ), function() {
				// retract animation complete
				$( "div#submenucontainer" ).css( 'left', 0 );
				$( "div#submenucontainer" ).css( 'width',0 );
				$( "div#submenucontainer" ).data( "open" , false );
				openMenu(menuItem);				
			} );
			
		} else {
			// The submenucontainer is not yet open, so just open it.
			openMenu(menuItem);
			
		}
	});
	
	$( "body" ).delegate( "div#overlay", 'click', function(event) {
		console.log("1");
		// remove overlay and retract open menus
		if ( $( "div#submenucontainer" ).data( "open" ) ) {
			console.log("4");
			retractMenu( $( "div#submenucontainer" ).data( "type" ), function() {} );
		} else if ( $( "div#register" ).data( "open" ) ) {
			// click was on overlay for register
			$( "div#register" ).css( { visibility: 'hidden' } );
			$( "div#register" ).data( "open", false );
		}
		console.log("3");
		removeOverlay();
	});
	
	
	
	// function to change the 'password' input field from plain text
	// showing the watermark when on blur, and show the starred-input
	// when focussed.
	var watermarkPass = 'Password*';
	var watermarkUser = 'Username*';
	
	//init, set watermark text 
	$( "#status .top .password" ).val(watermarkPass);
 
	//if blur and no value inside, set watermark text
 	$( "#status .top .password" ).blur(function(){
  		if ($(this).val().length == 0){
    		$(this).val(watermarkPass);
            $(this).attr('type', 'text');
		}
 	});
 
	//if focus and text is watermrk, set it to empty
	$( "#status .top .password" ).focus(function(){
  		if ($(this).val() == watermarkPass){
    		$(this).val('');
            $(this).attr('type', 'password');
		}
 	});
 	
 	//if blur and no value inside, set watermark text
 	$( "#status .top .username" ).blur(function(){ if ($(this).val().length == 0) $(this).val(watermarkUser); });
	//if focus and text is watermrk, set it to empty
	$( "#status .top .username" ).focus(function(){ if ($(this).val() == watermarkUser) $(this).val(''); });
	
	
	// function to slide in / slide out the "login" view
	$( "body" ).delegate( "#status #statusButton" , "click", function(e) {
		 if ( !$( "#status #statusButton .loginArrow" ).hasClass( "down" ) ) {
		 	// slide window up and change arrow direction
		 	$( "#status" ).animate( { top: "-75px" }, { duration: 300, easing: 'easeOutBack'} );
		 	$( "#status #statusButton .loginArrow" ).addClass( "down" );
		 } else {
		 	// slide window down and change direction
		 	$( "#status" ).animate( { top: "0px" }, { duration: 300, easing: 'easeOutBack'} );
		 	$( "#status #statusButton .loginArrow" ).removeClass( "down" );
		 }
	});
	
	
	// attach event handlers for login menu + register form
	$( "body" ).delegate( "div.registerLink span.fontBlue" , 'click', function(event) {
		// fired when the user clicks "register" in the login menu
		console.log( "register link clicked") ;
		// open register form
		$( "div#register" ).css( { visibility: 'visible' } );
		$( "div#overlay" ).css( { visibility: 'visible' } );
		$( "div#overlay" ).animate( { opacity: 0.85 }, BetBiddingMenu.animationSpeed );
		$( "div#register" ).data( "open", true );

		//show overlay
	});
	
	$( "body" ).delegate( "div#register .left .button" , 'click', function(event) {
		// fired when the user clicks "register" button in the register form
		console.log( "register form button clicked") ;
	});

	$( "body" ).delegate( "div#register .heading .button" , 'click', function(event) {
		// fired when the user clicks the "close" icon in the register form ("x" in top right corner)
		console.log( "register form close button clicked");
		$( "div#register" ).css( { visibility: 'hidden' } );
		$( "div#overlay" ).animate( { opacity: 0 }, BetBiddingMenu.animationSpeed, function() {
			$( "div#overlay" ).css( 'visibility' , 'hidden' );
			$( "div#register" ).data( "open", false );
		} );	
	});

});


function openMenu(item, subitem) {
	
	if ( !subitem ) subitem = 'accountbalance'; // Open the account balance subitem if there is no subitem given
	
	// place 'width' to the left
	$( "div#submenucontainer" ).css( 'left', -BetBiddingMenu.widths[item] + "px" );

	// TODO: display loading icon
	// TODO: enable other 'profile' submenu's (personal information and played matches)
	// fetch content
	// For development menuData is defined as invariable. The returned JSON object
	// should be the basis for the EJS template fillings in the final version. The
	// script that returns JSON data should however first be created.
	//var menuData = JSON.parse(data);
	var menuData = "data"; 

	if ( item === 'profile' || item === 'activematches' ) {
		data = { type: item, subitem: subitem };

		$.ajax({
			type:'GET',
			url:'devfiles/menu.php',
			cache:false,
			data:data,
			success:(function (d){
				
				menuData = {};
				menuData.subitem = subitem;
				menuData.content = JSON.parse(d); 
				$( "div#submenucontainer" ).html( new EJS({ url: 'templates/menu.ejs' }).render( { item: item, data: menuData } ) );

			})
		});
	} 

	// resize to 'width'
	$( "div#submenucontainer" ).css( 'width', BetBiddingMenu.widths[item] + "px") ;

	// animate to left:0
	$( 'div#submenucontainer' ).animate(
		{ left: 49 +"px" }, BetBiddingMenu.animationSpeed, function() { /* callback() */ }
	);
	$( "div#overlay" ).css( 'visibility','visible' );
	$( "div#overlay" ).animate( { opacity: 0.85 }, BetBiddingMenu.animationSpeed );
	
	$( "div#submenucontainer" ).data( "open", true );
	$( "div#submenucontainer" ).data( "type", item );
	
	// add "open" class to the menu bar icon
	$( 'div#menu .item#'+item ).addClass('open');

}


function retractMenu(item, callback) {

	// animate to left out of screen
	$('div#submenucontainer').animate(
		{ left: -BetBiddingMenu.widths[item] - 49 +"px"}, BetBiddingMenu.animationSpeed, function() { 
			// set 'container open' variable to false (it is now closed)
			$( "div#submenucontainer" ).data( "open", false );
			$( "div#submenucontainer" ).data( "type", false );
			
			// remove "open" class of the menu bar icon
			$( 'div#menu .item#'+item ).removeClass('open');
			
			console.log( "remove: "+'div#menu .item#'+item );

			callback();
		}
	);

}


function removeOverlay() {
	console.log("2");
	$( "div#overlay" ).animate( { opacity: 0 }, BetBiddingMenu.animationSpeed, function() {
		$( "div#overlay" ).css( 'visibility','hidden' );	
	} );

}

