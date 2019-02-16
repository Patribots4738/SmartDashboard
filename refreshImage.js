var reImage = document.getElementById("refresh");
const feed = document.getElementById("cameraFeed");
var feedAddress = "http://10.47.38.2:1181/stream.mjpg";

function resetImage(add) {
	if (!add) {
		feed.removeChild(reImage);
	}
	let img = document.createElement("img");
	img.src = feedAddress;
	img.id = "refresh";
	feed.appendChild(img);
	reImage = document.getElementById("refresh");
	reImage.onerror = function(error) {
		error.preventDefault();
		error.stopPropagation();
		resetImage(false);
	}
}
resetImage(true);