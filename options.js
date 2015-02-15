$(function() {

	// Save the options
	$("#options").submit( function(e) {

		//prevent Default functionality
		e.preventDefault();

		var $inputs = $('#options :input');

		$inputs.each(function() {
			localStorage[this.name] = $(this).val();
		});

		get_sales();

		// $( "<div class='znsaved'>Options saved</div>" ).insertAfter( "#bottom" );

		// setTimeout(function(){
		// 	$( ".znsaved" ).fadeOut( "slow", function() {
		// 		$( ".znsaved" ).remove();
		// 	});
		// }, 1000);

	});

});

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
			show_notification( balance, 'item' );
			localStorage.balance = balance;

		});

	}

	function show_notification( balance, item ){

		new Notification( 'Options saved', {
			icon: '48.png',
			body: 'Your current ballance is '+balance+'$'
		});

	}


// Set the options 
window.addEventListener( 'load', function() {

	var $inputs = $('#options :input');
	$inputs.each(function() {
		if ( typeof localStorage[this.name] != 'undefined' ) {
			$(this).val( localStorage[this.name] );
		}
	});

});
