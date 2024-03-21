import { GameState } from "../main.js"

export function shuffleArray(array) {
	array =	array.sort(() => Math.random() - 0.5);
	return array
}

let badPowerUp
let MultiplyScoreMultiplier
let AddPercentage
let OtherPowerUp

let powerups = [badPowerUp, MultiplyScoreMultiplier, AddPercentage, OtherPowerUp]

export function spawnPowerUp(powerup, posToAdd) {
	let theObj = add(powerup)
	powerup.pos = posToAdd
	return theObj;
}

export function definePowerups() {
	badPowerUp = make([
		sprite("hexagon"),
		pos(10, 10),
		color(RED),
		area(),
		anchor("center"),
		scale(0.5),
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
		area(),
		anchor("center"),
		scale(0.5),
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
		area(),
		anchor("center"),
		scale(0.5),
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

				debug.log("Adds percentage power up")
	
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
	
	OtherPowerUp = make([
		sprite("hexagon"),
		pos(10, 10),
		color(YELLOW),
		area(),
		anchor("center"),
		scale(0.5),
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
