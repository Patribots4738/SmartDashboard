var cnv = document.getElementById("placeholder");
var container = document.getElementById("notcamera");

cnv.width = container.getBoundingClientRect().width;
cnv.height = container.getBoundingClientRect().height;

var c = cnv.getContext("2d");
var w = cnv.width;
var h = cnv.height;
var speed = 1;
var lineLen = 150;
var pointNum = 80; //reduce this number if experiencing lag
var points = [];
var offscreen = -50;
var dim = {
	x: {
		min: offscreen,
		max: container.offsetWidth - offscreen
	},
	y: {
		min: offscreen,
		max: container.offsetHeight - offscreen
	}
}
/*let kitten = new Image();
kitten.onload = function() {
    draw();
}*/

//kitten.src = "D:\\SmartDashboard2020\\resources\\eye.png";
window.addEventListener("resize", e=>{
	cnv.width = container.offsetWidth;
	cnv.height = container.offsetHeight;
	dim.x.max = container.offsetWidth - offscreen;
	dim.y.max = container.offsetHeight - offscreen;
});

function draw() {
	c.clearRect(0,0,cnv.width, cnv.height);
	c.fillStyle = "rgb(10, 11, 24)";
	c.fillRect(0,0,cnv.width, cnv.height);
	let curpoint = 0;
	points.forEach(point=>{
		point.x+=point.dx;
		point.y+=point.dy;
		if (point.x<dim.x.min||point.y<dim.y.min||point.x>dim.x.max||point.y>dim.y.max) {
			points.splice(curpoint,1);
			genRandPoints(1);
		}
		//c.drawImage(kitten, point.x, point.y, 100,100);
		for (var i = points.length - 1; i >= 0; i--) {
			var sqrt = Math.sqrt(Math.pow((point.x-points[i].x),2)+Math.pow((point.y-points[i].y),2));
			if(sqrt<=lineLen) {
				c.beginPath();
				c.moveTo(points[i].x,points[i].y);
				c.strokeStyle=`rgba(110,110,200,${(lineLen-sqrt)/lineLen})`;
				c.lineWidth=0.5;
				c.lineTo(point.x,point.y);
				c.stroke();
			}
		}
		curpoint++;
	});
	requestAnimationFrame(draw);
}
draw();
function genRandPoints(r) {
	for (var i = 0; i < r; i++) {
		let constAxis = Math.random() > 0.5;
		console.log(dim.y.max,dim.y.min)
		let x = constAxis ? (Math.random() * dim.x.max) + 1 :
			(Math.random() > 0.5 ? dim.x.max : dim.x.min);
		let y = constAxis ? (Math.random() > 0.5 ? dim.y.max : dim.y.min) :
			(Math.random() * dim.y.max) + 1;
		let point = {
			x: x,
			y: y,
			dx: x > 0 ? Math.random() * -speed : Math.random() * speed,
			dy: y > 0 ? Math.random() * -speed : Math.random() * speed
		}
		points.push(point);
	}
}
genRandPoints(pointNum);