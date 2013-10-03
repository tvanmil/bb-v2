
var BetBiddingMenu = {};
BetBiddingMenu.widths = {};
BetBiddingMenu.widths.profile = 227+577;//819;
BetBiddingMenu.widths.friends = 450; 
BetBiddingMenu.widths.favourites = 320;  
BetBiddingMenu.widths.search = 819; 
BetBiddingMenu.widths.activematches = 320;
BetBiddingMenu.animationSpeed = 400;

$(document).ready(function() {
	
	
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
		// remove overlay and retract open menus
		if ( $( "div#submenucontainer" ).data( "open" ) ) {
			retractMenu( $( "div#submenucontainer" ).data( "type" ), function() {} );
		}
		removeOverlay();
	});
	
});


function openMenu(item) {
	// place 'width' to the left
	$( "div#submenucontainer" ).css( 'left', -BetBiddingMenu.widths[item] + "px" );

	// load content
	// TODO: fetch content
	// TODO: display loading icon
	// TODO: put fetched content (JSON) in template 
	console.log("item openMenu: "+item);
	
	// For development menuData is defined as invariable. The returned JSON object
	// should be the basis for the EJS template fillings in the final version. The
	// script that returns JSON data should however first be created.
	//var menuData = JSON.parse(data);
	var menuData = "data"; 
	
	$( "div#submenucontainer" ).html( new EJS({ url: 'templates/menu.ejs' }).render( { item: item, data: menuData } ) );
	
	// resize to 'width'
	$( "div#submenucontainer" ).css( 'width', BetBiddingMenu.widths[item] + "px") ;

	// animate to left:0
	$( 'div#submenucontainer' ).animate(
		{ left: 49 +"px"}, BetBiddingMenu.animationSpeed, function() { /* callback() */ }
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
	$( "div#overlay" ).animate( { opacity: 0 }, BetBiddingMenu.animationSpeed, function() {
		$( "div#overlay" ).css( 'visibility','hidden' );	
	} );

}

