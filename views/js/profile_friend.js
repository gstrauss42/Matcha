window.addEventListener('DOMContentLoaded', (event) => {

	// adding and removing overlays to images (personal profile)
	document.getElementById("main-profile-img").addEventListener("mouseover", () => applyOverlay("main-profile-img"));
	document.getElementById("main-profile-img").addEventListener("mouseout", () => removeOverlay("main-profile-img"));

	document.getElementById("two").addEventListener("mouseover", () => applyOverlay("two"));
	document.getElementById("two").addEventListener("mouseout", () => removeOverlay("two"));

	document.getElementById("three").addEventListener("mouseover", () => applyOverlay("three"));
	document.getElementById("three").addEventListener("mouseout", () => removeOverlay("three"));

	document.getElementById("four").addEventListener("mouseover", () => applyOverlay("four"));
	document.getElementById("four").addEventListener("mouseout", () => removeOverlay("four"));

	document.getElementById("five").addEventListener("mouseover", () => applyOverlay("five"));
    document.getElementById("five").addEventListener("mouseout", () => removeOverlay("five"));
});

function applyOverlay(id) {
	document.getElementById(id).style.opacity = "0.5";
}

function removeOverlay(id) {
	document.getElementById(id).style.opacity = "1";
}