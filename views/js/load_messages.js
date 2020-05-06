window.addEventListener('DOMContentLoaded', (event) => {
	load();
});

setInterval(load, 4000);

function load() {
	let from_messages = new Array;
	let to_messages = new Array;
	let from_arr = new Array;
	let to_arr = new Array;
	let send = { email: 'yf123124124@2523.com' }; //hardcoded

	$.ajax({
		type: 'POST',
		url: '/data',
		data: send,
		success: function(data) {
			console.log('getting stuff: ', data);
			data[1].forEach(element => {
				from_arr += `<div id=\"text-receive\" class=\"text-left\"><p class=\"mb-0\">${element.message}</p><p class=\"msgInfo\">from ${element.from} at ${element.time}</p></div>`;
			});
			$('#text-r').html(from_arr);
			data[0].forEach(element => {
				to_arr += `<div id=\"text-send\" class=\"text-right\"><p class=\"mb-0\">${element.message}</p><p class=\"msgInfo\">from ${element.from} at ${element.time}</p></div>`;
			});
			$('#text-s').html(to_arr);
        },
		error: function () {
			alert('error loading!');
		}
	});
};