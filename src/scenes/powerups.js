import { GameState } from "../main.js";
import { canClickStuff, mouse, setCanClickStuff } from "./gamescene.js";

export function shuffleArray(tookArray = []) {
	tookArray.sort(() => Math.random() - 0.5);
	return tookArray;
}

let badPowerUp;
let MultiplyScoreMultiplier;
let AddPercentage;
let OtherPowerUp;

let powerups = [
	MultiplyScoreMultiplier,
	AddPercentage,
	OtherPowerUp,
];

function checkBounce(object) {
	// detects bounce toñoñon
	if (object.pos.x <= -10 || object.pos.x >= width() - object.width + 10) {
		object.vel.x = -object.vel.x + rand(-0.5, 0.5)
		object.speed += 10
		return true;
	}
	
	if (object.pos.y <= -10 || object.pos.y >= height() - object.height + 10) {
		object.vel.y = -object.vel.y + rand(-0.5, 0.5)
		object.speed += 10
		return true;
	}

	if (object.speed > 300) {
		debug.log("you lost powerup privileges")
	}
}

// what the fuck does choose mean
export function spawnPowerUp(spawnOptions = { pos: vec2(), bought: false, firstTime: false, choose: true, excludeBad: false }) {
	let thePowerup;
	
	if (!spawnOptions.excludeBad) {
		// you got the bad one dude
		if (chance(0.1)) {
		// if (chance(1)) {
			thePowerup = add(badPowerUp)
		}

		else {
			thePowerup = add(shuffleArray(powerups)[0])
		}
	}

	else {
		thePowerup = add(shuffleArray(powerups)[0])
	}

	// defining powerup things
	thePowerup.play(thePowerup.name)
	thePowerup.use(area( { scale: vec2(0.9) }))
	
	thePowerup.vel = Vec2.fromAngle(rand((rand(-50, 50)), rand(-50, 50)))
	thePowerup.speed = 100
	thePowerup.insideScreen = false
	let chosenCorner;
	
	// artificial one
	if (spawnOptions.bought) {
		thePowerup.pos = spawnOptions.pos
	}

	// natural spawning / homemade
	else {
		wait(5, () => {
			thePowerup.insideScreen = true
		})
	}

	if (thePowerup.is("bad")) {
		thePowerup.use(anchor("center"))
		wait(1, () => {
			tween(thePowerup.pos, center(), 2, (p) => thePowerup.pos = p, )
		})
	}
	
	else {
		thePowerup.onUpdate(() => {
			// const dir = thePowerup.pos.sub(vec2(chosenCorner.x, chosenCorner.y)).unit()
			const dir = thePowerup.pos.sub(center(9)).unit()
			thePowerup.move(dir.scale(thePowerup.speed))
		
			if (thePowerup.insideScreen) {
				checkBounce(thePowerup)
			}
		})

		thePowerup.onHover(() => {
			if (!mouse.waiting) {
				mouse.play("point");
			}
		});

		thePowerup.onHoverEnd(() => {
			if (!mouse.waiting) {
				mouse.play("cursor");
			}
		});

		thePowerup.onMousePress(() => {
			if (thePowerup.isHovering() && thePowerup.canClick) {
				setCanClickStuff(false);
				thePowerup.canClick = false;
				tween(
					vec2(1),
					vec2(0.896),
					0.35,
					(p) => thePowerup.scale = p,
					easings.easeOutBounce,
				);

				if (!mouse.waiting) mouse.play("grab");
			}
		});

		thePowerup.onMouseRelease(() => {
			if (thePowerup.isHovering()) {
				play("powerup")
				tween(1, 0, 0.32, (p) => thePowerup.opacity = p);
				if (!mouse.waiting) mouse.play("cursor");

				wait(0.1, thePowerup.use(area({ scale: vec2(0) })));

				wait(0.32, () => {
					destroy(thePowerup);
					setCanClickStuff(true);

					thePowerup.execute();
					
					if (!spawnOptions.bought) {
						wait(rand(120, 600), () => {
							powerups = shuffleArray(powerups);
							let theOne = spawnPowerUp(
								shuffleArray(powerups)[0],
								center(),
								false,
							);
						});
					}
				});
			}
		});
	}

	return thePowerup;
}

export function definePowerups() {
	let vignetteTemp = make([
		sprite("vignette"),
		pos(center()),
		opacity(0),
		anchor("center"),
		color(WHITE),
		"vignette",
	])
	
	badPowerUp = make([
		sprite("powerups"),
		pos(10, 10),
		area(),
		opacity(1),
		,
		"powerup",
		"bad",
		{
			name: "bad",
			vigColor: RED,
			execute() {
				let vignette = add(vignetteTemp);

				vignette.color = rgb(this.vigColor);
				tween(vignette.opacity, 1, 0.32, (p) => vignette.opacity = p);

				GameState.scoreMultiplier = GameState.scoreMultiplier / 2;

				debug.log("Bad power up");

				wait(10, () => {
					tween(
						vignette.opacity,
						0,
						0.32,
						(p) => vignette.opacity = p,
					);
					vignette.color = WHITE;

					// returns things to normal
					GameState.scoreMultiplier = GameState.scoreMultiplier * 2;

					wait(1, () => {
						destroy(vignette);
					});
				});
			},
		},
	]);

	MultiplyScoreMultiplier = make([
		sprite("powerups"),
		pos(10, 10),
		opacity(1),
		area(),
		,
		"powerup",
		{
			name: "multiplier",
			vigColor: BLUE,
			execute() {
				let vignette = add(vignetteTemp);

				vignette.color = rgb(this.vigColor);
				tween(vignette.opacity, 1, 0.32, (p) => vignette.opacity = p);

				GameState.scoreMultiplier = GameState.scoreMultiplier * 2;

				debug.log("Double multiplier power up");

				wait(10, () => {
					tween(
						vignette.opacity,
						0,
						0.32,
						(p) => vignette.opacity = p,
					);
					vignette.color = WHITE;

					// returns things to normal
					GameState.scoreMultiplier = GameState.scoreMultiplier / 2;
					wait(1, () => {
						destroy(vignette);
					});
				});
			},
		},
	]);

	AddPercentage = make([
		sprite("powerups"),
		pos(10, 10),
		opacity(1),
		area(),
		,
		"powerup",
		{
			name: "percentage",
			vigColor: GREEN,
			execute() {
				let vignette = add(vignetteTemp);

				vignette.color = rgb(this.vigColor);
				tween(vignette.opacity, 1, 0.32, (p) => vignette.opacity = p);

				tween(
					GameState.score,
					GameState.score + (GameState.score * 25) / 100,
					5,
					(p) => GameState.score = p,
				);

				let l = loop(0.05, () => {
					play("clickPress");
					wait(0.05, () => {
						play("clickRelease");
					});
				});

				debug.log("Adds percentage power up");

				wait(5, () => {
					l.cancel();
					tween(
						vignette.opacity,
						0,
						0.32,
						(p) => vignette.opacity = p,
					);
					vignette.color = WHITE;
					wait(1, () => {
						destroy(vignette);
					});
				});
			},
		},
	]);

	OtherPowerUp = make([
		sprite("powerups"),
		pos(10, 10),
		opacity(1),
		area(),
		,
		"powerup",
		{
			name: "yellow",
			vigColor: YELLOW,
			execute() {
				let vignette = add(vignetteTemp);

				vignette.color = rgb(this.vigColor);
				tween(vignette.opacity, 1, 0.32, (p) => vignette.opacity = p);

				debug.log("Does some other thing");

				wait(5, () => {
					tween(
						vignette.opacity,
						0,
						0.32,
						(p) => vignette.opacity = p,
					);
					vignette.color = WHITE;
					wait(1, () => {
						destroy(vignette);
					});
				});
			},
		},
	]);

	powerups = [
		MultiplyScoreMultiplier,
		AddPercentage,
		OtherPowerUp,
	];
	// powerups = [MultiplyScoreMultiplier]
	return powerups;
}
