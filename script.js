/*
	Displays a notification with the current sales balance for an Envato marketplace user
	permission in the manifest file (or calling
	"Notification.requestPermission" beforehand).
*/

	// Show the config file on installation
	chrome.runtime.onInstalled.addListener(function (object) {
		var url = chrome.extension.getURL("options.html");
		chrome.tabs.create({url: url}, function (tab) {});
	});

	// Test for notification support.
	if (window.Notification) {

		// While activated, show notifications at the display frequency.
		 get_sales();
		setInterval(function() {
			get_sales();
		}, 60000);
	}



	// MAIN FUNCTION
	function get_sales() {

		var EnvatoUsername = localStorage.EnvatoUsername;
		var EnvatoAPI = localStorage.EnvatoAPI;
		var SavedBalance = localStorage.balance;

		if ( typeof EnvatoUsername == 'undefined' || typeof EnvatoAPI == 'undefined' ) {
			return false;
		}

		// Use Envato API to check sales
		$.get('http://marketplace.envato.com/api/v3/'+EnvatoUsername+'/'+EnvatoAPI+'/vitals.json', function (data) {

			//get current sales

			var balance = data.vitals.balance;

			// Uncomment this if you want to test
			// show_notification( balance, 'item' );
			// chachingIT();

			if ( SavedBalance < balance ){
				show_notification( balance, 'item' );
				chachingIT();
			}

			localStorage.balance = balance;

		});

	}

	// Play a sound when the balance was changed
	function chachingIT() {
		if ($('#zn-cha-ching').length) $('#zn-cha-ching').remove();
		$('<audio id="zn-cha-ching" autoplay><source src="cha-ching.ogg" type="audio/ogg"></source><source src="cha-ching.mp3" type="audio/mpeg"></source></audio>').appendTo('body');
	}

	function show_notification( balance, item ){

		new Notification( 'New sale !', {
			icon: '48.png',
			body: 'Your current ballance is '+balance+'$'
		});

	}