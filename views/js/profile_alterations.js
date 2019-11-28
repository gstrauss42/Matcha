
window.addEventListener('DOMContentLoaded', (event) => {
	
	// When a person wants to edit their bio and clicks the gear
	document.getElementById("alter-bio").addEventListener("mouseover", () => applyOverlay("alter-bio"));
	document.getElementById("alter-bio").addEventListener("mouseout", () => removeOverlay("alter-bio"));
	document.getElementById("alter-bio").addEventListener("click", function () {
		alert('Altering bio in progress');
	});

	// The following is adding and removing overlays to images as well as upload(click) events
	document.getElementById("main-profile-img").addEventListener("mouseover", () => applyOverlay("main-profile-img"));
	document.getElementById("main-profile-img").addEventListener("mouseout", () => removeOverlay("main-profile-img"));
	document.getElementById("main-profile-img").addEventListener("click", function () {
		
	});

	document.getElementById("profile-img-two").addEventListener("mouseover", () => applyOverlay("profile-img-two"));
	document.getElementById("profile-img-two").addEventListener("mouseout", () => removeOverlay("profile-img-two"));
	document.getElementById("profile-img-two").addEventListener("click", function () {
		
	});

	document.getElementById("profile-img-three").addEventListener("mouseover", () => applyOverlay("profile-img-three"));
	document.getElementById("profile-img-three").addEventListener("mouseout", () => removeOverlay("profile-img-three"));
	document.getElementById("profile-img-three").addEventListener("click", function () {
		
	});

	document.getElementById("profile-img-four").addEventListener("mouseover", () => applyOverlay("profile-img-four"));
	document.getElementById("profile-img-four").addEventListener("mouseout", () => removeOverlay("profile-img-four"));
	document.getElementById("profile-img-four").addEventListener("click", function () {
		
	});

	document.getElementById("profile-img-five").addEventListener("mouseover", () => applyOverlay("profile-img-five"));
	document.getElementById("profile-img-five").addEventListener("mouseout", () => removeOverlay("profile-img-five"));
	document.getElementById("profile-img-five").addEventListener("click", function () {
		
	});

});

function applyOverlay(id) {
	document.getElementById(id).style.opacity = "0.5";
}

function removeOverlay(id) {
	document.getElementById(id).style.opacity = "1";
}