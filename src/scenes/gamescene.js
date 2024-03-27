import { GameState } from "../main.js";

import { savingData } from "../dataManaging.js";
import { formatPrice, formatScore } from "./FormattingFunctions.js";
import { definePowerups, shuffleArray, spawnPowerUp } from "./powerups.js";

export let sps = 0; // score per second
let cps = 0; // to properly calculate sps
let cpSecond = 0; // to properly calculate sps
export let scorePerClick = 1;

export let hasStartedGame = false;
let ominus;

// game managinig variables
let storeOpen = false;
let canClickHexagon = false;
let canActuallyClickHexagon = false;

// used to determine the game juice pitch at buying things thingy
let hasClicked = false;
let storePitchSeconds = 0;
let tune = 0;

// this is for the amount of multiplier i have to add to the scoremultiplier every time you buy them
let buyMultiplier = 1;

let markiplier = "";

let millionsForLevitSpeed = 0;

let scoreToAscend = 1000000;

let dataToSave;

// totally not anti cheat
let constTimeTilClick = 37/1000
// let constTimeTilClick = 1
let timeTilClick = constTimeTilClick
let isWaitingToClick = false

function settingData() {
	dataToSave = {
		_score: GameState.score,
		_maxScore: GameState.maxScore,
		_scoreMultiplier: GameState.scoreMultiplier,
		_scorePerClick: scorePerClick,
		_cursors: GameState.cursors,
		_hasUnlockedPowerUps: GameState.hasUnlockedPowerups,
		_volumeIndex: GameState.volumeIndex,
	};
}

let powerups;
let canBuyPowerup = false;
export let canClickStuff = true;

export function setCanClickStuff(value) {
	canClickStuff = value;
}

function percentage(number, percentageTo) {
	return (number * percentageTo) / 100
}

function priceFormula(basePrice, percentageIncrease, objectAmount, isMultiplier) {
	return Math.round((basePrice + (percentage(basePrice, percentageIncrease) * isMultiplier ? objectAmount : objectAmount - 1)))
}

// TODO: Re work power ups
// TODO: Menu scene transitions
// TODO: Menuscene
// TODO: Community scene which implies the whole newgrounds shmuck thing
// TODO: Crear assets para las mejoras de la tienda, tendria un huequito para poder poner el texto de cuanto vale, este texto estaria formateado de distinta manera que el scoreText

// DEFINING OBJECTS
let hexagonObj;
export let mouse;

let scoreText;
let maxScoreText;
let spsText;
let multiplierText;
let cursorsText;

// GRRRRR

export function gamescene() {
	return scene("gamescene", () => {
		if (GameState.hasUnlockedPowerups == true) canBuyPowerup = true;
		if (GameState.maxScore > 0) hasStartedGame = true;

		let bg = add([
			rect(width() * 2, height() * 2),
			pos(center()),
			// color(50, 50, 50),
			color(50, 50, 50),
			stay(),
			z(0),
			anchor("center"),
			"bg",
		]);

		setCursor("none");
		setGravity(1600);

		mouse = add([
			sprite("cursors"),
			pos(mousePos()),
			rotate(0),
			area(),
			//   area({ scale: vec2(0.5), offset: vec2(0, -20) }),
			anchor("center"),
			z(9999999999),
			opacity(1),
			{
				waiting: false,
				update() {
					this.pos = mousePos();
				},
				waitAnim() {
					if (this.waiting == false) {
						this.play("wait");
						this.waiting = true;
						let l = loop(0.25, () => {
							this.angle += 90;
							if (this.angle == 180) this.flipY = true;
						});

						wait(1, () => {
							l.cancel();
							this.play("cursor");
							this.waiting = false;
							this.angle = 0;
							this.flipY = false;
						});
					}
				},
			},
		]);

		// #endregion

		// they need bg to work
		powerups = definePowerups();

		// #region Hexagon Stuff
		hexagonObj = add([
			sprite("hexagon"),
			pos(width() / 2, height() / 2 + 50),
			anchor("center"),
			scale(1),
			color(WHITE),
			state("down", ["down", "up"]),
			area({
				shape: new Polygon([
					vec2(406, 118),
					vec2(613, 116),
					vec2(711, 292),
					vec2(615, 463),
					vec2(411, 466),
					vec2(315, 293),
				]),
				offset: vec2(-512, -289),
			}),

			rotate(),
			"hexagon",
			{
				// hoverSize: 1.01,
				// pressSize: 0.96,
				verPosition: height() / 2 + 50, // 328
				thingiesPerClick: 0,
				rotSpeed: 0.010,
				levitSpeed: 5,
				click(auto) {
					// for (let i = 0; i < this.thingiesPerClick; i++) {
					// 	if (GameState.score > 1000 && GameState.hasUnlockedPowerups) {
					// 		wait(rand(0.1, 0.5), () => {
					// 		let obj = add([
					// 			pos(
					// 			rand(0, width() - 10),
					// 			-20,
					// 			),
								// z(1),
					// 			sprite("hexagon"),
					// 			opacity(0.9),
					// 			scale(0.1),
					// 			rotate(0),
					// 			anchor("center"),
					// 			// area(),
					// 			// body(),
					// 		]);
	
					// 		tween(
					// 			obj.pos.y,
					// 			height(),
					// 			2.5,
					// 			(p) => obj.pos.y = p,
					// 		);
	
					// 		wait(1.25, () => {
					// 		tween(
					// 			obj.opacity,
					// 			0,
					// 			1,
					// 			(p) => obj.opacity = p,
					// 		);
	
					// 			wait(1, () => {
					// 				destroy(obj);
					// 			});
					// 		});
	
					// 			onUpdate(() => {
					// 			obj.angle += rand(1, 2.5);
					// 		// }
	
					// 			// if (!obj.pos.x > width() / 2) {
					// 			//   obj.use(area({ scale: vec2(0) }));
					// 			// } else {
					// 			//   obj.use(area({ scale: vec2(1) }));
					// 			// }
					// 			});
					// 		});
					// 	}
					// }

					if (auto == true) {
						// fucking cursor position
						autoCursor.pos.x = rand(
							hexagonObj.pos.x - 50,
							hexagonObj.pos.x + 50,
						);
						autoCursor.pos.y = rand(
							hexagonObj.pos.y - 50,
							hexagonObj.pos.y + 50,
						);

						if (
							autoCursor.pos.x > hexagonObj.pos.x - 50
							&& autoCursor.pos.x < hexagonObj.pos.x
						) {
							autoCursor.angle = 90;
						} else if (
							autoCursor.pos.x > hexagonObj.pos.x
							&& autoCursor.pos.x < hexagonObj.pos.x + 50
						) {
							autoCursor.angle = 270;
						}

						if (
							autoCursor.pos.y > hexagonObj.pos.y - 50
							&& autoCursor.pos.y < hexagonObj.pos.y
						) {
							autoCursor.angle += 45;
						} else if (
							autoCursor.pos.y > hexagonObj.pos.y
							&& autoCursor.pos.y < hexagonObj.pos.y + 50
						) {
							autoCursor.angle -= 45;
						}

						// autoplusscoretext horizontal position
						if (
							autoCursor.pos.x > hexagonObj.pos.x - 50
							&& autoCursor.pos.x < hexagonObj.pos.x
						) {
							autoPlusScoreText.pos.x = autoCursor.pos.x
								- (rand(50, 65));
						} else if (
							autoCursor.pos.x > hexagonObj.pos.x
							&& autoCursor.pos.x < hexagonObj.pos.x + 50
						) {
							autoPlusScoreText.pos.x = autoCursor.pos.x
								+ (rand(50, 65));
						}

						autoPlusScoreText.pos.y = autoCursor.pos.y
							+ rand(-20, 20);

						autoClickAnim.scale = vec2(1);
						autoClickAnim.pos = autoCursor.pos;
						autoClickAnim.angle = 0;

						// appearing animations
						tween(
							autoCursor.opacity,
							1,
							0.25,
							(p) => autoCursor.opacity = p,
						);
						tween(
							autoPlusScoreText.opacity,
							1,
							0.25,
							(p) => autoPlusScoreText.opacity = p,
						);
						tween(
							autoPlusScoreText.pos.y,
							autoPlusScoreText.pos.y - 20,
							0.25,
							(p) => autoPlusScoreText.pos.y = p,
						);
						tween(
							autoPlusScoreText.angle,
							rand(-10, 10),
							0.25,
							(p) => autoPlusScoreText.angle = p,
						);

						tween(
							autoClickAnim.opacity,
							1,
							0.26,
							(p) => autoClickAnim.opacity = p,
						);

						// score managing and hexagon animations
						manageScore(
							GameState.score
								+ (GameState.scoreMultiplier
									* GameState.cursors),
							GameState.scoreMultiplier * GameState.cursors,
						);

						// play click
						tween(
							vec2(1),
							vec2(0.96),
							0.35,
							(p) => hexagonObj.scale = p,
							easings.easeOutBounce,
						);
						play("clickPress", {
							detune: rand(-50, 50),
						});

						// releasing
						wait(0.20, () => {
							tween(
								autoCursor.opacity,
								0,
								0.25,
								(p) => autoCursor.opacity = p,
							);
							tween(
								autoPlusScoreText.opacity,
								0,
								0.25,
								(p) => autoPlusScoreText.opacity = p,
							);

							play("clickRelease", {
								detune: rand(-200, 200),
							});

							tween(
								autoClickAnim.opacity,
								0,
								0.25,
								(p) => autoClickAnim.opacity = p,
							);
							tween(
								autoClickAnim.scale,
								vec2(2),
								0.25,
								(p) => autoClickAnim.scale = p,
							);
							tween(
								autoClickAnim.angle,
								360,
								0.25,
								(p) => autoClickAnim.angle = p,
							);

							tween(
								0,
								rand(-10, 10),
								0.08,
								(p) => scoreText.angle = p,
								easings.easeOutBounce,
							);
							tween(
								50,
								55,
								0.08,
								(p) => scoreText.pos.y = p,
								easings.easeOutBounce,
							);
							wait(0.25, () => {
								tween(
									scoreText.angle,
									0,
									0.25,
									(p) => scoreText.angle = p,
									easings.easeOutCubic,
								);
								tween(
									55,
									50,
									0.08,
									(p) => scoreText.pos.y = p,
									easings.easeOutBounce,
								);
							});

							// hexagon
							tween(
								vec2(0.96),
								vec2(1),
								0.35,
								(p) => hexagonObj.scale = p,
								easings.easeOutBounce,
							);
						});
					} // manual click
					else {
						// starting game
						if (hasStartedGame == false && GameState.score < 1) {
							ominus.stop();
						}

						if (hasStartedGame == false && GameState.score == 1) {
							// play("game_music")
							hasStartedGame = true;
							bg.color = rgb(50, 50, 50);
						}

						if (!storeOpen) {
							manageScore(
								GameState.score += scorePerClick,
								scorePerClick,
							);
							play("clickRelease", {
								detune: rand(-200, 200),
							});

							if (GameState.maxScore == 1) scoreText.opacity = 1;
							if (GameState.maxScore == 5) {
								tween(
									multiplierText.pos.x,
									20,
									0.5,
									(p) => multiplierText.pos.x = p,
									easings.easeOutBack,
								);
							}
							if (GameState.maxScore == 10) {
								tween(
									spsText.opacity,
									1,
									0.5,
									(p) => spsText.opacity = p,
								);
							}
							if (GameState.maxScore == 25) {
								tween(
									store.pos.y,
									height() - 50,
									0.5,
									(p) => store.pos.y = p,
									easings.easeOutBack,
								);
								store.use(area({ scale: vec2(1.5) }));
							}
							// if (GameState.cursors >= 1) tween(cursorsText.opacity, 1, 0.25, (p) => cursorsText.opacity = p, )

							let plusScoreText = add([
								text(`+${scorePerClick}`),
								// pos(rand(mousePos().x - 25, mousePos().x + 25), rand(mousePos().y - 25, mousePos().y + 25)),
								pos(
									rand(mousePos().x - 25, mousePos().x + 25),
									choose([
										rand(
											mousePos().y - 10,
											mousePos().y - 15,
										),
										rand(
											mousePos().y + 10,
											mousePos().y + 15,
										),
									]),
								),
								anchor("center"),
								rotate(0),
								opacity(1),
								rotate(rand(-10, 10)),
								{
									update() {
										this.text = `+${scorePerClick}`;
									},
								},
							]);

							// animate plusscoretext
							tween(
								plusScoreText.pos.y,
								plusScoreText.pos.y - 20,
								0.25,
								(p) => plusScoreText.pos.y = p,
							);
							tween(
								plusScoreText.opacity,
								0,
								0.25,
								(p) => plusScoreText.opacity = p,
							);
							tween(
								plusScoreText.angle,
								rand(-10, 10),
								0.25,
								(p) => plusScoreText.angle = p,
							);

							// the offscreen component didnt want to work :(
							wait(0.25, () => {
								destroy(plusScoreText);
							});

							wait(0.25, () => {
								tween(
									plusScoreText.opacity,
									0,
									0.25,
									(p) => plusScoreText.opacity = p,
								);
							});
							// score text
							tween(
								0,
								rand(-10, 10),
								0.08,
								(p) => scoreText.angle = p,
								easings.easeOutBounce,
							);
							tween(
								50,
								55,
								0.08,
								(p) => scoreText.pos.y = p,
								easings.easeOutBounce,
							);
							wait(0.25, () => {
								tween(
									scoreText.angle,
									0,
									0.25,
									(p) => scoreText.angle = p,
									easings.easeOutCubic,
								);
								tween(
									55,
									50,
									0.08,
									(p) => scoreText.pos.y = p,
									easings.easeOutBounce,
								);
							});

							// hexagon
							tween(
								vec2(0.96),
								vec2(1.01),
								0.35,
								(p) => hexagonObj.scale = p,
								easings.easeOutBounce,
							);
						}
					}
				},
			},
		]);

		hexagonObj.onMousePress("left", () => {
			if (hexagonObj.isHovering()) {
				// if (canClickHexagon && !storeOpen && canClickStuff) {
				if (canClickHexagon && timeTilClick < 0 && !storeOpen && canClickStuff) {
					cps += GameState.scoreMultiplier;
					tween(
						vec2(1),
						vec2(0.96),
						0.35,
						(p) => hexagonObj.scale = p,
						easings.easeOutBounce,
					);
					play("clickPress", {
						detune: rand(-50, 50),
					});
					if (!mouse.waiting) {
						mouse.play("grab");
					}
				}
			}
		});

		hexagonObj.onMouseRelease("left", () => {
			if (hexagonObj.isHovering()) {
				if (canClickHexagon && !isWaitingToClick && !storeOpen && canClickStuff) {
					timeTilClick = constTimeTilClick
					isWaitingToClick = true
					hexagonObj.click();
					if (!mouse.waiting) {
						mouse.play("point");
					}
				}
			}
		});

		hexagonObj.onHover(() => {
			if (!storeOpen && canClickStuff) {
				tween(
					hexagonObj.pos.y,
					hexagonObj.verPosition - 10,
					0.35,
					(p) => hexagonObj.pos.y = p,
					easings.easeOutCubic,
				);
				tween(
					hexagonObj.scale,
					vec2(1.01, 1.01),
					0.35,
					(p) => hexagonObj.scale = p,
					easings.easeOutBounce,
				);
				canClickHexagon = true;
				if (!mouse.waiting) {
					mouse.play("point");
				}
				hexagonObj.rotSpeed += hexagonObj.rotSpeed / 4;
			}
		});

		hexagonObj.onHoverEnd(() => {
			if (canClickStuff) {
				tween(
					hexagonObj.pos.y,
					hexagonObj.verPosition,
					0.35,
					(p) => hexagonObj.pos.y = p,
					easings.easeOutCubic,
				);
				tween(
					vec2(1.01),
					vec2(1),
					0.35,
					(p) => hexagonObj.scale = p,
					easings.easeOutBounce,
				);
				canClickHexagon = false;
				if (!mouse.waiting) {
					mouse.play("cursor");
				}
				hexagonObj.rotSpeed -= hexagonObj.rotSpeed / 4;
			}
		});

		/*
		// TODO: Fix floating
		// levitating
		hexagonObj.onStateEnter("down", () => {
			tween(hexagonObj.verPosition, hexagonObj.verPosition + 10, hexagonObj.levitSpeed, (p) => hexagonObj.verPosition = p)
			tween(hexagonObj.pos.y, hexagonObj.verPosition, hexagonObj.levitSpeed, (p) => hexagonObj.pos.y = p)

			wait(hexagonObj.levitSpeed, () => {
				hexagonObj.enterState("up")
			})
		})

		hexagonObj.onStateEnter("up", () => {
			tween(hexagonObj.verPosition, hexagonObj.verPosition - 10, hexagonObj.levitSpeed, (p) => hexagonObj.verPosition = p)
			tween(hexagonObj.pos.y, hexagonObj.verPosition, hexagonObj.levitSpeed, (p) => hexagonObj.pos.y = p)

			wait(hexagonObj.levitSpeed, () => {
				hexagonObj.enterState("down")
			})
		})
		*/
		// #endregion

		// #region Text Stuff
		// TODO: Turn font into bitmap font so i can use letterSpacing
		scoreText = add([
			text(formatScore(GameState.score), {
				letterSpacing: 0.01,
			}),
			pos(hexagonObj.pos.x, 50),
			anchor("center"),
			rotate(0),
			area({ scale: vec2(2) }),
			scale(2),
			{
				update() {
					this.text = formatScore(Math.round(GameState.score));
				},
			},
		]);

		maxScoreText = add([
			text(formatScore(GameState.maxScore, {
				width: width(),
			})),
			pos(scoreText.pos.x, scoreText.pos.y - 35),
			anchor("center"),
			rotate(0),
			opacity(0),
			scale(0.6),
			{
				update() {
					this.text = formatScore(Math.round(GameState.maxScore));
				},
			},
		]);

		spsText = add([
			text(sps + "/s"),
			pos(scoreText.pos.x, 100),
			anchor("center"),
			rotate(0),
			opacity(hasStartedGame ? 1 : 0),
			scale(0.8),
			{
				verPosition: 100,
			},
		]);

		multiplierText = add([
			text(formatScore(GameState.scoreMultiplier) + "x"),
			pos(hasStartedGame ? 20 : -60, height() - 40),
			anchor("left"),
			{
				verPosition: height() - 40,
				update() {
					this.text = formatScore(GameState.scoreMultiplier) + "x";
				},
			},
		]);

		cursorsText = add([
			text(formatScore(GameState.cursors) + "<"),
			pos(20, height() - 90),
			opacity(GameState.cursors >= 1 ? 1 : 0),
			anchor("left"),
			{
				verPosition: height() - 90,
				update() {
					this.text = formatScore(GameState.cursors) + "<";
				},
			},
		]);

		// #endregion

		// #region Store Stuff
		let store = add([
			rect(50, 50),
			pos(width() - 50, hasStartedGame ? height() - 50 : height() + 150),
			anchor("center"),
			area(
				hasStartedGame == true
					? { scale: vec2(1) }
					: { scale: vec2(0) },
			),
			z(100),
			opacity(1),
			"store",
			{
				manage() {
					storeOpen = !storeOpen;

					if (storeOpen) {
						// stopre opened
						markiplier = chance(0.05) ? "Markiplier" : "Multiplier";

						tween(
							height() - 50,
							height() - 40,
							0.25,
							(p) => store.pos.y = p,
						);

						// opaque
						tween(0, 0.5, 0.25, (p) => opaque.opacity = p);
						// storeUI
						tween(
							width(),
							width() - 384,
							0.15,
							(p) => storeUI.pos.x = p,
							easings.easeOutBack,
						);
					} else {
						// store closened
						tween(
							height() - 40,
							height() - 50,
							0.25,
							(p) => store.pos.y = p,
							easings.easeOutCubic,
						);

						// opaque
						tween(0.5, 0, 0.25, (p) => opaque.opacity = p);
						// storeUI
						tween(
							storeUI.pos.x,
							width(),
							0.15,
							(p) => storeUI.pos.x = p,
							easings.easeOutBack,
						);
					}
				},
			},
		]);

		onKeyPress("o", () => {
			levitatingSpeed--;
			debug.log(levitatingSpeed);
		});

		onKeyPress("p", () => {
			levitatingSpeed++;
			debug.log(levitatingSpeed);
		});

		// saving loop
		wait(60, () => {
			if (GameState.maxScore > 10) {
				loop(60, () => {
					settingData();
					savingData(dataToSave);
					console.log(dataToSave);
				});
			}
		});


		// this is 60 * 5
		wait(60 * 5, () => {
			loop(60 * 5, () => {
				if (GameState.hasUnlockedPowerups) {
					powerups = definePowerups();
					powerups = shuffleArray(powerups);
					spawnPowerUp(shuffleArray(powerups)[0], false);
				}
			});
		})

		// wait(1, () => {
		// 	loop(1, () => {
		// 		if (GameState.hasUnlockedPowerups) {
		// 			powerups = definePowerups();
		// 			powerups = shuffleArray(powerups);
		// 			spawnPowerUp(shuffleArray(powerups)[0], false);
		// 		}
		// 	});
		// })

		function manageScore(newScore, maxScoreAmount) {
			GameState.score = newScore;
			GameState.maxScore += maxScoreAmount;
		}

		loop(3, () => {
			tween(
				multiplierText.verPosition,
				541,
				1.5,
				(p) => multiplierText.pos.y = p,
				easings.easeOutSine,
			);

			wait(1.5, () => {
				tween(
					541,
					multiplierText.verPosition,
					1.5,
					(p) => multiplierText.pos.y = p,
					easings.easeOutSine,
				);
			});
		});

		loop(3.03, () => {
			tween(
				cursorsText.verPosition,
				491,
				1.515,
				(p) => cursorsText.pos.y = p,
				easings.easeOutSine,
			);

			wait(1.515, () => {
				tween(
					491,
					cursorsText.verPosition,
					1.515,
					(p) => cursorsText.pos.y = p,
					easings.easeOutSine,
				);
			});
		});

		loop(3.15, () => {
			if (hasStartedGame) {
				wait(10, () => {
					tween(
						spsText.verPosition,
						105,
						1.515,
						(p) => spsText.pos.y = p,
						easings.easeOutSine,
					);

					wait(1.65, () => {
						tween(
							105,
							spsText.verPosition,
							1.515,
							(p) => spsText.pos.y = p,
							easings.easeOutSine,
						);
					});
				});
			}
		});

		scoreText.onHover(() => {
			if (!storeOpen && GameState.maxScore > 10) {
				tween(0, 1, 0.15, (p) => maxScoreText.opacity = p);
				if (!mouse.waiting) {
					mouse.play("check");
				}
			}
		});

		scoreText.onHoverEnd(() => {
			if (GameState.maxScore > 10) {
				tween(1, 0, 0.15, (p) => maxScoreText.opacity = p);
				if (!mouse.waiting) {
					mouse.play("cursor");
				}
			}
		});

		// store
		store.onHover(() => {
			tween(
				vec2(1),
				vec2(1.09),
				0.35,
				(p) => store.scale = p,
				// easings.easeOutQuart,
			);
			if (!mouse.waiting) {
				mouse.play("point");
			}
		});

		store.onHoverEnd(() => {
			tween(
				vec2(1.05),
				vec2(1),
				0.35,
				(p) => store.scale = p,
				easings.easeOutQuart,
			);
			if (!mouse.waiting) {
				mouse.play("cursor");
			}
		});

		store.onMousePress("left", () => {
			if (store.isHovering()) {
				tween(
					vec2(1),
					vec2(0.9),
					0.35,
					(p) => store.scale = p,
					easings.easeOutQuart,
				);
				if (!mouse.waiting) {
					mouse.play("grab");
				}
			}
		});

		store.onMouseRelease("left", () => {
			if (store.isHovering()) {
				store.manage();

				tween(
					0,
					-12,
					0.1,
					(p) => store.angle = p,
					easings.easeinoutback,
				);
				wait(0.1, () => {
					tween(
						0,
						12,
						0.1,
						(p) => store.angle = p,
						easings.easeinoutback,
					);

					wait(0.1, () => {
						tween(
							store.angle,
							0,
							0.1,
							(p) => store.angle = p,
							easings.easeinoutback,
						);
					});
				});

				play("open_store");
				if (!mouse.waiting) {
					mouse.play("point");
				}
			}
		});

		onKeyPress("space", () => {
			if (GameState.maxScore >= 25) {
				store.manage();
				play("open_store");
			}
		});

		// TODO: Arreglar precios de la tienda

		let changeOfRotSpeedPerScore = 0;

		// #endregion

		onUpdate(() => {
			if (GameState.score == 0) hexagonObj.rotSpeed = 0.01;
			else {
				if (hexagonObj.isHovering()) {
					canClickHexagon = true
					if (hexagonObj.rotSpeed < 18.75) {
						changeOfRotSpeedPerScore = (18.75 - 0.01)
							/ scoreToAscend;
						hexagonObj.rotSpeed = 0.01
							+ changeOfRotSpeedPerScore * GameState.score;
					}
				} 
				
				else {
					canClickHexagon = false
					if (hexagonObj.rotSpeed < 15) {
						changeOfRotSpeedPerScore = (15 - 0.01) / scoreToAscend;
						hexagonObj.rotSpeed = 0.01 + changeOfRotSpeedPerScore * GameState.score;
					}
				}
			}

			hexagonObj.thingiesPerClick = Math.round(1 + ((4 - 1) / scoreToAscend) * GameState.score)

			hexagonObj.angle += hexagonObj.rotSpeed;

			if (hexagonObj.angle >= 360) {
				hexagonObj.angle = 0;
			}

			scorePerClick = GameState.scoreMultiplier;

			// sps
			cpSecond += dt();
			if (cpSecond > 1) {
				cpSecond = 0;
				spsText.text = sps + "/s";
				cps = 0;
			}
			sps = GameState.cursors / 10 + cps;
			sps = sps.toFixed(1);

			if (timeTilClick > 0) {
				timeTilClick -= dt()
			}
			else if (isWaitingToClick) {
				isWaitingToClick = false
			}

			// game juice for the shop thing
			storePitchSeconds += dt();
			if (storePitchSeconds > 0.5) {
				hasClicked = false;
				tune = 0;
			}
		});

		// debug
		let cheat = true;
		onKeyPress("tab", () => {
			debug.inspect = !debug.inspect;
		});

		// manageScore(1000000000)

		onKeyDown("q", () => {
			hexagonObj.click();
		});

		onKeyPress("w", () => {
			hexagonObj.click(true);
		});

		onKeyPress("e", () => {
			spawnPowerUp({
				pos: vec2(),
				bought: false,
				firstTime: false,
				choose: false,
				excludeBad: false
			})
			
		});

		onKeyDown("left", () => {
			camScale(0.5);
		});

		onKeyDown("d", () => {
			hexagonObj.rotSpeed--;
		});

		onKeyDown("f", () => {
			hexagonObj.rotSpeed++;
		});

		// saving data
		onKeyPress("c", () => {
			settingData();
			savingData(dataToSave);
			console.log(getData("hexagon_save"));
		});

		// deleting data
		onKeyPress("v", () => {
			GameState.score = 0;
			GameState.maxScore = 0;
			GameState.scoreMultiplier = 1;
			GameState.cursors = 0;
			GameState.hasUnlockedPowerups = false;

			settingData();
			savingData(dataToSave);
		});

		// cheatingData
		onKeyPress("b", () => {
			GameState.score = 500000;
			GameState.maxScore = 500000;
			GameState.scoreMultiplier = 200;
			GameState.cursors = 200;
			GameState.hasUnlockedPowerups = true;

			settingData();
			savingData(dataToSave);
		});

		onKeyDown("right", () => {
			camScale(1);
		});

		// checks game started
		if (hasStartedGame == false && GameState.score < 1) {
			ominus = play("ominus");
			ominus.play();
			bg.color = BLACK;

			scoreText.opacity = 0;
			cursorsText.opacity = 0;
		} else {
			// play("game_music")
			hasStartedGame = true;
			bg.color = rgb(50, 50, 50);
		}

		let autoCursor = add([
			sprite("cursors"),
			color(204, 204, 204),
			scale(0.8),
			z(10),
			pos(width(), height()),
			opacity(0),
			rotate(0),
		]);

		let autoPlusScoreText = add([
			text(`+${GameState.cursors}`),
			pos(
				rand(autoCursor.pos.x - 12, autoCursor.pos.x + 12),
				rand(autoCursor.pos.y - 12, autoCursor.pos.y + 12),
			),
			anchor("center"),
			rotate(0),
			scale(0.8),
			opacity(0),
			rotate(rand(-10, 10)),
			{
				update() {
					this.text = `+${GameState.cursors}`;
				},
			},
		]);

		let autoClickAnim = add([
			sprite("auto_click"),
			color(rgb(152, 202, 235)),
			pos(autoCursor.pos),
			opacity(0),
			anchor("center"),
			scale(1),
			rotate(0),
			z(9),
			{
				update() {
					this.pos = autoCursor.pos;
				},
			},
		]);

		let autoLoop = loop(10, () => {
			// that means its clicking auto :)
			hexagonObj.click(true);
		});
		// determines autoLoop state
		autoLoop.paused = true;

		if (GameState.cursors >= 1) {
			wait(10, () => {
				if (GameState.cursors >= 1) {
					autoLoop.paused = false;
				} else {
					autoLoop.paused = true;
				}
			});
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
			color(BLACK),
		]);

		let storeUI = add([
			rect(384 + 100, height()),
			anchor("topleft"),
			pos(width(), 0),
			color(34, 50, 97),
			{
				// the thing that would be really cool if it worked (it does)
				update() {
					if (storeOpen) {
						// what the fuck this doesn't work yet???????
						// if (isKeyPressed("1")) {
						// 	children[0].working()
						// }

						// else if (isKeyPressed("2")) {
						// 	children[1].working()
						// }

						// else if (isKeyPressed("3")) {
						// 	children[2].working()
						// }

						// else if (isKeyPressed("4")) {
						// 	children[3].working()
						// }
					}
				},
			},
		]);

		// storeUI.add([
		// 	pos(20, 20),
		// 	sprite("storerec"),
		// 	anchor("center"),
		// 	area(),
		// 	scale(),
		// 	color(),
		// ])

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
					// unlock cursors
					if (GameState.cursors < 1) {
						GameState.cursors++;
						this.canBuyCursors = false;
						wait(2.5, () => {
							this.canBuyCursors = true;
							mouse.waiting = false;
						});

						tween(
							autoCursor.opacity,
							1,
							0.25,
							(p) => autoCursor.opacity = p,
						);
						tween(
							autoCursor.pos,
							center(),
							2,
							(p) => autoCursor.pos = p,
						);

						wait(2, () => {
							manageScore(
								GameState.score
									+ (GameState.scoreMultiplier
										* GameState.cursors),
								GameState.scoreMultiplier * GameState.cursors,
							);

							tween(
								autoPlusScoreText.opacity,
								1,
								0.25,
								(p) => autoPlusScoreText.opacity = p,
							);
							// play click
							tween(
								vec2(1),
								vec2(0.96),
								0.35,
								(p) => hexagonObj.scale = p,
								easings.easeOutBounce,
							);
							play("clickPress", {
								detune: rand(-50, 50),
							});

							// auto click anim
							tween(
								autoClickAnim.opacity,
								1,
								0.25,
								(p) => autoClickAnim.opacity = p,
							);
							wait(0.20, () => {
								tween(
									autoCursor.opacity,
									0,
									0.25,
									(p) => autoCursor.opacity = p,
								);
								tween(
									autoPlusScoreText.opacity,
									0,
									0.25,
									(p) => autoPlusScoreText.opacity = p,
								);

								play("clickRelease", {
									detune: rand(-200, 200),
								});

								tween(
									autoClickAnim.opacity,
									0,
									0.25,
									(p) => autoClickAnim.opacity = p,
								);
								tween(
									autoClickAnim.scale,
									vec2(2),
									0.25,
									(p) => autoClickAnim.scale = p,
								);
								tween(
									autoClickAnim.angle,
									360,
									0.25,
									(p) => autoClickAnim.angle = p,
								);

								tween(
									cursorsText.opacity,
									1,
									0.25,
									(p) => cursorsText.opacity = p,
								);

								autoPlusScoreText.pos.x = autoCursor.pos.x
									+ rand(-20, 20);
								autoPlusScoreText.pos.y = autoCursor.pos.y
									+ rand(-20, 20);

								// appearing animations
								tween(
									autoPlusScoreText.pos.y,
									autoPlusScoreText.pos.y - 20,
									0.25,
									(p) => autoPlusScoreText.pos.y = p,
								);
								tween(
									autoPlusScoreText.angle,
									rand(-10, 10),
									0.25,
									(p) => autoPlusScoreText.angle = p,
								);

								tween(
									0,
									rand(-10, 10),
									0.08,
									(p) => scoreText.angle = p,
									easings.easeOutBounce,
								);
								tween(
									50,
									55,
									0.08,
									(p) => scoreText.pos.y = p,
									easings.easeOutBounce,
								);
								wait(0.25, () => {
									tween(
										scoreText.angle,
										0,
										0.25,
										(p) => scoreText.angle = p,
										easings.easeOutCubic,
									);
									tween(
										55,
										50,
										0.08,
										(p) => scoreText.pos.y = p,
										easings.easeOutBounce,
									);
								});

								// hexagon
								tween(
									vec2(0.96),
									vec2(1),
									0.35,
									(p) => hexagonObj.scale = p,
									easings.easeOutBounce,
								);

								wait(10, () => {
									autoLoop.paused = false;
								});
							});
						});
					} else {
						GameState.cursors++;
					}
				},

				update() {
					this.price = priceFormula(25, 15, GameState.cursors, true)
					this.text = `Cursor (${GameState.cursors + 1})\n$${
						formatPrice(this.price)
					}`;
				},
			},
		]);

		// multiplier buy
		storeUI.add([
			pos(10, 150),
			text(
				`Multiplier\n(${
					formatPrice(GameState.scoreMultiplier + 1)
				}x)\n$25`,
			),
			scale(0.89),
			anchor("left"),
			color(),
			area(),
			"storeElement",
			{
				verPosition: 150,
				basePrice: 25,
				// price: GameState.scoreMultiplier > 1 ? Math.round(25 + 3.75 * GameState.scoreMultiplier) : 25,
				price: 25,

				working() {
					GameState.scoreMultiplier += buyMultiplier;
					this.price = GameState.scoreMultiplier != 1
						? this.price = Math.round(
							GameState.scoreMultiplier * this.basePrice * 0.6,
						)
						: 25;
				},

				update() {
					this.price = GameState.scoreMultiplier != 1
						? this.price = Math.round(
							GameState.scoreMultiplier * this.basePrice * 0.6,
						)
						: 25;
					this.text = `${markiplier} (${
						formatPrice(GameState.scoreMultiplier + 1)
					}x)\n$${formatPrice(this.price)}`;
				},
			},
		]);

		// powerups unlock / buy
		storeUI.add([
			pos(10, 250),
			text(
				GameState.hasUnlockedPowerups == false
					? `Unlock power-ups\n1K`
					: `Buy random power up\n${scoreToAscend / 10}`,
			),
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
						GameState.hasUnlockedPowerups = true;

						// this should be 5 minutes
						wait(60 * 5, () => {
							powerups.shift();
							powerups = shuffleArray(powerups);
							spawnPowerUp(shuffleArray(powerups)[0], false);
							powerups = definePowerups();
						});
					} 

					// has
					else {
						powerups = shuffleArray(powerups);
						canBuyPowerup = false;

						wait(5, () => {
							canBuyPowerup = true;
						});

						let timesItSwitched = 0;

						let whatPowerUpWillYouGet = add([
							sprite("powerups", {
								anim: 0
							}),
							pos(this.pos.x + 900, this.pos.y + 100),
							area(),
						]);

						let timeUntilSwitch = 0.1;
						let timesSwitched = 0;
						let powerUpIndex = 0;

						let loopy = loop(timeUntilSwitch, () => {
							timesSwitched++;
							if (timesSwitched < 50) {
								powerUpIndex++;
								if (powerUpIndex > 3) powerUpIndex = 0;
								whatPowerUpWillYouGet.play(powerups[powerUpIndex].name)
							}

							play("slot")

							if (timesSwitched == 20) timeUntilSwitch = 3;
							if (timesSwitched == 30) {
								loopy.cancel();

								let powerUpYouGot = spawnPowerUp(powerups[powerUpIndex], whatPowerUpWillYouGet.pos, true,);
								destroy(whatPowerUpWillYouGet);

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

					// this.price = Math.round(scoreMultiplier * this.basePrice * 0.5)
				},

				update() {
					this.text = !GameState.hasUnlockedPowerups
						? `Unlock power-ups\n1K`
						: `Buy random power up\n1M`;
					this.price = !GameState.hasUnlockedPowerups
						? 1000
						: scoreToAscend / 10;
				},
			},
		]);

		children = storeUI.get("*", { recursive: true });

		children[0].price = GameState.scoreMultiplier == 1 ? 25 : Math.round(
			children[0].price
				+ children[0].price * GameState.scoreMultiplier / 10,
		);

		function actuallyBuying(element) {
			tween(
				element.scale,
				vec2(0.95),
				0.35,
				(p) => element.scale = p,
				easings.easeOutBounce,
			);
			if (GameState.score >= element.price) {
				// reduces score to price cool animation
				tween(
					Math.round(GameState.score),
					Math.round(GameState.score - element.price),
					0.25,
					(p) => GameState.score = p,
				);
				element.working();

				// game juice :sunglasses:
				hasClicked = true;
				storePitchSeconds = 0;
				if (hasClicked == true) tune += 25;
				play("kaching", { detune: tune });

				tween(
					element.pos.y,
					element.pos.y - 5,
					0.10,
					(p) => element.pos.y = p,
				);
				wait(0.10, () => {
					tween(
						element.pos.y,
						element.pos.y + 5,
						0.10,
						(p) => element.pos.y = p,
					);
				});
				shake(0.1);
			}
		}

		children.forEach((element) => {
			element.onHover(() => {
				tween(element.color, BLUE, 1, (p) => element.color = p);
				tween(
					element.pos.y,
					element.verPosition - 10,
					0.35,
					(p) => element.pos.y = p,
					easings.easeOutCubic,
				);
				tween(
					element.scale,
					vec2(0.95),
					0.35,
					(p) => element.scale = p,
					easings.easeOutBounce,
				);
				if (!mouse.waiting) {
					mouse.play("point");
				}
				// debug.log(element.price)
			});

			element.onHoverEnd(() => {
				tween(element.color, WHITE, 1, (p) => element.color = p);
				tween(
					element.verPosition - 10,
					element.verPosition,
					0.35,
					(p) => element.pos.y = p,
					easings.easeOutCubic,
				);
				tween(
					element.scale,
					vec2(0.9),
					0.35,
					(p) => element.scale = p,
					easings.easeOutBounce,
				);
				if (!mouse.waiting) {
					mouse.play("cursor");
				}
			});

			element.onMousePress("left", () => {
				if (element.isHovering() && canClickStuff == true) {
					tween(
						element.scale,
						vec2(0.8),
						0.35,
						(p) => element.scale = p,
						easings.easeOutBounce,
					);
					if (!mouse.waiting) {
						mouse.play("grab");
					}
				}
			});

			element.onMouseRelease("left", () => {
				if (element.isHovering() && canClickStuff == true) {
					if (!mouse.waiting) {
						mouse.play("point");
					}
					if (GameState.score >= element.price) {
						if (element.is("powerupElement")) {
							// if has unlocked power ups and you're trying to buy thems checks if canbuy power up is true
							if (GameState.hasUnlockedPowerups) {
								if (
									canBuyPowerup && get("powerup").length < 1
								) {
									actuallyBuying(element);
								} // has unlocked them but has just bought one and has to wait again to buy it again
								// wait cursor
								else {
									mouse.waitAnim();
								}
							} // this means that you haven't unlocked them, but you have the money, so it will buy the chance and put canBuypowerup to true
							else {
								actuallyBuying(element);
								canBuyPowerup = true;
							}
						} else if (
							element.is("cursorElement")
							&& element.canBuyCursors == false
							&& mouse.waiting == false
						) {
							mouse.waitAnim();
						} else {
							actuallyBuying(element);
						}
					} else {
						shake(1);
						play("wrong", { detune: rand(-10, 10) });

						tween(
							element.color,
							RED,
							0.1,
							(p) => element.color = p,
						);

						wait(0.1, () => {
							tween(
								element.color,
								rgb(59, 169, 209),
								0.1,
								(p) => element.color = p,
							);
						});
					}
				}
			});
		});
	});
}
