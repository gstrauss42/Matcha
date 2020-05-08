window.addEventListener('DOMContentLoaded', (event)  => {
	fetch_notifs();
});

function fetch_notifs() {
	notifArr = new Array;

	$.ajax({
		type: 'POST',
		url: '/live_notifications',
		success: function (data) {
			if (data.length !== 0) {
				data.forEach(element => {
					notifArr += `<div class=\"alert alert-info alert-dismissible fade show ml-4 mr-4 pb-0\" role="alert">
									<strong class=\"mr-2\">${element.name}</strong><small>${element.time}</small>
									<p class=\"mb-0 notifContent\">${element.content}</p>
									<form action="notifications" method="post">
										<input type="hidden" name="identifier" />
										<button class=\"close\" type="submit" name="dismiss" data-dismiss="alert" aria-label="Close">
											<span aria-hidden="true">&times;</span>
										</button>
									</form>
								</div>`;
				});
				if (data.length == 1)
					heading = `<strong class=\"mb-2\">You have ${data.length} notification!</strong>`;
				else
					heading = `<strong class=\"mb-2\">You have ${data.length} notifications!</strong>`;
				$('#notifHead').html(heading);
				$('#notifBox').html(notifArr);
			} else {
				heading = `<strong class=\"mb-2\">You have no notifications!</strong>`;
				$('#notifHead').html(heading);
			}
		},
		error: function () {
			console.log('error loading notifications!');
		}
	});
}

setInterval(fetch_notifs, 3000);