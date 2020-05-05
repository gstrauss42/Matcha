setInterval(load, 3000);

function load() {
	console.log('loading...');
	let from_messages = new Array;
	let to_messages = new Array;
	let from_arr = new Array;
	let to_arr = new Array;

	// query DB here for messages
	// must return two arrays of sent and recieved messages
	// each message object must contain the messgae, who its from and time sent

	from_messages.forEach(element => {
		from_arr += `<p class=\"mb-0\">${element.message}</p><p class=\"msgInfo\">from ${element.from} at ${element.time}</p>`;
	});
	$('#text-receive').html(from_arr);
	to_messages.forEach(element => {
		to_arr += `<p class=\"mb-0\">${element.message}</p><p class=\"msgInfo\">from ${element.from} at ${element.time}</p>`;
	});
	$('#text-send').html(to_arr);
};