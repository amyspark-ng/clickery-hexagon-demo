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

export function definePowerups() {
	badPowerUp = make([
		sprite("hexagon"),
		pos(10, 10),
		color(RED),
		area(),
		anchor("center"),
		scale(0.04),
		"powerup",
		{
			execute() {
				let bg = get("bg")[0]
				bg.color = rgb(64, 22, 22)
				debug.log("bad power up :(")
			
				wait(10, () => {
					bg.color = rgb(50, 50, 50)
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
		scale(0.04),
		"powerup",
		{
			execute() {
				let bg = get("bg")[0]
				bg.color = rgb(22, 33, 64)
				debug.log("Multiplies score multiplier by 2 :)")
				GameState.scoreMultiplier = GameState.scoreMultiplier * 2
				
				wait(10, () => {
					bg.color = rgb(50, 50, 50)
					GameState.scoreMultiplier = GameState.scoreMultiplier / 2
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
		scale(0.04),
		"powerup",
		{
			execute() {
				let bg = get("bg")[0]
				bg.color = rgb(22, 64, 25)
				debug.log("Adds a percentage of your score to it :)")
				
				wait(10, () => {
					bg.color = rgb(50, 50, 50)
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
		scale(0.04),
		"powerup",
		{
			execute() {
				let bg = get("bg")[0]
				bg.color = rgb(64, 63, 22)
				debug.log("other power up :)")
			
				wait(10, () => {
					bg.color = rgb(50, 50, 50)
				})
			}
		}
	])
	
	powerups = [badPowerUp, MultiplyScoreMultiplier, AddPercentage, OtherPowerUp]
	// powerups = [MultiplyScoreMultiplier]
	return powerups;
}

export function spawnPowerUp(powerup, posToAdd) {
	let theObj = add(powerup)
	powerup.pos = posToAdd

	return theObj;
}
