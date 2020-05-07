window.addEventListener('DOMContentLoaded', (event) => {
	load();
});

window.addEventListener('DOMContentLoaded', (event) => {
	const sendBtn = document.getElementById('sendMsg');
	sendBtn.addEventListener('click', sendMsg);
});

function sendMsg() {
	const msg = document.getElementById('messageText').value;
	if (msg !== '') {
		const sentMsg = { message : msg };
		document.getElementById('messageText').value = '';
		$.ajax({
			type: 'POST',
			url: '/urltosendmsg',
			data: sentMsg,
			success: function(data) {
				load();
			},
			error: function () {
				alert('error sending message!');
			}
		});
	}
}

setInterval(load, 4000);

function load() {
	const elementSlct = document.querySelector('.person').getAttribute('id');
	let from_arr = new Array;
	let to_arr = new Array;
	let send = { email: 'yf123124124@2523.com' }; //hardcoded

	$.ajax({
		type: 'POST',
		url: '/data',
		data: send,
		success: function(data) {
			if (data[1].length !== 0 && data[0].length !== 0) {
				data[1].forEach(element => {
					from_arr += `<div id=\"text-receive\" class=\"text-left\"><p class=\"mb-0\">${element.message}</p><p class=\"msgInfo\">from ${element.from} at ${element.time}</p></div>`;
				});
				$('#text-r').html(from_arr);
				data[0].forEach(element => {
					to_arr += `<div id=\"text-send\" class=\"text-right\"><p class=\"mb-0\">${element.message}</p><p class=\"msgInfo\">from ${element.from} at ${element.time}</p></div>`;
				});
				$('#text-s').html(to_arr);
			} else {
				let noRes = '<h6 class=\"text-center\">There are no messsages here! Start a chat</h6>';
				$('#text-none').html(noRes);
			}
        },
		error: function () {
			alert('error loading messages!');
		}
	});
};