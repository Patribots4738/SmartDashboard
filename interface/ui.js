const remote = require("electron").remote;
const fs = require("fs");
const path = require("path");

const components = {
	vision: document.getElementById("hasVision"),
	shoot: document.getElementById("hasShoot")
};

document.getElementById('x').addEventListener("click", close);

function changeAutoMode(e) {
	for (var i = 0; i < driveMode.children.length; i++) {
		if (driveMode.children[i].checked==true) {
			console.log(driveMode.children[i].value);
			NetworkTables.putValue("/SmartDashboard/autoMode",driveMode.children[i].value);
		}
	}
}

addEventListener('error',(ev)=>{
	ipc.send('windowError',{mesg:ev.message,file:ev.filename,lineNumber:ev.lineno})
});

NetworkTables.addKeyListener("/SmartDashboard/autoPaths", (key, value) => {
	
});

NetworkTables.addKeyListener("/SmartDashboard/aligned", (key, value) => {
	components.vision.classList.remove("enabled", "disabled");
	components.vision.classList.add(value == "true" ? "enabled" : "disabled");
});

NetworkTables.addKeyListener("/SmartDashboard/readyToFire", (key, value) => {
	components.shoot.classList.remove("enabled", "disabled");
	components.shoot.classList.add(value == "true" ? "enabled" : "disabled");
});


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