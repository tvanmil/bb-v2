/**
 * Flipclock by Adem Ilter
 * @author Adem Ilter http://ademilter.com/
 */

function scoreSingleSet(homeaway, score) {
	$("body .scoreBoard ."+homeaway).removeClass("play");
	//var aa = $("ul.secondPlay li.active");
		aa = $(".scoreBoard ."+homeaway+" ul.secondPlay li").eq(0);
		bb = $(".scoreBoard ."+homeaway+" ul.secondPlay li").eq(score-1);
		aa.addClass("before")
			.removeClass("active");
		bb.addClass("active")
			.closest("body")
			.addClass("play");
}

function scoreDoubleSet(homeaway, score) {
	$("body .scoreBoard ."+homeaway).removeClass("play");
		aa = $(".scoreBoard ."+homeaway+" ul.minutePlay li").eq(0);
		bb = $(".scoreBoard ."+homeaway+" ul.minutePlay li").eq(score-1);
		aa.addClass("before")
			.removeClass("active");
		bb.addClass("active")
			.closest("body")
			.addClass("play");
}


function scoreSingleUp(homeaway) {
	$("body .scoreBoard ."+homeaway).removeClass("play");
	var aa = $(".scoreBoard ."+homeaway+" ul.secondPlay li.active");

	if (aa.html() === undefined) {
		aa = $(".scoreBoard ."+homeaway+" ul.secondPlay li").eq(0);
		aa.addClass("before")
			.removeClass("active")
			.next("li")
			.addClass("active")
			.closest("body")
			.addClass("play");
	}
	else if (aa.is(":last-child")) {
		$(".scoreBoard ."+homeaway+" ul.secondPlay li").removeClass("before");
		aa.addClass("before").removeClass("active");
		aa = $(".scoreBoard ."+homeaway+" ul.secondPlay li").eq(0);
		aa.addClass("active")
			.closest("body")
			.addClass("play");
			scoreDoubleUp(homeaway);
	}
	else {
		$(".scoreBoard ."+homeaway+" ul.secondPlay li").removeClass("before");
		aa.addClass("before")
			.removeClass("active")
			.next("li")
			.addClass("active")
			.closest("body")
			.addClass("play");
	}
}

function scoreDoubleUp(homeaway) {
	$("body .scoreBoard ."+homeaway).removeClass("play");
	var aa = $(".scoreBoard ."+homeaway+" ul.minutePlay li.active");

	if (aa.html() === undefined) {
		aa = $(".scoreBoard ."+homeaway+" ul.minutePlay li").eq(0);
		aa.addClass("before")
			.removeClass("active")
			.next("li")
			.addClass("active")
			.closest("body")
			.addClass("play");
	}
	else if (aa.is(":last-child")) {
		$(".scoreBoard ."+homeaway+" ul.minutePlay li").removeClass("before");
		aa.addClass("before").removeClass("active");
		aa = $(".scoreBoard ."+homeaway+" ul.minutePlay li").eq(0);
		aa.addClass("active")
			.closest("body")
			.addClass("play");
	}
	else {
		$(".scoreBoard ."+homeaway+" ul.minutePlay li").removeClass("before");
		aa.addClass("before")
			.removeClass("active")
			.next("li")
			.addClass("active")
			.closest("body")
			.addClass("play");
	}
}
