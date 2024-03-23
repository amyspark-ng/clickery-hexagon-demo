import { GameState } from "../main.js"
import { mouse, setCanClickStuff, canClickStuff } from "./gamescene.js"

export function shuffleArray(tookArray = []) {
	tookArray.sort(() => Math.random() - 0.5);
	return tookArray;
}

let badPowerUp
let MultiplyScoreMultiplier
let AddPercentage
let OtherPowerUp

let powerups = [badPowerUp, MultiplyScoreMultiplier, AddPercentage, OtherPowerUp]

export function spawnPowerUp(powerup, posToAdd = vec2(10000, 10000), bought) {
	let thePowerup = add(powerup)
	
	// wasnt bought
	if (!bought) {
		// isnt bad
		if (!thePowerup.is("bad")) {
			thePowerup.pos = vec2(
				choose([-75, width() + 75]),
				choose([-75, height() + 75]),
			)
			let	targetPos = center()
		
			let speed = 6.5

			wait(speed, () => {
				loop(speed, () => {
					targetPos = vec2(
						rand(50, width() - 50),
						rand(50, height() - 50)
					)
					tween(thePowerup.pos, targetPos, speed, (p) => thePowerup.pos = p, easings.easeInOutSine)
				})
			})
			tween(thePowerup.pos, targetPos, speed, (p) => thePowerup.pos = p, easings.easeInOutSine)
		}
	}

	else {
		thePowerup.pos = posToAdd
	}
	
	thePowerup.canClick = true

	// reset values because what the fuck
	thePowerup.opacity = 1
	thePowerup.use(area())
	thePowerup.scale = vec2(0.25)

	if (!thePowerup.is("bad")) {
		thePowerup.onUpdate(() => {
			setCanClickStuff(!thePowerup.isHovering())
		})
	
		thePowerup.onHover(() => {
			if (!mouse.waiting) {
				mouse.play("point")
			}
		})

		thePowerup.onHoverEnd(() => {
			if (!mouse.waiting) {
				mouse.play("cursor")
			}
		})

		thePowerup.onMousePress(() => {
			if (thePowerup.isHovering() && thePowerup.canClick) {
				setCanClickStuff(false)
				thePowerup.canClick = false
				tween(vec2(0.25), vec2(0.196), 0.35, (p) => thePowerup.scale = p, easings.easeOutBounce)
	
				if (!mouse.waiting) mouse.play("grab")
			}
		})

		thePowerup.onMouseRelease(() => {
			if (thePowerup.isHovering()) {
				tween(1, 0, 0.32, (p) => thePowerup.opacity = p, )
				if (!mouse.waiting) mouse.play("cursor")

				wait(0.1, thePowerup.use(area( { scale: vec2(0) })))
				
				wait(0.32, () => {
					destroy(thePowerup)
					setCanClickStuff(true)

					thePowerup.execute()

					if (!bought) {
						wait(rand(120, 600), () => {
							powerups = shuffleArray(powerups)
							let theOne = spawnPowerUp(shuffleArray(powerups)[0], center(), false)
						})
					}
				})
			}
		})
	}

	// it is bad
	else {
		// checks if it was bought or spawned
		if (!bought) {
			thePowerup.pos = vec2(
				choose([-75, width() + 75]),
				choose([-75, height() + 75]),
			)
			tween(thePowerup.pos, center(), 3.25, (p) => thePowerup.pos = p, easings.easeInOutSine)
			wait(3.25, () => {
				tween(1, 0, 0.32, (p) => thePowerup.opacity = p, )
				wait(0.1, thePowerup.use(area( { scale: vec2(0) })))
				wait(0.32, () => {
					destroy(thePowerup)
				})

				wait(rand(120, 600), () => {
					powerups = shuffleArray(powerups)
					let theOne = spawnPowerUp(shuffleArray(powerups)[0], center(), false)
				})
			})
		}

		// it was bought
		else {
			thePowerup.pos = posToAdd
		}
	}

	return thePowerup;
}

export function definePowerups() {
	badPowerUp = make([
		sprite("hexagon"),
		pos(10, 10),
		color(RED),
		area(),
		opacity(1),
		anchor("center"),
		scale(0.25),
		"powerup",
		"bad",
		{
			execute() {
				let vignette = add([
					sprite("vignette"),
					pos(center()),
					opacity(0),
					anchor("center"),
					color(WHITE),
					"vignette"
				])
				
				vignette.color = rgb(this.color)
				tween(vignette.opacity, 1, 0.32, (p) => vignette.opacity = p,)
				
				GameState.scoreMultiplier = GameState.scoreMultiplier / 2

				debug.log("Bad power up")
	
				wait(10, () => {
					tween(vignette.opacity, 0, 0.32, (p) => vignette.opacity = p,)
					vignette.color = WHITE
					
					// returns things to normal
					GameState.scoreMultiplier = GameState.scoreMultiplier * 2
					
					wait(1, () => {
						destroy(vignette)
					})
				})
			}
		}
	])
	
	MultiplyScoreMultiplier = make([
		sprite("hexagon"),
		pos(10, 10),
		color(BLUE),
		opacity(1),
		area(),
		anchor("center"),
		scale(0.25),
		"powerup",
		{
			execute() {
				let vignette = add([
					sprite("vignette"),
					pos(center()),
					opacity(0),
					anchor("center"),
					color(WHITE),
					"vignette"
				])
				
				vignette.color = rgb(this.color)
				tween(vignette.opacity, 1, 0.32, (p) => vignette.opacity = p,)
			
				GameState.scoreMultiplier = GameState.scoreMultiplier * 2

				debug.log("Double multiplier power up")
	
				wait(10, () => {
					tween(vignette.opacity, 0, 0.32, (p) => vignette.opacity = p,)
					vignette.color = WHITE
				
					// returns things to normal
					GameState.scoreMultiplier = GameState.scoreMultiplier / 2
					wait(1, () => {
						destroy(vignette)
					})
				})
			}
		}
	])
	
	AddPercentage = make([
		sprite("hexagon"),
		pos(10, 10),
		color(GREEN),
		opacity(1),
		area(),
		anchor("center"),
		scale(0.25),
		"powerup",
		{

			execute() {
				let vignette = add([
					sprite("vignette"),
					pos(center()),
					opacity(0),
					anchor("center"),
					color(WHITE),
					"vignette"
				])
				
				vignette.color = rgb(this.color)
				tween(vignette.opacity, 1, 0.32, (p) => vignette.opacity = p,)
				
				tween(GameState.score, GameState.score + (GameState.score * 25) / 100, 5, (p) => GameState.score = p, )

				let l = loop(0.05, () => {
					play("clickPress")
					wait(0.05, () => {
						play("clickRelease")
					})
				})

				debug.log("Adds percentage power up")
	
				wait(5, () => {
					l.cancel()
					tween(vignette.opacity, 0, 0.32, (p) => vignette.opacity = p,)
					vignette.color = WHITE
					wait(1, () => {
						destroy(vignette)
					})
				})
			}
		}
	])
	
	OtherPowerUp = make([
		sprite("hexagon"),
		pos(10, 10),
		color(YELLOW),
		opacity(1),
		area(),
		anchor("center"),
		scale(0.25),
		"powerup",
		{
			execute() {
				let vignette = add([
					sprite("vignette"),
					pos(center()),
					opacity(0),
					anchor("center"),
					color(WHITE),
					"vignette"
				])
				
				vignette.color = rgb(this.color)
				tween(vignette.opacity, 1, 0.32, (p) => vignette.opacity = p,)
				
				debug.log("Does some other thing")
	
				wait(5, () => {
					tween(vignette.opacity, 0, 0.32, (p) => vignette.opacity = p,)
					vignette.color = WHITE
					wait(1, () => {
						destroy(vignette)
					})
				})
			}
		}
	])
	
	powerups = [badPowerUp, MultiplyScoreMultiplier, AddPercentage, OtherPowerUp]
	// powerups = [MultiplyScoreMultiplier]
	return powerups;
}
