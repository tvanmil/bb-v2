var menuWidths = [];
var isMenuOpen = [];
var mUnfoldSpeed = 400;
var ovDisplayed = false;

var slider_cash_moved = false;

var cash_roulation = [];
var active_players = [];

var settings2 = { showArrows: true };
var api2; 

var searchArray = [];
searchArray.sport = false;
searchArray.cash_roulation_low = false;
searchArray.cash_roulation_high = false;
searchArray.cash_roulation_min = false;
searchArray.cash_roulation_max = false;
searchArray.active_players_low = false;
searchArray.active_players_high = false;
searchArray.active_players_min = false;
searchArray.active_players_max = false;
searchArray.tags = [];

menuWidths.home = '222|571';
menuWidths.profile = 819;
menuWidths.friends = 450; 
menuWidths.favs = 320; 
menuWidths.stats = 450; 
menuWidths.search = 819; 
menuWidths.actm = 320; 

isMenuOpen.home = false;
isMenuOpen.profile = false;
isMenuOpen.friends = false;
isMenuOpen.favs = false;
isMenuOpen.stats = false;
isMenuOpen.search = false;
isMenuOpen.actm = false;

/* 
 * global variables for adding and removing tags
 */
var number_of_tag_ids = 0;
var tag_ids = new Array();


function resize2() {
	// 200 is the total height of the other 2 divs
	var height = $('.m_profile_right').height() - 174 - 20;
	//console.log(height);
	$('div#prf_opt_right_cnt').height(height);
};

$(document).ready(function() {

	resize2(); 
	var pane2 = $('div#prf_opt_right_cnt'); 
	pane2.jScrollPane(settings2); 
	api2 = pane2.data('jsp');
	
	$('a.favs_icon')
	.live("mousedown", function(e){
		e.preventDefault();
		e.stopPropagation();
		toggleFavouritedItem($(this).attr('id'));
		$(this).addClass('active'); })
	.live("mouseup", function(e){
		e.preventDefault();
		e.stopPropagation();
		$(this).removeClass('active'); })
	.live("click", function(e) {
		e.preventDefault();
		e.stopPropagation();
	});

	$('.search_opt_right_item').live("mousedown", function(e){
		e.preventDefault();
		e.stopPropagation();
		console.log($(this).attr('class'));
		$(this).addClass('active');
	}).live("mouseup",function(e){
		e.preventDefault();
		e.stopPropagation();
		$(this).removeClass('active');
	});

	$(".topnav .item").on("click", function(event){
		event.preventDefault();
		var btn = $(this).attr('id').substr(9);
		if (btn == 'home') { location.href='index.php'; return; } // Stop execution and redirect to home page
		if (isMenuOpen[btn]) {
			retractMenu(btn);
			toggleOverlay();
		} else {
			if (!retractAllMenus()) {  
				toggleOverlay(); ejectMenu(btn); // er stond nog geen menu open
			} else { 
				setTimeout(function(){ejectMenu(btn)}, mUnfoldSpeed); 
			}
		}
	});


	// Startup the arrow events for birthday click events //.m_prf_pi_box_field .reg_arrow 
	$(".m_prf_pi_box_field .reg_incdec").live("click", function(event){
		var y = $(this).parent().attr('id');
		var z = $(this).attr('class').substr(10,1);
		var currentVal = parseInt($("#acc_"+y).val(), 10); // set radix to decimal (10). Otherwise 01 is parsed as octogonal.
		if (z == 'u') { currentVal += 1; } 
		if (z == 'd') { currentVal -= 1; }
		if (y == 'day') {
			if (currentVal > 31) { currentVal = 1;}
			if (currentVal < 1) { currentVal = 31; }
		} else if (y == 'month') {
			console.log("changem: "+currentVal);
			if (currentVal > 12) currentVal = 1;
			if (currentVal < 1) currentVal = 12;
		}
		if (currentVal < 10) { currentVal = "0" + currentVal;  }

		$("#acc_"+y).val(currentVal);
		//$($("#acc_"+y)).val(currentVal);

	});



	$("#profile_options .prf_opt_item").on("click", function(event){
		var mItem = $(this).children('.m_item_text').attr('id').substr(8);
		console.log("mItem r137: "+mItem);
		reloadProfileRightContent(mItem); // fetch updated content
		clearAllActiveStates(); // remove all active states of left menu options
		$(this).addClass('active'); // set the active state to the clicked left menu option
		return false;
	});

	$('#overlay').click(function () {
		retractAllMenus();
		toggleOverlay();
	});

	/* 
	 * This section handles the slider layouts
	 */
	$("#slider_cash_roulation #slider").slider({
		range: true,
		min: 0,
		max: 500,
		values: [ 0, 500 ],
		slide: function( event, ui ) {
			$("#slider_cash_roulation #low").val(ui.values[0]);
			$("#slider_cash_roulation #high").val(ui.values[1]);
			// doe nieuwe zoekactie
			//console.log(ui.values[0]+"-"+ui.values[1]);
		},
		change: function( event, ui ) {
			//console.log(ui.values[0]+"-"+ui.values[1]);
			searchArray['cash_roulation_low'] = $("#slider_cash_roulation #slider").slider("values", 0);
			searchArray['cash_roulation_high'] = $("#slider_cash_roulation #slider").slider("values", 1);
		},
		stop: function ( event, ui ) {
			// update search field when the user drops the slider
			// OPTIONAL: include a delay. When user starts sliding within the delay time,
			// then do not update the search field until the user is done sliding again.
			
			searchArray['cash_roulation_low'] = $("#slider_cash_roulation #slider").slider("values", 0);
			searchArray['cash_roulation_high'] = $("#slider_cash_roulation #slider").slider("values", 1);
			searchArray['cash_roulation_max'] = $( "#slider_cash_roulation #slider" ).slider( "option", "max" );
			searchArray['cash_roulation_min'] = $( "#slider_cash_roulation #slider" ).slider( "option", "min" );
			
			//alert($( "#slider_cash_roulation #slider" ).slider( "option", "max" ));
			
			// DOES NOT EXIST YET? INCLUDE optional VARIABLE FOR UNLIMITED HIGH-END VALUE?
			// INCLUDE SPORTS AND TAGS
			//console.dir(searchArray);
			reloadSearchContent(); 
			//searchArray['cash_roulation_low']
			
		}
	});
	$("#slider_cash_roulation #low").val($("#slider_cash_roulation #slider").slider("values", 0));
	$("#slider_cash_roulation #high").val($("#slider_cash_roulation #slider").slider("values", 1));

	$("#slider_active_players #slider").slider({
		range: true,
		min: 0,
		max: 500,
		values: [ 0, 500 ],
		slide: function( event, ui ) {
			$("#slider_active_players #low").val(ui.values[0]);
			$("#slider_active_players #high").val(ui.values[1]);
		},
		change: function (event, ui) {
			searchArray['active_players_low'] = $("#slider_active_players #slider").slider("values", 0);
			searchArray['active_players_high'] = $("#slider_active_players #slider").slider("values", 1);
			console.dir(searchArray);
		},
		stop: function ( event, ui ) {
			// update search field when the user drops the slider
			// OPTIONAL: include a delay. When user starts sliding within the delay time,
			// then do not update the search field until the user is done sliding again.
			
			searchArray['active_players_low'] = $("#slider_active_players #slider").slider("values", 0);
			searchArray['active_players_high'] = $("#slider_active_players #slider").slider("values", 1);
			searchArray['active_players_max'] = $( "#slider_active_players #slider" ).slider( "option", "max" );
			searchArray['active_players_min'] = $( "#slider_active_players #slider" ).slider( "option", "min" );
			console.dir(active_players);
			//getter
			
			reloadSearchContent(); // DOES NOT EXIST YET? INCLUDE optional VARIABLE FOR UNLIMITED HIGH-END VALUE?
			
			
		}
	});
	$("#slider_active_players #low").val($("#slider_active_players #slider").slider("values", 0));
	$("#slider_active_players #high").val($("#slider_active_players #slider").slider("values", 1));


	/*
	 * This section handles the search field functionality
	 */
	$("input#tag_search").autocomplete({
		source: "control/search.php",
		minLength: 2,
		select: function( event, ui ) {
			tag_ids[number_of_tag_ids] = number_of_tag_ids;
			$("ul#tag_search_tags").append("<li id=\""+number_of_tag_ids+"\" class=\"tag_search_tags ui-corner-all\"><span class=\"text\">"+ui.item.label+"</span><a class=\"close\"></a></li>");
			number_of_tag_ids++;
			searchArray['tags'].push(ui.item.label);
			//$(this).val("thijs");
		}
	});
	$("#tag_search_container #tag_search").focus(function() { if( $(this).val() == "Specific interest" ) { $(this).val(""); } }).blur(function() { if( $(this).val() == "" ) { $(this).val("Specific interest"); } });


	$("#tag_search_tags .tag_search_tags").live("click", function(event){
		tag_ids.splice($(this).attr('id'),1);
		$("ul#tag_search_tags li#"+$(this).attr('id')).remove();
	});

	/*
	 * Handles the clicks on other matches.
	 * Determines which activity_id was clicked,
	 * then loads the corresponding page.
	 */
	$(".live_matches_opt_item").live("click", function(event) {
		location.href='bet.php?aid='+$(this).attr('id');
	});
	$(".favourite_matches_opt_item").live("click", function(event) {
		location.href='bet.php?aid='+$(this).attr('id');
	});
	/*
	 * Handles the improved style for the <select> dropdown menu
	 */
	$('select#select_sport').customStyle();



	$("#m_prf_save_settings").live("click", function () {
		alert('ok');
		postNewAccountInfo();
	});


});





function ejectMenu(menu) {

	if (menu == 'profile') {
		// reload active matches
		reloadProfileRightContent('accbalance');
	}	
	if (menu == 'actm') {
		// reload active matches
		reloadActiveMatchesContent();
	}		
	if (menu == 'search') {
		reloadSearchContent();
	}
	if (menu == 'favs') {
		reloadFavourites();	
	}	
	
	$('div#m_'+menu+'_container').css('visibility','visible').animate({ left: 49 }, mUnfoldSpeed, function() { });
	$(".btn_"+menu).toggleClass("menu-open");
	isMenuOpen[menu] = true;
	$('div#menu_box_'+menu).children().removeClass('menu_box_'+menu).addClass(menu+'_open');
}

function retractMenu(menu) {
		$('div#m_'+menu+'_container').animate({ left: -menuWidths[menu]-49 }, mUnfoldSpeed, function() { });//.css('visibility','hidden');
		setTimeout("$('"+'div#m_'+menu+'_container'+"').css('visibility','hidden')", mUnfoldSpeed);
		//$(".btn_"+menu).removeClass("menu-open");
		isMenuOpen[menu] = false;
		$('div#menu_box_'+menu).children().addClass('menu_box_'+menu).removeClass(menu+'_open');

}

function toggleOverlay() {
	if (ovDisplayed) {
		$('#overlay').css({'visibility':'hidden'});
		//$('#overlay').animate({ opacity: '0.0' }, mUnfoldSpeed, function() { }).animate({ visibility: 'hidden'}, mUnfoldSpeed, function() { });
		//setTimeout("$('#overlay').css('visibility', 'hidden')", mUnfoldSpeed);
		ovDisplayed = false;
	} else {
		$('#overlay').css({'visibility':'visible'});
		//$('#overlay').css('visibility','visible').animate({ opacity: '0.9' }, mUnfoldSpeed, function() { });
		ovDisplayed = true;
	}
}



function retractAllMenus() {
	//console.dir(isMenuOpen);
	var t = false;
	for(var key in isMenuOpen) {
		if (isMenuOpen[key]) {
			retractMenu(key);
			t = true;
		}
	}
	return t;
}


function toggleFavouritedItem(id) {
	console.log("TETS"+id);
	data = { fitem: "fav", fid: id }
	$.ajax({
		type: 'POST',
		url: 'control/matches.php',
		cache: false,
		data: data,
		success: (function(d) { 
			
			if (d == 'loggedout') location.reload(); // standaard procedure when not logged in anymore

			//alert(d);
			//console.log(d);
			//console.log(d);
			reloadSearchContent();
		})
	});

}

function reloadProfileRightContent(mItem) {
	data = { mitem: mItem }
	//resize();
	//api2.reinitialise();

	clearAllActiveStates(); // remove all active states of left menu options
	$('#profile_options .prf_opt_item:first-child').addClass('active'); // set the active state to the clicked left menu option


	$.ajax({
		type: 'POST',
		url: 'control/menuitem.php',
		cache: false,
		data: data,
		beforeSend: function() { 
			$(".m_profile_right").html("<img src='view/std/img/general/spinner_right.gif' style='position: relative; left: "+(($(".m_profile_right").width()/2)-16)+"px;top: "+(($(".m_profile_right").height()/2)-16)+"px;' />"); 
		},
		success: (function(d) { 
			
			if (d == 'loggedout') location.reload(); // standaard procedure when not logged in anymore

			//console.log(d);
			$(".m_profile_right").html(d);
			Cufon.replace('.t_dosis');
			resize2();
			var pane2 = $('div#prf_opt_right_cnt'); 
			pane2.jScrollPane(settings2); 
			api2 = pane2.data('jsp');
			
		})
	});

	

}


function reloadFavourites(mItem) {
	data = { mitem: 'favs' }
	$.ajax({
		type: 'POST',
		url: 'control/menuitem.php',
		cache: false,
		data: data,
		beforeSend: function() { 
			$("#favourite_matches_options").html("<img src='view/std/img/general/spinner_left.gif' style='position: relative; left: "+(($(".m_favs_left").width()/2)-16)+"px;top: "+
					(
						( 
							($(".m_favs_left").height()-35)/2 )-16
					)+
					"px;' />"); 
			console.log("width: "+$(".m_favs_left").width() + ", height: "+$(".m_favs_left").height());
		},

		success: (function(d) { 
			
			if (d == 'loggedout') location.reload(); // standaard procedure when not logged in anymore

			//console.log(d);
			$("#favourite_matches_options").html(d);
			Cufon.replace('.t_dosis');
		})
	});

}

function reloadActiveMatchesContent() {
	data = { mitem: 'activematches' }
	$.ajax({
		type: 'POST',
		url: 'control/menuitem.php',
		cache: false,
		data: data,
		beforeSend: function() { 
			$("#live_matches_options").html("<img src='view/std/img/general/spinner_left.gif' style='position: relative; left: "+(($("#live_matches_options").width()/2)-16)+"px;top: "+
				(
					( 
						($(".m_actm_left").height()-35)/2 
					)-16
				)+
				"px;' />"); 
		},

		success: (function(d) { 
			
			if (d == 'loggedout') location.reload(); // standaard procedure when not logged in anymore

			//console.log(d);
			$("#live_matches_options").html(d);
			Cufon.replace('.t_dosis');
		})
	});

}

function reloadSearchContent() {
	var parameters = "mitem:'search'";
	var data = {
		mitem:'search', 
		sport:'false', 
		cash_roulation_low: searchArray['cash_roulation_low'], 
		cash_roulation_high: searchArray['cash_roulation_high'], 
		cash_roulation_min: searchArray['cash_roulation_min'], 
		cash_roulation_max: searchArray['cash_roulation_max'], 
		active_players_low: searchArray['active_players_low'], 
		active_players_high: searchArray['active_players_high'], 
		active_players_min: searchArray['active_players_min'], 
		active_players_max: searchArray['active_players_max']
	}
	
	for (var index in searchArray['tags']) {
		data["tags"+index] = searchArray['tags'][index];
	}

	//console.log(data);
	
	$.ajax({
		type: 'POST',
		url: 'control/menuitem.php',
		cache: false,
		data: data,
		beforeSend: function() { 
			$("#search_results").html("<img src='view/std/img/general/spinner_right.gif' style='position: relative; left: "+(($(".m_search_right").width()/2)-16)+"px;top: "+
					(
							( 
								($(".m_search_right").height()-35)/2 
							)-16
						)+
						"px;' />"); 
		},

		success: (function(d) { 
			
			if (d == 'loggedout') location.reload(); // standaard procedure when not logged in anymore

			$("#search_results").html(d);//show();
			Cufon.replace('.t_dosis');
		})
	});

}

/* handle registration submits */
function postNewProfileContent() {
	var rfirstname = $("#reg_first").val();
	var rlastname = $("#reg_last").val();
	var rday = $("#reg_day").val();
	var rmonth = $("#reg_month").val();
	var ryear = $("#reg_year").val();
	var ruser = $("#reg_user").val();
	var rpass = $("#reg_pass").val();
	var remail = $("#reg_email").val();
	var rname = rfirstname + " " + rlastname;

	data = { 
			subjoin: "1", 
			user: ruser, 
			pass: rpass,
			email: remail, 
			name: rname, 
			firstname: rfirstname,
			lastname: rlastname,
			day: rday,
			month: rmonth,
			year: ryear,
			country: "Netherlands"
	}
	console.log(data);

	//return false;
	$.ajax({
		type: 'POST',
		url: 'auth/process.php?'+$.now(),
		cache: false,
		data: data,
		success: (function(d) { 
			
			if (d == 'loggedout') location.reload(); // standaard procedure when not logged in anymore

			console.log(d);
			if (d.substr(0,1) == 0) {
				alert("Registration succesfull");

				// show login popup screen for security
				location.reload(); 
			} else {
				alert(d);
			} 

		})
	});
}    
function clearAllActiveStates() {
	$(".prf_opt_item").removeClass("active");
}


/* handle account updates */
function postNewAccountInfo() {
	var rfirstname = $("#acc_first").val();
	var rlastname = $("#acc_last").val();
	var rday = $("#acc_day").val();
	var rmonth = $("#acc_month").val();
	var ryear = $("#acc_year").val();
	//var rpass = $("#acc_pass").val();
	var remail = $("#acc_email").val();
	var rcountry = $("#acc_country").val();

	data = { 
			subedit: "1", 
			//pass: rpass,
			email: remail, 
			firstname: rfirstname,
			lastname: rlastname,
			day: rday,
			month: rmonth,
			year: ryear,
			country: rcountry
	}
	console.log(data);

	//return false;
	$.ajax({
		type: 'POST',
		url: 'auth/process.php?'+$.now(),
		cache: false,
		data: data,
		success: (function(d) { 
			
			if (d == 'loggedout') location.reload(); // standaard procedure when not logged in anymore

			console.log(d);
			/*
			if (d.substr(0,1) == 0) {
				alert("Registration succesfull");

				// show login popup screen for security
				location.reload(); 
			} else {
				alert(d);
			} 
			 */

		})
	});
}   
