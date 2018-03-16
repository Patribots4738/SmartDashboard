var num = 0;

function party(argument) {
	if (num>359) {
		num = 0;
	}
	var elems = document.querySelectorAll("*");
	elems.forEach(elem=>{
		elem.style.backgroundColor = `hsl(${num},100%,50%)`;
		elem.style.fill = `hsl(${num},100%,50%)`;
		elem.style.border = `2px solid hsl(${num-180},100%,50%)`;
		elem.style.stroke = `hsl(${num-180},100%,50%)`;
	})
	num++;
}

function start() {
	setInterval(party,1);
}