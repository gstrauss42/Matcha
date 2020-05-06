setInterval(load, 3000);

function load() {
	console.log('loading...');
	let from_messages = new Array;
	let to_messages = new Array;
	let from_arr = new Array;
	let to_arr = new Array;
	let send = 'yf123124124@2523.com'; //hardcoded

	$.ajax({
		type: 'POST',
		url: '/data',
		data: send,
		success: function(data) {
			console.log('getting stuff: ', data);
			// from_messages.forEach(element => {
			// 	from_arr += `<p class=\"mb-0\">${element.message}</p><p class=\"msgInfo\">from ${element.from} at ${element.time}</p>`;
			// });
			// $('#text-receive').html(from_arr);
			// to_messages.forEach(element => {
			// 	to_arr += `<p class=\"mb-0\">${element.message}</p><p class=\"msgInfo\">from ${element.from} at ${element.time}</p>`;
			// });
			// $('#text-send').html(to_arr);
        },
		error: function () {
			alert('error loading!');
		}
	});
};