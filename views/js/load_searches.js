window.addEventListener('DOMContentLoaded', (event)  => {
	loadStr = `<h5 class=\"ml-4\">Loading suggestions...</h5>`;
	$('#filterStr').html(loadStr);
	fetch_suggestions();
});

let globalRes;
let globalTags;

function fetch_suggestions() {
	$.ajax({
		type: 'POST',
		url: '/search/fetchResults',
		success: function (ret) {
			globalRes = ret.basic_matches;
			globalTags = ret.tags;
			setVariables();
			if (ret.basic_matches.length !== 0) {
				// create html here
				loadStr = `<h5 class=\"ml-4\">Found users.</h5>`;
				$('#filterStr').html(loadStr);
			} else {
				loadStr = `<h5 class=\"ml-4\">No suggestions at this moment! Try an advanced search.</h5>`;
				$('#filterStr').html(loadStr);
			}
		},
		error: function () {
			loadStr = `<h5 class=\"ml-4\">Error loading suggestions.</h5>`;
			$('#filterStr').html(loadStr);
		}
	});
}

function setVariables() {
	const advancedBtn = document.getElementById('advancedBtn');
	const orderBtn = document.getElementById('sortBtn');
	const filterBtn = document.getElementById('filterBtn');
	advancedBtn.addEventListener('click', fetch_advanced);
	orderBtn.addEventListener('click', order_results);
	filterBtn.addEventListener('click', filter_results);
}

function fetch_advanced() {
	const ageInput = document.getElementById('age').value;
	const locationInput = document.getElementById('location').value;
	const ratingInput = document.getElementById('rating').value;
	console.log('advanced function called: ', ageInput, locationInput, ratingInput);
	// determine selected tag global tags
	// determine what was sent
	// send ajax post request
	// set global res
}

function order_results() {
	const sortInput = document.getElementById('slctSort').value;
	const orderInput = document.getElementById('slctOrdr').value;
	console.log('order function called: ', sortInput, orderInput);
	// orders global res
}

function filter_results() {
	const filterInput = document.getElementById('slctFltr').value;
	console.log('filter function called: ', filterInput);
	// filters global res
}








































// function determineFilterStr(req) {
//     return '';
// }

// function compareValues(key, order) {

//     return function innerSort(a, b) {

//         if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
//             return 0;
//         }
        
//         let propertyOne = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key];
//         let propertyTwo = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key];
//         let comparison = 0;
//         if (key == 'location') {
//             propertyOne = a[key].split(',').trim();
//             propertyTwo = b[key].split(',').trim();
//             console.log('comparing two locations: ', propertyOne, propertyTwo);
//         }

//         if (propertyOne > propertyTwo) {
//             comparison = 1;
//         } else if (propertyOne < propertyTwo) {
//             comparison = -1;
//         }

//         return((order === 'desc') ? (comparison * -1) : comparison);
//     };
// }

// do ordering here
// if (req.body.filter && req.body.order) {
//     if (req.body.filter == 'age') {
//         orderedArr = users.sort(compareValues('age', req.body.order));
//         console.log('sorted by age');
//     } else if (req.body.filter == 'location') {
//         orderedArr = users.sort(compareValues('location', req.body.order));
//         console.log('sorted by location');
//     } else if (req.body.filter == 'fame') {
//         orderedArr = users.sort(compareValues('fame', req.body.order));
//         console.log('sorted by fame');
//     } else if (req.body.filter == 'tags') {
//         orderedArr = users.sort(compareValues('tags', req.body.order));
//         console.log('sorted by common tags');
//     }
// }