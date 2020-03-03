const remote = require("electron").remote;
const fs = require("fs");
const path = require("path");

const components = {
	vision: document.getElementById("hasVision"),
	shoot: document.getElementById("hasShoot"),
	fire: document.getElementById("hasFire"),
	auto: {
		menu: document.getElementById("autoMenu"),
		source: document.getElementById("sourceSelect"),
		dest: document.getElementById("destSelect"),
		button: document.getElementById("showAuto")
	},
	speed: {
		box: document.getElementById("hasSlow"),
		text: document.getElementById("slowText")
	}
};

const cameraValues = {
	forward: "http://10.47.38.2:1181/stream.mjpg",
	reverse: "http://10.47.38.2:1182/stream.mjpg"
};
var prevValues = {};

const listeners = {
	aligned: value => {
		changeValue(components.vision, value);
	},
	readyToFire: value => {
		changeValue(components.shoot, value);
	},
	firing: value => {
		changeValue(components.fire, value);
	},
	fastSlow: value => {
		if (value) {
			components.speed.box.classList.remove("disabled");
			components.speed.box.classList.add("enabled");
			components.speed.text.classList.add("fast");
			components.speed.text.classList.remove("slow");
		} else {
			components.speed.box.classList.remove("enabled");
			components.speed.box.classList.add("disabled");
			components.speed.text.classList.remove("fast");
			components.speed.text.classList.add("slow");
		}
	},
	enabled: value => {
		if (value) {
			components.auto.menu.style.display = "none";
			components.auto.button.style.display = "none";
		} else {
			components.auto.button.style.display = "";
		}
	},
	reversed: value => {
		if (value) {
			feedAddress = cameraValues.reverse;
		} else {
			feedAddress = cameraValues.forward;
		}
		resetImage();
	}
};
function changeValue(target, value) {
	if (value) {
		target.classList.add("enabled");
	} else {
		target.classList.remove("enabled");
	}
}
const keyListeners = Object.keys(listeners);

document.getElementById("x").addEventListener("click", close);
document.querySelectorAll("label").forEach(label=>{
	label.addEventListener("click", function() {
		setTimeout(function() {
			changeAutoMode();
		}, 10);
	});
});

function changeAutoMode() {
	let source = components.auto.source;
	let dest = components.auto.dest;
	let finalValue = ["", ""];
	for (var i = 0; i < source.children.length; i++) {
		if (source.children[i].checked) {
			finalValue[0] = source.children[i].value;
		}
		if (dest.children[i].checked) {
			finalValue[1] = dest.children[i].value;
		}
	}
	NetworkTables.putValue("/SmartDashboard/autoPath", finalValue[0]+"-"+finalValue[1]);
}

addEventListener('error',(ev)=>{
	ipc.send('windowError',{mesg:ev.message,file:ev.filename,lineNumber:ev.lineno})
});
components.auto.button.addEventListener("click", e=>{
	components.auto.menu.style.display = "flex";
	components.auto.button.classList.remove("unconfirmed");
	components.auto.button.classList.add("confirmed");
});
components.auto.menu.addEventListener("click", e=>{
	if(e.target !== e.currentTarget && e.target.getAttribute("class") != "container") {
		return;
	}
	components.auto.menu.style.display = "none";
});

function eventLoop() {
	keyListeners.forEach(key => {
		let value = NetworkTables.getValue("/SmartDashboard/"+key);
		if (prevValues[key] != value) {
			listeners[key](value);
		}
		prevValues[key] = value;
	});
}

ipc.on("reconnectCamera", ()=>{
	resetImage(false);
});

setInterval(eventLoop,20);
// debug

// Importing this adds a right-click menu with 'Inspect Element' option
(function(){
const { remote } = require('electron');
const { Menu, MenuItem } = remote;

var rightClickPosition = null;
const menu = new Menu()
menu.append(new MenuItem({ label: 'Inspect Element', click() { remote.getCurrentWindow().inspectElement(rightClickPosition.x,rightClickPosition.y) } }));

window.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  rightClickPosition = {x: e.x, y: e.y}
  menu.popup(remote.getCurrentWindow());
}, false);
})();