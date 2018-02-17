var elem = document.getElementById('position');
var x = 20;
var y = 20;

setInterval(function () {
	elem.style.top=y+"px";
	elem.style.left=x+"px";
	x++;
	y++;
},1000)