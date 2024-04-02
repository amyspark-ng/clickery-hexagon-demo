export function spewParticle(amount, posAdd, colorAdd, opacityAdd, zAdd, size) {
	for (var i = 0; i < amount; i++) {
	  setTimeout(() => {
		var tempP = add([
		  circle(size),
		  pos(posAdd),
		  area(),
		  color(colorAdd),
		  z(zAdd),
		  opacity(opacityAdd),
		  "object",
		  "material",
		  offscreen({
			destroy: true
		  }),
		])
		var strength = 200;
		var yOffset = rand(-width() / strength, width() / strength);
		var xOffset = rand(-height() / strength, height() / strength);
  
		var interval = setInterval(() => {
		  tempP.pos.x += xOffset;
		  tempP.pos.y += yOffset;
		  var test = randi(1, 200)
		  if (test < 5) {
			destroy(tempP);
			clearInterval(interval);
		  }
		  xOffset /= 1.1;
		  yOffset /= 1.1;
		}, 10);
	  }, 10);//end timeout
	}
  }