import { GameState } from "../../main.js";
import { spewParticle } from "../../plugins/particleSpewing.js";
import { canClickStuff, setCanClickStuff, sps, spsText, mouse } from "./gamescene.js";

export function shuffleArray(tookArray = []) {
	tookArray.sort(() => Math.random() - 0.5);
	return tookArray;
}

let powerupsRunning = -1
let randomPosForPow
let thePowerup

let occupiedPositions = []

export let powerupScoreMultiplier = 1
export let powerupAutoMultiplier = 1

function makeVignette() {
	let vignetteTemp = make([
		sprite("vignette"),
		pos(center()),
		opacity(0),
		z(0.1),
		anchor("center"),
		color(WHITE),
		"vignette",
		{
			startVignette() {
				tween(this.opacity, 1, 0.5, (p) => this.opacity = p);
				powerupsRunning++
			},

			endVignette() {
				tween(
					this.opacity,
					0,
					0.5,
					(p) => this.opacity = p,
				);
				
				wait(1, () => {
					destroy(this)
					wait(1, () => {
						powerupsRunning--
					})
				})
			
				tween(spsText.color, rgb(WHITE), 0.5, (p) => spsText.color = p, )
			}
		}
	])
	
	return vignetteTemp
}

let powerupsClicked = 0

export let powerupsColorRunning = [] 

function makeCounter(name, time) {
	let newPosX = width() - 125
	
	powerupsClicked++
	let counter = add([
		sprite("powerups"),
		anchor("center"),
		pos(),
		scale(0.7),
		"counterObject",
		{
			running: true,
			name: name,
		}
	])

	counter.pos = vec2(newPosX - 80 * powerupsRunning, height() - 50)

	let timer = add([
		text(time + "s"),
		pos(counter.pos.x - 15, counter.pos.y + 5),
		scale(0.8)
	])

	// let counteR = add([
	// 	text(powerupsClicked),
	// 	pos(counter.pos.x - 10, counter.pos.y - 10),
	// 	scale(0.8)
	// ])

	let secondsToWait = time

	wait(time, () => {
		destroy(counter)
		destroy(timer)
	})

	counter.onUpdate(() => {
		if (time > 0) {
			time -= dt()
			timer.text = Math.round(time) + "s"
		}
	})

	counter.play(name)
}

function makeBadPowerUp() {
	let	badPowerUp = make([
		sprite("powerups"),
		pos(10, 10),
		area(),
		opacity(0),
		scale(0.8),
		anchor("center"),
		z(2),
		"powerup",
		"bad",
		{
			name: "bad",
			vigColor: RED,
			index: 0,
			
			hasStarted: true,
			active: false,
			clicks: 0,
			canBeActivated: false,
			time: 10,
			execute() {
				let vignette = add(makeVignette());
				vignette.color = rgb(this.vigColor);
				
				tween(spsText.color, rgb(vignette.color), 0.5, (p) => spsText.color = p, )

				vignette.startVignette()

				powerupScoreMultiplier = 0.5;

				// debug.log("Bad power up");

				wait(this.time, () => {
					vignette.endVignette()
					
					// move make counters to here because im a dumb ass
					powerupsColorRunning.splice(this.index, 1)


					// returns things to normal
					powerupScoreMultiplier = 1;
				});
			},
		},
	])

	return badPowerUp
}

function makeMultiplierPowerUp() {
	let MultiplyScoreMultiplier = make([
		sprite("powerups"),
		pos(10, 10),
		opacity(0),
		area(),
		scale(0.8),
		anchor("center"),
		z(2),
		"powerup",
		{
			name: "multiplier",
			vigColor: BLUE,
			index: 1,
			hasStarted: true,
			active: false,
			clicks: 0,
			canBeActivated: false,
			time: 10,
			execute() {
				let vignette = add(makeVignette());
				vignette.color = rgb(this.vigColor);
				tween(spsText.color, rgb(vignette.color), 0.5, (p) => spsText.color = p, )

				vignette.startVignette()

				powerupScoreMultiplier = 2;

				// debug.log("Double multiplier power up");

				wait(this.time, () => {
					vignette.endVignette()

					// returns things to normal
					powerupScoreMultiplier = 1;
				});
			},
		},
	]);

	return MultiplyScoreMultiplier
}

function makeAddPercentagePowerUp() {
	let AddPercentage = make([
		sprite("powerups"),
		pos(10, 10),
		opacity(0),
		area(),
		scale(0.8),
		anchor("center"),
		z(2),
		"powerup",
		{
			name: "percentage",
			vigColor: GREEN,
			index: 2,
			hasStarted: true,
			active: false,
			clicks: 0,
			canBeActivated: false,
			time: 5,
			execute() {
				let vignette = add(makeVignette());
				vignette.color = rgb(this.vigColor);
				tween(spsText.color, rgb(vignette.color), 0.5, (p) => spsText.color = p, )

				vignette.startVignette()

				tween(
					Math.round(GameState.score),
					Math.round(GameState.score + (GameState.score * 25) / 100),
					this.time,
					(p) => GameState.score = p,
				);

				let l = loop(0.05, () => {
					play("clickPress");
					wait(0.05, () => {
						play("clickRelease");
					});
				});

				// debug.log("Adds percentage power up");

				wait(this.time, () => {
					l.cancel();
					vignette.endVignette()
				});
			},
		},
	]);

	return AddPercentage;
}

function makeOtherPowerUp() {
	let OtherPowerUp = make([
		sprite("powerups"),
		pos(10, 10),
		opacity(0),
		area(),
		scale(0.8),
		anchor("center"),
		z(2),
		"powerup",
		{
			name: "yellow",
			hasStarted: true,
			active: false,
			clicks: 0,
			time: 10,
			canBeActivated: false,
			vigColor: YELLOW,
			index: 3,
			execute() {
				let vignette = add(makeVignette());
				tween(spsText.color, rgb(vignette.color), 0.5, (p) => spsText.color = p, )
				vignette.color = rgb(this.vigColor);
				vignette.startVignette()

				// debug.log("Does some other thing");

				powerupAutoMultiplier = 2

				wait(this.time, () => {
					vignette.endVignette()
					powerupAutoMultiplier = 1
				});
			},
		},
	]);

	return OtherPowerUp;
}

export function definePowerups() {
	powerups = [
		makeBadPowerUp(),
		makeMultiplierPowerUp(),
		makeAddPercentagePowerUp(),
		makeOtherPowerUp()
	];

	// makeCounter("percentage", 10)
	return powerups;

}

let powerups;

export function spawnPowerUp(bought = false, excludeBad = false ) {
	powerups = definePowerups()

	let posToSpawn = vec2()
	
	if (!excludeBad) {
		// you got the bad one dude
		if (chance(0.1)) {
		// if (chance(1)) {
			thePowerup = add(makeBadPowerUp(10))
		}

		else {
			powerups.shift()
			thePowerup = add(shuffleArray(powerups)[0]);
		}
	}

	else {
		thePowerup = add(shuffleArray(powerups)[0])
	}

	// defining powerup things
	thePowerup.play(thePowerup.name)
	
	tween(0, 0.2, 0.5, (p) => thePowerup.opacity = p, )

	// artificial one
	if (bought) {
		posToSpawn = vec2(rand(750, width() - 70), rand(60, height() - 220))
	}
	
	// natural spawning / homemade
	else {
		// will be in a random side
		posToSpawn = vec2(choose([rand(60, 140), rand(750, 890)]), rand(60, height() - 220))
	}

	thePowerup.pos = posToSpawn

	let opaLoop

	if (!thePowerup.is("bad")) {
		// opaLoop = loop(2.5, () => {
		// 	tween(0.2, 0.1, 1.25, (p) => thePowerup.opacity = p, )
		// 	wait(1.25, () => {
		// 		tween(0.1, 0.2, 1.25, (p) => thePowerup.opacity = p, )
		// 	})
		// })
	}

	else {
		thePowerup.scale = vec2(1)
	}

	get('powerup').forEach((thePowerup) => {
		thePowerup.onUpdate(() => {
			if (!thePowerup.is("bad")) {
				if (thePowerup.hasStarted && thePowerup.active == false) {
				}
				if (thePowerup.canBeActivated) {
					// mouse.animToPlay = "point"
				}
				// else mouse.animToPlay = "cursor"
			}
			
			// is bad
			else {
				thePowerup.opacity += 0.05 / 6

				if (thePowerup.opacity <= 0) {
					destroy(thePowerup)
				}

				else if (thePowerup.opacity >= 1) {
					thePowerup.execute()
					powerupsColorRunning.push(thePowerup.vigColor)
					
					thePowerup.destroy()
					makeCounter(thePowerup.name, thePowerup.time)
				}
			}

		})

		thePowerup.onHover(() => {
			if (thePowerup.is("bad")) {
				mouse.animToPlay = "point"
			}

			else {
				if (thePowerup.canBeActivated) {
					mouse.animToPlay = "point"
					debug.log("qqqqqqqqq")
				}
			}
		})

		thePowerup.onHoverEnd(() => {
			mouse.animToPlay = "cursor"
		})

		thePowerup.onMousePress(() => {
			if (thePowerup.isHovering()) {
				if (!thePowerup.is("bad")) {
					// this happens when clicking and is not active yet
					tween(thePowerup.scale, thePowerup.scale.add(0.05), 0.25, (p) => thePowerup.scale = p, easings.easeOutElastic)
					tween(thePowerup.opacity, thePowerup.opacity + 0.2, 0.25, (p) => thePowerup.opacity = p, easings.easeOutElastic)
					thePowerup.clicks++

					if (thePowerup.clicks == 4) {
						thePowerup.canBeActivated = true
					}
					
					// has to click 5 times to activate
					if (thePowerup.clicks == 5) {
						thePowerup.active = true
						tween(thePowerup.scale, vec2(1.5), 0.1, (p) => thePowerup.scale = p, )
						tween(thePowerup.opacity, 0, 0.1, (p) => thePowerup.opacity = p, )
						// debug.log("RUN THIS")

						wait(0.1, () => {
							destroy(thePowerup)
							thePowerup.execute()
							powerupsColorRunning.push(thePowerup.vigColor)

							wait(thePowerup.time - 0.5, () => {
								powerupsColorRunning.splice(powerupsColorRunning.length - 1, 1)
							}) 
							play("gotpowerup")
							makeCounter(thePowerup.name, thePowerup.time)

							if (!thePowerup.bought) {
								// this triggers another one in the next 5 to 10 mins???
								wait(rand(120, 60*5), () => {
									spawnPowerUp({ bought: false, excludeBad: false })
								})
							}
						})
					}
				}

				// is bad
				else {
					tween(thePowerup.scale, thePowerup.scale.sub(0.05), 0.25, (p) => thePowerup.scale = p, easings.easeOutElastic)
					tween(thePowerup.opacity, thePowerup.opacity - 0.2, 0.25, (p) => thePowerup.opacity = p, easings.easeOutElastic)
					
					// has to click 5 times to activate
					if (thePowerup.clicks == 5) {
						wait(0.1, () => {
							if (!thePowerup.bought) {
								// this triggers another one in the next 5 to 10 mins???
								wait(rand(120, 60*5), () => {
									spawnPowerUp({ bought: false, excludeBad: false })
								})
							}
						})
					}
				}
			
				thePowerup.hasStarted = true	
			}
		});
	})

	return thePowerup;
}
