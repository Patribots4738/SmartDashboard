document.onmousemove = mouseCoords;
document.addEventListener("mousedown", drag);
document.addEventListener("mouseup", stopDrag);
document.addEventListener("mousedown", addElem)

var x = 0;
var y = 0;
var cl1= false;
var divid;
var offs1;
var offs2;
var topPos;
var leftPos;
var divid;
var permid;
var currentId = 0;
var currentEvents = ["input"]; /*Insert div id's here, all children need id's for it to work*/

function mouseCoords(e) {
    x = e.x
    y = e.y
    if(cl1 === true){
		document.getElementById(permid).style.top = topPos + (y-offs1) + 'px';
		document.getElementById(permid).style.left = leftPos + (x-offs2) + 'px';
		tempname(document.getElementById(permid));
	}
}
function drag() {
	divid= event.target.id;
	if (divid === undefined||divid === null||divid ==="") {
		return;
	}
	var temp = document.getElementById(divid);
	var isittrue = true;
	var temparray = [];

	while(isittrue){
		temparray.push(divid);
		if(temp.parentNode && temp.parentNode.id){
			temparray.push(temp.parentNode.id);
			temp = document.getElementById(temp.parentNode.id);
		}else{
			var isittrue = false;
		}
	}
	for(var i = 0; i<currentEvents.length; i++){
		if(temparray.includes(currentEvents[i])){
			permid = currentEvents[i];
			break;
		}else{
			if (i===currentEvents.length-1) {
				return;
			}
		}
	};
	var rect = document.getElementById(permid).getBoundingClientRect();
	leftPos = rect.left;
	topPos = rect.top;
	offs1 = y;
	offs2 = x;
	cl1= true;
}
function addElem(e) {
	if (e.target.id==="spawner") {
		var tempdiv = document.createElement("div");
			tempdiv.setAttribute("id", "e"+currentId);
			tempdiv.setAttribute("class", "point");
			tempdiv.setAttribute("style", "top:0px;left:50px;");
		document.body.appendChild(tempdiv);
		currentEvents.push("e" + currentId);
		var tEvent = document.createEvent("MouseEvents");
		tEvent.initEvent("mousedown", true, true);
		document.getElementById("e"+currentId).dispatchEvent(tEvent);
		currentId++;
	}
}
function stopDrag() {
	offs1 = 0;
	offs2 = 0;
	cl1= false;
}