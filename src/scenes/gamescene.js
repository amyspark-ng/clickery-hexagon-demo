import { GameState } from "../main.js"

import { savingData } from "../dataManaging.js"
import { formatScore, formatPrice } from "./FormattingFunctions.js";
import { shuffleArray } from "./powerups.js";
import { definePowerups } from "./powerups.js";
import { spawnPowerUp } from "./powerups.js";

export let sps = 0 // score per second
let cps = 0 // to properly calculate sps
let cpSecond = 0 // to properly calculate sps

export let scorePerClick = 1

export let hasStartedGame = false
let ominus;

let timeBetweenAutos = 60
let autoChance = 0.05
// let timeBetweenAutos = 5
// let autoChance = 0.5

// game managinig variables
let storeOpen = false
let canClickHexagon = false

// used to determine the game juice pitch at buying things thingy
let hasClicked = false
let storePitchSeconds = 0
let tune = 0

// this is for the amount of multiplier i have to add to the scoremultiplier every time you buy them
let buyMultiplier = 1

let markiplier = ""

let millionsForLevitSpeed = 0

let scoreToAscend = 1000000

let dataToSave;

function settingData() {
	dataToSave = {
		_score: GameState.score,
		_maxScore: GameState.maxScore,
		_scoreMultiplier: GameState.scoreMultiplier,
		_scorePerClick: scorePerClick,
		_cursors: GameState.cursors,
		_hasUnlockedPowerUps: GameState.hasUnlockedPowerups,
		_volumeIndex: GameState.volumeIndex
	}
}

let powerups;
let canBuyPowerup = false
let canClickStuff = true

// TODO: Re work power ups
// TODO: Menu scene transitions
// TODO: Menuscene
// TODO: Community scene which implies the whole newgrounds shmuck thing
// TODO: Crear assets para las mejoras de la tienda, tendria un huequito para poder poner el texto de cuanto vale, este texto estaria formateado de distinta manera que el scoreText

// DEFINING OBJECTS
let hexagonObj

let scoreText
let maxScoreText
let spsText
let multiplierText
let cursorsText

export function gamescene() {
	return scene("gamescene", () => {
		
		if (GameState.hasUnlockedPowerups == true) canBuyPowerup = true
		if (GameState.score > 0) hasStartedGame = true

		let bg = add([
			rect(width() * 2, height() * 2),
			pos(center()),
			// color(50, 50, 50),
			color(50, 50, 50),
			stay(),
			anchor("center"),
			"bg"
		])
		
		// they need bg to work
		powerups = definePowerups()

		setCursor("none")

		let mouse = add([
			sprite("cursors"),
			pos(mousePos()),
			area( { scale: vec2(0.5), offset: vec2(-5, 5) }),
			anchor("center"),
			z(9999999999),
			opacity(1),
			{
				update() {
					this.pos = toScreen(mousePos())
				}
			}
		])

		// #endregion

		// #region Hexagon Stuff
		hexagonObj = add([
			sprite("hexagon"),
			pos(width() / 2, height() / 2 + 40),
			anchor("center"),
			scale(1),
			area( { shape: new Polygon([vec2(406, 118), vec2(613, 116), vec2(711, 292), vec2(615, 463), vec2(411, 466), vec2(315, 293)]), offset: vec2(-512, -289) } ),
			rotate(),
			"hexagon",
			{
				rotSpeed: 0.010,
				levitSpeed: 5,
				click(auto) {
					if (auto == true) {
						// fucking cursor position
						autoCursor.pos.x = rand(hexagonObj.pos.x - 50, hexagonObj.pos.x + 50)
						autoCursor.pos.y = rand(hexagonObj.pos.y - 50, hexagonObj.pos.y + 50)
		
						if (autoCursor.pos.x > hexagonObj.pos.x - 50 && autoCursor.pos.x < hexagonObj.pos.x) {
							autoCursor.angle = 90
						}
						
						else if (autoCursor.pos.x > hexagonObj.pos.x && autoCursor.pos.x < hexagonObj.pos.x + 50) {
							autoCursor.angle = 270
						}
		
						if (autoCursor.pos.y > hexagonObj.pos.y - 50 && autoCursor.pos.y < hexagonObj.pos.y) {
							autoCursor.angle += 45
						}
						
						else if (autoCursor.pos.y > hexagonObj.pos.y && autoCursor.pos.y < hexagonObj.pos.y + 50) {
							autoCursor.angle -= 45
						}
						
						// autoplusscoretext horizontal position
						if (autoCursor.pos.x > hexagonObj.pos.x - 50 && autoCursor.pos.x < hexagonObj.pos.x) {
							autoPlusScoreText.pos.x = autoCursor.pos.x - (rand(50, 65))
						}
						
						else if (autoCursor.pos.x > hexagonObj.pos.x && autoCursor.pos.x < hexagonObj.pos.x + 50) {
							autoPlusScoreText.pos.x = autoCursor.pos.x + (rand(50, 65))
						}
		
						autoPlusScoreText.pos.y = autoCursor.pos.y + rand(-20, 20)
		
						// appearing animations
						tween(autoCursor.opacity, 1, 0.25, (p) => autoCursor.opacity = p, )
						tween(autoPlusScoreText.opacity, 1, 0.25, (p) => autoPlusScoreText.opacity = p, )
						tween(autoPlusScoreText.pos.y, autoPlusScoreText.pos.y - 20, 0.25, (p) => autoPlusScoreText.pos.y = p, )
						tween(autoPlusScoreText.angle, rand(-10, 10), 0.25, (p) => autoPlusScoreText.angle = p, )
		
						// score managing and hexagon animations
						manageScore(GameState.score + (GameState.scoreMultiplier * GameState.cursors))
						GameState.maxScore += GameState.scoreMultiplier * GameState.cursors
		
						// play click
						tween(vec2(0.22), vec2(0.212121), 0.35, (p) => hexagonObj.scale = p, easings.easeOutBounce)
						play("clickPress", {
							detune: rand(-50, 50)
						})
		
						wait(0.20, () => {
							tween(autoCursor.opacity, 0, 0.25, (p) => autoCursor.opacity = p, )
							tween(autoPlusScoreText.opacity, 0, 0.25, (p) => autoPlusScoreText.opacity = p, )
		
							play("clickRelease", {
								detune: rand(-200, 200)
							})
		
							tween(0, rand(-10, 10), 0.08, (p) => scoreText.angle = p, easings.easeOutBounce)
							tween(50, 55 , 0.08, (p) => scoreText.pos.y = p, easings.easeOutBounce)
							wait(0.25, () => {
								tween(scoreText.angle, 0, 0.25, (p) => scoreText.angle = p, easings.easeOutCubic)
								tween(55, 50, 0.08, (p) => scoreText.pos.y = p, easings.easeOutBounce)
							})
							
							// hexagon
							tween(vec2(0.212121), vec2(0.22), 0.35, (p) => hexagonObj.scale = p, easings.easeOutBounce)
						})
					}
		
					// manual click
					else {
						// starting game
						if (hasStartedGame == false && GameState.score < 1) {
							ominus.stop()
						}
						
						if (hasStartedGame == false && GameState.score == 1) {
							// play("game_music")
							hasStartedGame = true
							bg.color = rgb(50, 50, 50)
						}
						
						if (!storeOpen) {
							manageScore(GameState.score += scorePerClick)
							// manageScore(score += 10000)
			
							GameState.maxScore += scorePerClick
			
							play("clickRelease", {
								detune: rand(-200, 200)
							})
			
							// one below of the triggering one???
							if (GameState.maxScore == 1) scoreText.opacity = 1
							if (GameState.maxScore == 4) tween(multiplierText.opacity, 1, 0.5, (p) => multiplierText.opacity = p, )
							if (GameState.maxScore == 9) tween(spsText.opacity, 1, 0.5, (p) => spsText.opacity = p, )
							if (GameState.maxScore == 24) {
								tween(store.opacity, 1, 0.5, (p) => store.opacity = p, )
								store.use(area({ scale: vec2(1.5) }))
							}
							// if (GameState.cursors >= 1) tween(cursorsText.opacity, 1, 0.25, (p) => cursorsText.opacity = p, )

							let plusScoreText = add([
								text(`+${scorePerClick}`),
								pos(rand(mousePos().x - 12, mousePos().x + 12), rand(mousePos().y - 12, mousePos().y + 12)),
								anchor("center"),
								rotate(0),
								opacity(1),
								rotate(rand(-10, 10)),
								{
									update() {
										this.text = `+${scorePerClick}`
									}
								}
							])
			
							// animate plusscoretext
							tween(plusScoreText.pos.y, plusScoreText.pos.y - 20, 0.25, (p) => plusScoreText.pos.y = p, )
							tween(plusScoreText.opacity, 0, 0.25, (p) => plusScoreText.opacity = p, )
							tween(plusScoreText.angle, rand(-10, 10), 0.25, (p) => plusScoreText.angle = p, )
							
							// the offscreen component didnt want to work :(
							wait(0.25, () => {
								destroy(plusScoreText)
							})
			
							// wait(0.25, () => {
							// 	tween(plusScoreText.opacity, 0, 0.25, (p) => plusScoreText.opacity = p, )
							// })
							// score text
							tween(0, rand(-10, 10), 0.08, (p) => scoreText.angle = p, easings.easeOutBounce)
							tween(50, 55 , 0.08, (p) => scoreText.pos.y = p, easings.easeOutBounce)
							wait(0.25, () => {
								tween(scoreText.angle, 0, 0.25, (p) => scoreText.angle = p, easings.easeOutCubic)
								tween(55, 50, 0.08, (p) => scoreText.pos.y = p, easings.easeOutBounce)
							})
							
							// hexagon
							tween(vec2(0.212121), vec2(0.22), 0.35, (p) => hexagonObj.scale = p, easings.easeOutBounce)
						}
					}
				}
			}
		])

		hexagonObj.onMousePress("left", () => {
			if (canClickHexagon == true && !storeOpen && canClickStuff == true) {
				cps += GameState.scoreMultiplier
				tween(vec2(0.22), vec2(0.212121), 0.35, (p) => hexagonObj.scale = p, easings.easeOutBounce)
				play("clickPress", {
					detune: rand(-50, 50)
				})
				mouse.play("grab")
			} 
		})
		
		hexagonObj.onMouseRelease("left", () => {
			if (canClickHexagon == true && !storeOpen && canClickStuff) {
				hexagonObj.click()
				mouse.play("point")
			}
		})

		mouse.onCollide("hexagon", () => {
			if (!storeOpen && canClickStuff) {
				tween(hexagonObj.pos.y, (height() / 2 + 32) - 10, 0.35, (p) => hexagonObj.pos.y = p, easings.easeOutCubic)
				tween(hexagonObj.scale, vec2(0.95), 0.35, (p) => hexagonObj.scale = p, easings.easeOutBounce)
				canClickHexagon = true
				mouse.play("point")
				// hexagon.rotSpeed += hexagon.rotSpeed / 4
			}
		})
		
		mouse.onCollideEnd("hexagon", () => {
			if (!storeOpen && canClickStuff) {
				tween(hexagonObj.pos.y, height() / 2 + 32, 0.35, (p) => hexagonObj.pos.y = p, easings.easeOutCubic)
				tween(hexagonObj.scale, vec2(1), 0.35, (p) => hexagonObj.scale = p, easings.easeOutBounce)
				canClickHexagon = false
				mouse.play("cursor")
				// hexagon.rotSpeed -= hexagon.rotSpeed / 4
			}
		})

		// TODO: Fix floating
		// floating
		// levitating
		// loop(hexagon.levitSpeed, () => {
		// 	wait(0.1, () => {
		// 		tween(hexagon.pos.y, hexagon.pos.y + 10, hexagon.levitSpeed, (p) => hexagon.pos.y = p, easings.easeInOutSine)
		// 		wait(hexagon.levitSpeed, () => {
		// 			tween(hexagon.pos.y, hexagon.pos.y - 10, hexagon.levitSpeed, (p) => hexagon.pos.y = p, easings.easeInOutSine)
		// 		})
		// 	})
		// })

		// #endregion

		// #region Text Stuff
		// TODO: Turn font into bitmap font so i can use letterSpacing
		scoreText = add([
			text(formatScore(GameState.score), {
				letterSpacing: 0.01
			}),
			pos(hexagonObj.pos.x, 50),
			anchor("center"),
			rotate(0),
			area( { scale: vec2(2) }),
			scale(2),
			{
				update() {
					this.text = formatScore(Math.floor(GameState.score))
				}
			}
		])
		
		maxScoreText = add([
			text("Max:" + formatScore(GameState.maxScore, {
				width: width()
			})),
			pos(scoreText.pos.x + 60, scoreText.pos.y - 30),
			anchor("center"),
			rotate(0),
			opacity(0),
			scale(0.6),
			{
				update() {
					this.text = "Max: " + formatScore(GameState.maxScore)
				}
			}
		])

		spsText = add([
			text(sps + "/s"),
			pos(scoreText.pos.x, scoreText.pos.y + 50),
			anchor("center"),
			rotate(0),
			scale(0.8),
			{
				verPosition: 100
			}
		])

		multiplierText = add([
			text(formatScore(GameState.scoreMultiplier) + "x"),
			pos(20, height() - 40),
			anchor("left"),
			{
				verPosition: height() - 40,
				update() {
					this.text = formatScore(GameState.scoreMultiplier) + "x"
				}
			}
		])

		cursorsText = add([
			text(formatScore(GameState.cursors) + "<"),
			pos(20, height() - 90),
			anchor("left"),
			{
				verPosition: height() - 90,
				update() {
					this.text = formatScore(GameState.cursors) + "<"
				}
			}
		])

		// #endregion

		// #region Store Stuff
		let store = add([
			rect(50, 50),
			pos(width() - 50, height() - 50),
			anchor("center"),
			area( hasStartedGame == true ? { scale: vec2(1.5) } : { scale: vec2(0) }),
			z(100),
			"store",
			{
				manage() {
					storeOpen = !storeOpen
					
					if (storeOpen) {
						// stopre opened
						markiplier = chance(0.05) ? 'Markiplier' : 'Multiplier'
						if (markiplier == "Markiplier") debug.log("HELLO EVERYONE MY NAME IS MARKIPLIER")
	
						tween(0, 0.5, 0.25, (p) => opaque.opacity = p, )

						tween(height() - 50, height() - 40, 0.25, (p) => store.pos.y = p, )
						// tween(height() - 50, height() - 40, 0.25, (p) => store.pos.y = p, )
						
						// storeUI
						tween(width(), width() - storeUI.width, 0.25, (p) => storeUI.pos.x = p, easings.easeOutElastic)
					}
					
					else {
						// store closened
						tween(0.5, 0, 0.25, (p) => opaque.opacity = p, )
						
						tween(height() - 40, height() - 50, 0.25, (p) => store.pos.y = p, easings.easeOutCubic)
						// tween(height() - 40, height() - 50, 0.25, (p) => store.pos.y = p, easings.easeOutCubic)

						// storeUI
						tween(storeUI.pos.x, width(), 0.25, (p) => storeUI.pos.x = p, easings.easeOutElastic)
					}
				}
			}
		])

		onKeyPress("o", () => {
			levitatingSpeed--
			debug.log(levitatingSpeed)
		})

		onKeyPress("p", () => {
			levitatingSpeed++
			debug.log(levitatingSpeed)
		})

		// saving loop
		wait(60, () => {
			if (GameState.maxScore > 10) {
				loop(60, () => {
					settingData()
					savingData(dataToSave)
					console.log(dataToSave)
				})
			}
		})

		function manageScore(newScore) {
			GameState.score = newScore
		}
		
		loop(3, () => {
			tween(multiplierText.verPosition, 541, 1.5, (p) => multiplierText.pos.y = p, easings.easeOutSine)
			
			wait(1.5, () => {
				tween(541, multiplierText.verPosition, 1.5, (p) => multiplierText.pos.y = p, easings.easeOutSine)
			})
		})

		loop(3.03, () => {
			tween(cursorsText.verPosition, 491, 1.515, (p) => cursorsText.pos.y = p, easings.easeOutSine)
			
			wait(1.515, () => {
				tween(491, cursorsText.verPosition, 1.515, (p) => cursorsText.pos.y = p, easings.easeOutSine)
			})
		})

		loop(3.15, () => {
			tween(spsText.verPosition, 105, 1.515, (p) => spsText.pos.y = p, easings.easeOutSine)
			
			wait(1.65, () => {
				tween(105, spsText.verPosition, 1.515, (p) => spsText.pos.y = p, easings.easeOutSine)
			})
		})
		
		scoreText.onHover(() => {
			if (!storeOpen && GameState.maxScore > 10) tween(0, 1, 0.15, (p) => maxScoreText.opacity = p, )
		})
		
		scoreText.onHoverEnd(() => {
			if (!storeOpen && GameState.maxScore > 10) tween(1, 0, 0.15, (p) => maxScoreText.opacity = p, )
		})

		mouse.onCollide("store", () => {
			tween(vec2(1), vec2(0.9), 0.35, (p) => store.scale = p, easings.easeOutQuart)
			// mouse.play("point")
		})

		mouse.onCollideEnd("store", () => {
			tween(vec2(0.9), vec2(1), 0.35, (p) => store.scale = p, easings.easeOutQuart)
			// mouse.play("cursor")
		})

		// TODO: Arreglar precios de la tienda

		let changeOfRotSpeedPerScore = 0
		
		// #endregion

		onUpdate(() => {
			if (GameState.score == 0) hexagonObj.rotSpeed = 0.01
			else {
				if (hexagonObj.rotSpeed < 15) {
					changeOfRotSpeedPerScore = (15 - 0.01) / scoreToAscend
					hexagonObj.rotSpeed = 0.01 + changeOfRotSpeedPerScore * GameState.score
				}
			}
			
			hexagonObj.angle += hexagonObj.rotSpeed
			
			if (hexagonObj.angle >= 3600) {
				hexagonObj.angle = 0
			}

			scorePerClick = GameState.scoreMultiplier

			// sps
			cpSecond += dt()
			if (cpSecond > 1) {
				cpSecond = 0
				spsText.text = sps + "/s"
				cps = 0
			}
			sps = (GameState.cursors * GameState.scoreMultiplier / 10 + cps)
			sps = sps.toFixed(1)

			// game juice for the shop thing
			storePitchSeconds += dt()
			if (storePitchSeconds > 0.5) {
				hasClicked = false
				tune = 0
			}
		})

		// debug
		let cheat = true
		
		// manageScore(1000000000)

		onKeyDown("q", () => {
			hexagonObj.click()
		})

		onKeyPress("w", () => {
			hexagonObj.click(true)
		})

		onKeyPress("e", () => {
			canBuyPowerup = true
			debug.log("can buy powerups")
			debug.log(canBuyPowerup)
		})

		onKeyDown("left", () => {
			camScale(0.5)
		})

		onKeyDown("d", () => {
			hexagonObj.rotSpeed--
		})
		
		onKeyDown("f", () => {
			hexagonObj.rotSpeed++
		})

		// saving data
		onKeyPress("c", () => {
			settingData()
			savingData(dataToSave)
			console.log(getData("hexagon_save"))
		})
		
		// deleting data
		onKeyPress("v", () => {
			GameState.score = 0
			GameState.maxScore = 0
			GameState.scoreMultiplier = 1
			GameState.cursors = 0
			GameState.hasUnlockedPowerups = false

			settingData()
			savingData(dataToSave)
		})

		// cheatingData
		onKeyPress("b", () => {
			GameState.score = 100000
			GameState.maxScore = 100000
			GameState.scoreMultiplier = 200
			GameState.cursors = 200
			GameState.hasUnlockedPowerups = true

			settingData()
			savingData(dataToSave)
		})

		onKeyDown("right", () => {
			camScale(1)
		})

		// checks game started
		if (hasStartedGame == false && GameState.score < 1) {
			ominus = play("ominus")
			ominus.play()
			bg.color = BLACK
		
			scoreText.opacity = 0
			multiplierText.opacity = 0
			spsText.opacity = 0
			cursorsText.opacity = 0
			store.opacity = 0
		}

		else {
			// play("game_music")
			hasStartedGame = true
			bg.color = rgb(50, 50, 50)
		}
		
		let autoCursor = add([
			sprite("auto_cursor"),
			scale(0.9),
			pos(width(), height()),
			opacity(0),
			rotate(0)
		])
		
		let autoPlusScoreText = add([
			text(`+${GameState.scoreMultiplier * GameState.cursors}`),
			pos(rand(autoCursor.pos.x - 12, autoCursor.pos.x + 12), rand(autoCursor.pos.y - 12, autoCursor.pos.y + 12)),
			anchor("center"),
			rotate(0),
			scale(0.8),
			opacity(0),
			rotate(rand(-10, 10)),
			{
				update() {
					this.text = `+${GameState.scoreMultiplier * GameState.cursors}`
				}
			}
		]);
		
		let autoLoop = loop(10, () => {
			// that means its clicking auto :)
			hexagonObj.click(true)
		})
		// determines autoLoop state
		autoLoop.paused = true
		
		if (GameState.cursors >= 1) {
			wait(10, () => {
				if (GameState.cursors >= 1) {
					autoLoop.paused = false
				}
	
				else {
					autoLoop.paused = true
				}
			})
		}

		// code for spawning outside screen
		// // width
		// autoCursor.pos.x = rand(-100, width() + 100)

		// // height

		// if (autoCursor.pos.x < 0 || autoCursor.pos.x > width() + 10) {
		// 	autoCursor.pos.y = rand(-100, height() + 100)
		// }
		
		// else {
		// 	autoCursor.pos.y = choose([-100, height() + 100])
		// }

		let children;

		let opaque = add([
			rect(width(), height()),
			opacity(0),
			color(BLACK)
		])

		let storeUI = add([
			rect(width() / 2 - width() / 8, height()),
			pos(width(), 0),
			color(34, 50, 97),
			// anchor("center")
		])

		// auto curosrs
		storeUI.add([
			pos(10, 50),
			text(`Cursor (${GameState.cursors + 1})\n$${formatPrice(15)}`),
			scale(0.9),
			anchor("left"),
			color(),
			area(),
			"cursorElement",
			"storeElement",
			{
				canBuyCursors: true,
				verPosition: 50,
				basePrice: 25,
				price: 25,
				working() {
					if (GameState.cursors < 3) {
						this.price += 5
					}

					else {
						this.price += Math.floor(this.basePrice * GameState.cursors / 8)
					}
					// unlock cursors
					if (GameState.cursors < 1) {
						GameState.cursors++
						this.canBuyCursors = false
						wait(2.5, () => {
							this.canBuyCursors = true
						})
					
						tween(autoCursor.opacity, 1, 0.25, (p) => autoCursor.opacity = p, )
						tween(autoCursor.pos, center(), 2, (p) => autoCursor.pos = p, )
						
						wait(2, () => {
							manageScore(GameState.score + (GameState.scoreMultiplier * GameState.cursors))
							GameState.maxScore += GameState.scoreMultiplier * GameState.cursors
							
							tween(autoPlusScoreText.opacity, 1, 0.25, (p) => autoPlusScoreText.opacity = p, )
							// play click
							tween(vec2(0.22), vec2(0.212121), 0.35, (p) => hexagonObj.scale = p, easings.easeOutBounce)
							play("clickPress", {
								detune: rand(-50, 50)
							})
			
							wait(0.20, () => {
								tween(autoCursor.opacity, 0, 0.25, (p) => autoCursor.opacity = p, )
								tween(autoPlusScoreText.opacity, 0, 0.25, (p) => autoPlusScoreText.opacity = p, )
								
								play("clickRelease", {
									detune: rand(-200, 200)
								})

								tween(cursorsText.opacity, 1, 0.25, (p) => cursorsText.opacity = p, )

								autoPlusScoreText.pos.x = autoCursor.pos.x + rand(-20, 20)
								autoPlusScoreText.pos.y = autoCursor.pos.y + rand(-20, 20)

								// appearing animations
								tween(autoPlusScoreText.pos.y, autoPlusScoreText.pos.y - 20, 0.25, (p) => autoPlusScoreText.pos.y = p, )
								tween(autoPlusScoreText.angle, rand(-10, 10), 0.25, (p) => autoPlusScoreText.angle = p, )

								tween(0, rand(-10, 10), 0.08, (p) => scoreText.angle = p, easings.easeOutBounce)
								tween(50, 55 , 0.08, (p) => scoreText.pos.y = p, easings.easeOutBounce)
								wait(0.25, () => {
									tween(scoreText.angle, 0, 0.25, (p) => scoreText.angle = p, easings.easeOutCubic)
									tween(55, 50, 0.08, (p) => scoreText.pos.y = p, easings.easeOutBounce)
								})
								
								// hexagon
								tween(vec2(0.212121), vec2(0.22), 0.35, (p) => hexagonObj.scale = p, easings.easeOutBounce)
							
								wait(10, () => {
									autoLoop.paused = false
								})
							})
						})
					}

					else {
						GameState.cursors++
					}
				},
				
				update() {
					this.text = `Cursor (${GameState.cursors + 1})\n$${formatPrice(this.price)}`
				}
			}
		])
		
		// multiplier buy
		storeUI.add([
			pos(10, 150),
			text(`Multiplier\n(${formatPrice(GameState.scoreMultiplier + 1)}x)\n$25`),
			scale(0.89),
			anchor("left"),
			color(),
			area(),
			"storeElement",
			{
				verPosition: 150,
				basePrice: 25,
				price: 25,
				working() {
					GameState.scoreMultiplier += buyMultiplier
					this.price = Math.floor(GameState.scoreMultiplier * this.basePrice * 0.5)
				},
				
				update() {
					if (GameState.scoreMultiplier > 1) this.price = Math.floor(GameState.scoreMultiplier * this.basePrice * 0.5)
					this.text = `${markiplier} (${formatPrice(GameState.scoreMultiplier + 1)}x)\n$${formatPrice(this.price)}`
				}
			}
		])

		// powerups unlock / buy
		storeUI.add([
			pos(10, 250),
			text(GameState.hasUnlockedPowerups == false ? `Unlock power-ups\n1K` : `Buy random power up\n1M`),
			scale(0.89),
			anchor("left"),
			color(),
			area(),
			"powerupElement",
			"storeElement",
			{
				verPosition: 250,
				basePrice: 1000,
				price: 1000,
				working() {
					// hasn't
					if (!GameState.hasUnlockedPowerups) {
						GameState.hasUnlockedPowerups = true
					}

					// has
					else {
						powerups = shuffleArray(powerups)
						canBuyPowerup = false

						wait(10, () => {
							canBuyPowerup = true
							debug.log("can buy")
						})

						let timesItSwitched = 0

						let whatPowerUpWillYouGet = add([
							sprite("hexagon"),
							color(WHITE),
							pos(center()),
							area(),
							scale(0.04),
						])
						
						let timeUntilSwitch = 0.1
						let timesSwitched = 0
						let powerUpIndex = 0

						let loopy = loop(timeUntilSwitch, () => {
							timesSwitched++
							if (timesSwitched < 50) {
								powerUpIndex++
								if (powerUpIndex > 3) powerUpIndex = 0
								whatPowerUpWillYouGet.color = powerups[powerUpIndex].color
							}

							if (timesSwitched == 30) timeUntilSwitch = 3
							if (timesSwitched == 20) {
								loopy.cancel()
								
								let powerUpYouGot = spawnPowerUp(powerups[powerUpIndex], whatPowerUpWillYouGet.pos)
								destroy(whatPowerUpWillYouGet)
								
								wait(0.8, () => {
									powerUpYouGot.onUpdate(() => {
										canClickStuff = !powerUpYouGot.isHovering()
									})

									loop(6.5, () => {
										tween(powerUpYouGot.pos, vec2(rand(0, width()), rand(0, height())), 6.5, (p) => powerUpYouGot.pos = p,)
									})
	
									powerUpYouGot.onMousePress("left", () => {
										tween(powerUpYouGot.scale, vec2(0.1), 0.35, (p) => powerUpYouGot.scale = p, easings.easeOutBounce)
									})
									
									powerUpYouGot.onMouseRelease("left", () => {
										powerUpYouGot.execute()
										destroy(powerUpYouGot)
										canClickStuff = true
									})
								})
							}
						})
					}

					// this.price = Math.floor(scoreMultiplier * this.basePrice * 0.5)
				},
				
				update() {
					// if (scoreMultiplier > 1) this.price = Math.floor(scoreMultiplier * this.basePrice * 0.5)
					this.text = !GameState.hasUnlockedPowerups ? `Unlock power-ups\n1K` : `Buy random power up\n1M`
				}
			}
		])

		children = storeUI.get("*", { recursive: true })

		children[0].price = GameState.scoreMultiplier == 1 ? 25 : Math.floor(children[0].price + children[0].price * GameState.scoreMultiplier / 10)

		// FIXME: Arreglar animaciones en la store ui
		children.forEach((element) => {
			element.onHover(() => {
				tween(element.color, BLUE, 1, (p) => element.color = p)
				tween(element.pos.y, element.verPosition - 10, 0.35, (p) => element.pos.y = p, easings.easeOutCubic)
				tween(element.scale, vec2(0.95), 0.35, (p) => element.scale = p, easings.easeOutBounce)
				// debug.log(element.price)
			})
			
			element.onHoverEnd(() => {
				tween(element.color, WHITE, 1, (p) => element.color = p)
				tween(element.verPosition - 10, element.verPosition, 0.35, (p) => element.pos.y = p, easings.easeOutCubic)
				tween(element.scale, vec2(0.9), 0.35, (p) => element.scale = p, easings.easeOutBounce)
			})

			element.onMousePress("left", () => {
				if (element.isHovering() && canClickStuff == true) tween(element.scale, vec2(0.8), 0.35, (p) => element.scale = p, easings.easeOutBounce)
			})

			element.onMouseRelease("left", () => {
				if (element.isHovering() && canClickStuff == true) {
					if (element.is("powerupElement") && canBuyPowerup == false) {
						debug.log("you can't do that yet")
					}

					else if (element.is("cursorElement") && element.canBuyCursors == false) {
						debug.log("you can't do that yet")
					}

					else {
						tween(element.scale, vec2(0.95), 0.35, (p) => element.scale = p, easings.easeOutBounce)
						if (GameState.score >= element.price) {
							// reduces score to price cool animation
							tween(Math.floor(GameState.score), Math.floor(GameState.score - element.price), 0.25, (p) => GameState.score = p)
							element.working()
							// manageScore(GameState.score -= element.price)
						
							// game juice :sunglasses: 
							hasClicked = true
							storePitchSeconds = 0
							if (hasClicked == true) tune += 25
							play("kaching", { detune: tune })
							
							tween(element.pos.y, element.pos.y - 5, 0.10, (p) => element.pos.y = p, )
							wait(0.10, () => {
								tween(element.pos.y, element.pos.y + 5, 0.10, (p) => element.pos.y = p, )
							})
							shake(0.1)
						}
						
						else {
							shake(1)
							play("wrong", { detune: rand(-10, 10) })
		
							tween(element.color, RED, 0.1, (p) => element.color = p, )
							
							wait(0.1, () => {
								tween(element.color, rgb(59, 169, 209), 0.1, (p) => element.color = p, )
							})
						}
					}
				}
			})
		})

		// TODO: Make this work because it would be real cool
		// onKeyPress("")

		onKeyPress("1", () => {
			debug.log("holding")
		})
		
		onKeyRelease("1", () => {
			// children[0].actuallyBuying()
		})
		
		onKeyPress("2", () => {
			children[1].working()
		})
		
		onKeyRelease("2", () => {
			children[1].working()
		})

		onKeyPress("3", () => {
			children[2].working()
		})

		onKeyRelease("3", () => {
			children[2].working()
		})
		
		onKeyPress("space", () => {
			if (GameState.maxScore >= 25) {
				store.manage()
				play("store")
			}
		})
		
		store.onClick(() => {
			if (GameState.maxScore >= 25) {
				store.manage()
				play("store")
			}
		})
	})
} 