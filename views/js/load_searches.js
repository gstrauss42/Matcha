window.addEventListener('DOMContentLoaded', (event)  => {
	loadStr = `<h5 class=\"ml-4 mb-3\">Loading suggestions...</h5>`;
	$('#filterStr').html(loadStr);
	fetch_suggestions();
});

let globalRes;
let globalTags;

function fetch_suggestions() {

	let resultsArr = new Array;
	let loadStr;

	$.ajax({
		type: 'POST',
		url: '/search/fetchResults',
		success: function (ret) {
			globalRes = ret.basic_matches;
			globalTags = ret.tags;
			setVariables();
			if (ret.basic_matches.length !== 0) {
				ret.basic_matches.forEach(element => {
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
				if (ret.basic_matches.length > 1)
					loadStr = `<p class=\"ml-4 mb-3\">Showing ${ret.basic_matches.length} suggestions</p>`;
				else
					loadStr = `<p class=\"ml-4 mb-3\">Showing ${ret.basic_matches.length} suggestions</p>`;
				$('#filterStr').html(loadStr);
				$('#searchResultsBox').html(resultsArr);
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
			globalRes = ret.advanced_matches;
			globalTags = ret.tags;
			setVariables();
			if (ret.advanced_matches.length !== 0) {
				ret.advanced_matches.forEach(element => {
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
				loadStr = buildCustomMsg(ret.advanced_matches.length, tagArr, ratingInput, ageInput, locationInput);
				$('#filterStr').html(loadStr);
				$('#searchResultsBox').html(resultsArr);
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

function buildCustomMsg(resCount, tags, rating, age, location) {
	let userMsg;
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
	userMsg += '</p>';
	return userMsg;
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