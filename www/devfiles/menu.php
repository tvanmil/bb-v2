<?php

if ( $_GET['type'] === 'profile' && $_GET['subitem'] === 'accountbalance' ) {
	echo '{"balance":50,"investment":50,"profit":50,"checkout":50,"transactions":[{"date":"13/10/01","time":"18:40","debitcredit":"credit","amount":"+ &euro; 50.00","description":"Initial payment.","balance":"€ 50.00"},{"date":"13/10/01","time":"18:40","debitcredit":"credit","amount":"+ &euro; 50.00","description":"Initial payment.","balance":"€ 50.00"}]}';
}

if ( $_GET['type'] === 'profile' && $_GET['subitem'] === 'personalinformation' ) {
	echo '{"balance":50,"investment":50,"profit":50,"checkout":50,"transactions":[{"date":"13/10/01","time":"18:40","debitcredit":"credit","amount":"+ &euro; 50.00","description":"Initial payment.","balance":"€ 50.00"},{"date":"13/10/01","time":"18:40","debitcredit":"credit","amount":"+ &euro; 50.00","description":"Initial payment.","balance":"€ 50.00"}]}';
}

if ( $_GET['type'] === 'profile' && $_GET['subitem'] === 'playedmatches' ) {
	echo '{"balance":50,"investment":50,"profit":50,"checkout":50,"transactions":[{"date":"13/10/01","time":"18:40","debitcredit":"credit","amount":"+ &euro; 50.00","description":"Initial payment.","balance":"€ 50.00"},{"date":"13/10/01","time":"18:40","debitcredit":"credit","amount":"+ &euro; 50.00","description":"Initial payment.","balance":"€ 50.00"}]}';
}

if ( $_GET['type'] === 'activematches' ) {
	echo '[{"description":"Nederland - Italië","date":"2013/10/28","time":"20:30"},{"description":"Nederland - Duitsland","date":"2013/10/29","time":"21:30"}]';
}



?>