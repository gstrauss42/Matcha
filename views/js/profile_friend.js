window.addEventListener('DOMContentLoaded', (event) => {

	// adding and removing overlays to gear (personal profile)
	document.getElementById("options").addEventListener("mouseover", () => applyOverlay("options"));
    document.getElementById("options").addEventListener("mouseout", () => removeOverlay("options"));
});

function applyOverlay(id) {
	document.getElementById(id).style.opacity = "0.5";
}

function removeOverlay(id) {
	document.getElementById(id).style.opacity = "1";
}