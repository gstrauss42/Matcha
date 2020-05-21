// on page load fetch suggestions
window.addEventListener('DOMContentLoaded', (event)  => {
	loadStr = `<h5 class=\"ml-4 mb-3\">Loading suggestions...</h5>`;
	$('#filterStr').html(loadStr);
	fetchSuggestions();
});

// holds initial and advanced matches results
let globalRes = new Array;
// hold current users tags
let globalTags = new Array;
// holds the filtered results of globalRes
let filteredRes = new Array;
// current user used for filtering
let globalCurrUser;

// sets event listeners on buttons once globalRes is established for the first time on page load
function setVariables() {
	const advancedBtn = document.getElementById('advancedBtn');
	const orderBtn = document.getElementById('sortBtn');
	const filterBtn = document.getElementById('filterBtn');
	advancedBtn.addEventListener('click', fetch_advanced);
	orderBtn.addEventListener('click', order_results);
	filterBtn.addEventListener('click', filter_results);
}

function displayResults(arr) {

	// check if either filteredRes or globalRes sent through has users
	if (arr.length !== 0 || filteredRes[0] !== 'noresults') {
		let resultsArr = new Array;
	
		arr.forEach(element => {
			if (element.main_image) {
				if (element.bio) {
					resultsArr += `<form action="matched_profile" method="post" id=${element._id}>
									<input type="hidden" name="unique" value="1" />
									<input type="hidden" name="_id" value=${element._id} />
									<div class="alert alert-primary alert-dismissible fade show ml-4 mr-4" role="alert">
										<div class="media">
											<a href="javascript: submitform('${element._id}')">
												<img class="rounded mr-2 search-profile" src="data:image/*;base64,${element.main_image}" alt="profile_image"/>
											</a>
											<div class="media-body">
												<a href="javascript: submitform('${element._id}')">
													<strong class="custom-username">${element.username}</strong>
												</a>
												<p class="search-profile-descrip mb-0">${element.bio}</p>
											</div>
										</div>
									</div>
								</form>`;
				} else {
					resultsArr += `<form action="matched_profile" method="post" id=${element._id}>
									<input type="hidden" name="unique" value="1" />
									<input type="hidden" name="_id" value=${element._id} />
									<div class="alert alert-primary alert-dismissible fade show ml-4 mr-4" role="alert">
										<div class="media">
											<a href="javascript: submitform('${element._id}')">
												<img class="rounded mr-2 search-profile" src="data:image/*;base64,${element.main_image}" alt="profile_image"/>
											</a>
											<div class="media-body">
												<a href="javascript: submitform('${element._id}')">
													<strong class="custom-username">${element.username}</strong>
												</a>
											</div>
										</div>
									</div>
								</form>`;
				}
			} else {
				if (element.bio) {
					resultsArr += `<form action="matched_profile" method="post" id=${element._id}>
									<input type="hidden" name="unique" value="1" />
									<input type="hidden" name="_id" value=${element._id} />
									<div class="alert alert-primary alert-dismissible fade show ml-4 mr-4" role="alert">
										<div class="media">
											<a href="javascript: submitform('${element._id}')">
												<img class="rounded mr-2 search-profile" src="user.jpg" alt="profile_image"/>
											</a>
											<div class="media-body">
												<a href="javascript: submitform('${element._id}')">
													<strong class="custom-username">${element.username}</strong>
												</a>
												<p class="search-profile-descrip mb-0">${element.bio}</p>
											</div>
										</div>
									</div>
								</form>`;
				} else {
					resultsArr += `<form action="matched_profile" method="post" id=${element._id}>
									<input type="hidden" name="unique" value="1" />
									<input type="hidden" name="_id" value=${element._id} />
									<div class="alert alert-primary alert-dismissible fade show ml-4 mr-4" role="alert">
										<div class="media">
											<a href="javascript: submitform('${element._id}')">
												<img class="rounded mr-2 search-profile" src="user.jpg" alt="profile_image"/>
											</a>
											<div class="media-body">
												<a href="javascript: submitform('${element._id}')">
													<strong class="custom-username">${element.username}</strong>
												</a>
											</div>
										</div>
									</div>
								</form>`;
				}
			}
		});
		$('#searchResultsBox').html(resultsArr);
	} else {
		$('#searchResultsBox').html('');	
	}
}

function buildCustomMsg(resCount, tags, rating, age, location) {
	let userMsg;
	// if no input was given but advanced match btn was pressed, else calc msg
	if (tags.length == 0 && rating == '' && age == '' && location == '') {
		if (resCount > 1) {
			userMsg = `<p class=\"ml-4 mb-3\">Showing ${resCount} results`;
		} else {
			userMsg = `<p class=\"ml-4 mb-3\">Showing ${resCount} result`;
		}
	} else {
		if (resCount > 1) {
			userMsg = `<p class=\"ml-4 mb-3\">Showing ${resCount} results for `;
		} else {
			userMsg = `<p class=\"ml-4 mb-3\">Showing ${resCount} result for `;
		}
		if (age !== '') {
			userMsg += `age gap = <b>'${age}'</b> `;
		}
		if (location !== '') {
			userMsg += `location = <b>'${location}'</b> `;
		}
		if (rating !== '') {
			userMsg += `fame rating gap = <b>'${rating}'</b> `;
		}
		if (tags.length !== 0) {
			let i = 0;
			while (tags[i]) {
				if (i == 0)
					userMsg += `tags = <b>'${tags[i]}'</b> `;
				else
					userMsg += `<b>'${tags[i]}'</b> `;
				i++;
			}
		}
	}
	userMsg += '</p>';
	return userMsg;
}

function fetchSuggestions() {

	let loadStr;

	$.ajax({
		type: 'POST',
		url: '/search/fetchResults',
		success: function (ret) {

			globalRes = ret.matches;
			globalTags = ret.tags;
			globalCurrUser = ret.currUser;
			setVariables();

			if (ret.matches.length !== 0) {
				displayResults(ret.matches);
				if (ret.matches.length > 1)
					loadStr = `<p class=\"ml-4 mb-3\">Showing ${ret.matches.length} suggestions</p>`;
				else
					loadStr = `<p class=\"ml-4 mb-3\">Showing ${ret.matches.length} suggestions</p>`;
				$('#filterStr').html(loadStr);
			} else {
				loadStr = `<h6 class=\"ml-4 mb-3\">No suggestions at this moment! Try an advanced search.</h6>`;
				$('#filterStr').html(loadStr);
			}
		},
		error: function () {
			loadStr = `<h5 class=\"ml-4 mb-3\">Error loading suggestions!</h5>`;
			$('#filterStr').html(loadStr);
		}
	});
}

function fetch_advanced() {
	const ageInput = document.getElementById('age').value;
	const locationInput = document.getElementById('location').value;
	const ratingInput = document.getElementById('rating').value;

	let resultsArr = new Array;
	let tagArr = new Array;
	let searchObj = new Object;
	let loadStr;
	let i = 0;

	while (globalTags[i]) {
		let check = document.getElementById(globalTags[i]).checked;
		if (check) {
			tagArr.push(globalTags[i]);
		}
		i++;
	}

	resultsArr = '';
	$('#searchResultsBox').html(resultsArr);
	loadStr = `<h5 class=\"ml-4\">Loading...</h5>`;
	$('#filterStr').html(loadStr);
	searchObj.advanced_search = '1';

	if (ageInput !== '') {
		searchObj.age = ageInput;
	}
	if (locationInput !== '') {
		searchObj.location = locationInput;
	}
	if (ratingInput !== '') {
		searchObj.rating = ratingInput;
	}
	if (tagArr.length !== 0) {
		searchObj.color = tagArr;
	}

	$.ajax({
		type: 'POST',
		url: '/search/fetchResults',
		data: searchObj,
		success: function (ret) {

			globalRes = ret.matches;
			globalTags = ret.tags;
			globalCurrUser = ret.currUser;
			filteredRes = [];
			setVariables();

			if (ret.matches.length !== 0) {
				displayResults(ret.matches);
				loadStr = buildCustomMsg(ret.matches.length, tagArr, ratingInput, ageInput, locationInput);
				$('#filterStr').html(loadStr);
			} else {
				loadStr = `<h6 class=\"ml-4 mb-3\">No results at this moment!</h6>`;
				$('#filterStr').html(loadStr);
			}
		},
		error: function () {
			loadStr = `<h5 class=\"ml-4 mb-3\">Error loading results!</h5>`;
			$('#filterStr').html(loadStr);
		}
	});
}

function order_results() {
	const sortInput = document.getElementById('slctSort').value;
	const orderInput = document.getElementById('slctOrdr').value;

	$('#searchResultsBox').html('');
	orderedArr = new Array;

	// check if the globalRes has been filtered - if true then order the filteredRes
	if (filteredRes.length !== 0) {
		orderedArr = filteredRes.sort(compareValues(sortInput, orderInput));
		console.log('using filtered res');
	} else if (filteredRes[0] !== 'noresults') {
		orderedArr = globalRes.sort(compareValues(sortInput, orderInput));
		console.log('using global res');
	}
	displayResults(orderedArr);

	if (orderedArr.length > 1 || orderedArr.length == 0)
		loadStr = `<p class=\"ml-4 mb-3\">Showing ${orderedArr.length} results for <b>${sortInput}</b> ordered ${orderInput}</p>`;
	else if (orderedArr[0] == 'noresults')
		loadStr = '<h6 class=\"ml-4 mb-3\">No results</h6>';
	else
		loadStr = `<p class=\"ml-4 mb-3\">Showing ${orderedArr.length} result for <b>${sortInput}</b> ordered ${orderInput}</p>`;
	$('#filterStr').html(loadStr);
}

// sorting function by ascending or descending. Takes a dynamic object property : key
function compareValues(key, order) {

	return function innerSort(a, b) {

		if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
			return 0;
		}

		let propertyOne = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key];
		let propertyTwo = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key];
		let comparison = 0;

		if (key == 'location') {
			cityOne = a[key].split(',');
			cityTwo = b[key].split(',');
			propertyOne = cityOne[0].trim();
			propertyTwo = cityTwo[0].trim();
		}

		if (propertyOne > propertyTwo) {
			comparison = 1;
		} else if (propertyOne < propertyTwo) {
			comparison = -1;
		}

		return((order === 'descending') ? (comparison * -1) : comparison);
	};
}

function filter_results() {
	let i = 0;
	let allUsers = [...globalRes];
	const filterInput = document.getElementById('slctFltr').value;

	// filtering out unsuitable users according to filter parameter
	while (allUsers[i]) {
		if (allUsers[i][filterInput] !== globalCurrUser[filterInput]) {
			console.log('removed user from allUsers array due to filtering: ', allUsers[i].username);
			allUsers.splice(i, 1);
		} else {
			i++;
		}
	};
	// save filtered results in global array
	filteredRes = [...allUsers];
	displayResults(allUsers);

	if (allUsers.length !== 0) {
		if (allUsers.length > 1)
			loadStr = `<p class=\"ml-4 mb-3\">Showing ${allUsers.length} filtered results</p>`;
		else
			loadStr = `<p class=\"ml-4 mb-3\">Showing ${allUsers.length} filtered result</p>`;
		$('#filterStr').html(loadStr);
	} else {
		// save this so that when ordering an empty filtered result array it won't resort to globalRes
		filteredRes[0] = 'noresults';

		loadStr = `<h6 class=\"ml-4 mb-3\">No results</h6>`;
		$('#filterStr').html(loadStr);
	}
}

// function to clear filters and display original results again
function clearFilters() {
	filteredRes = [];
	displayResults(globalRes);
}