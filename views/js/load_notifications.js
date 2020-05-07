window.addEventListener('DOMContentLoaded', (event) => {
	console.log('loaded');
	load_notifs();
});

setInterval(load_notifs, 3000);

function load_notifs() {
	console.log('entered');

	data = 3; //temp
	if (data) {
		let notifs = `<span class=\"badge badge-dark\">${data}</span>`;
		$('#notifBell').html(notifs);
	}

	// $.ajax({
	// 	type: 'GET',
	// 	url: '/live_notifications',
	// 	success: function(data) {
	// 		data = 3; //temp
	// 		if (data) {
	// 			let notifs = `<span class=\"badge badge-dark\">${data}</span>`;
	// 			$('#notifBell').html(notifs);
	// 		} else {
	// 			console.log('no data recieved - notifications');
	// 		}
    //     },
	// 	error: function () {
	// 		console.log('error loading notifications!');
	// 	}
	// });
}