var arms = document.getElementsByClassName('arms');
var update = document.getElementById('update');

/*update.oninput = function () {
	var armsArr = Object.values(arms);
	armsArr.forEach(arm=>{
		arm.style.transform = "translateY("+-parseInt(update.value)+"px)";
		//console.log(arm);
	});	
}*/

var startval = {
	x: 322,
	y: 365
}

function tempname(elem) {
	//console.log(elem.style.top.slice(0,-2),elem.style.left.slice(0,-2));
	var botx = Number(elem.style.top.slice(0,-2))-startval.x;
	var boty = Number(elem.style.left.slice(0,-2))-startval.y;
	document.getElementById("x").innerHTML="x = "+botx+"in";
	document.getElementById("y").innerHTML="y = "+boty+"in";
}
