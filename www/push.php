<?php

require('libraries/Pusher.php');
$app_id = '53997';
$key = 'de4807612efef0b72d12';
$secret = '28fa979742efbfc8230d';



var_dump($_POST);

if ($_POST['type'] == 'setNewScore') {
	if (!isset($_POST['scoreHome']) || !isset($_POST['scoreAway'])) {
		die('A0');
	}
	$h = $_POST['scoreHome'];
	$a = $_POST['scoreAway'];
	$array = array( "type" => "setNewScore","scoreHome" => $h,"scoreAway" => $a );
}

if ($_POST['type'] == 'pushMarketInfo') {
	if (!isset($_POST['players']) || !isset($_POST['invested'])) {
		die('B0');
	}
	$a = $_POST['players'];
	$b = $_POST['invested'];
	$array = array( "type" => "pushMarketInfo","players" => $a,"invested" => $b );
}

if ($_POST['type'] == 'pushStockPrice') {
	if (!isset($_POST['0']) || !isset($_POST['1']) || !isset($_POST['2'])) {
		die('C0');
	}
	$a = $_POST['0'];
	$b = $_POST['1'];
	$c = $_POST['2'];
	$array = array( "type" => "pushStockPrice", "data" => array($a, $b, $c)  );
}

$pusher = new Pusher($key, $secret, $app_id);

$pusher->trigger('test_channel', 'my_event', $array );

?>