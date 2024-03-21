import { gamescene } from "./scenes/gamescene.js"
import { menuscene } from "./scenes/menuscene.js"

export function loadAssets() {
	loadRoot("./assets/")
	
	loadBean()
	loadSprite("osaka", "sprites/osaka.png")
	loadSound("score", "sounds/score.mp3")
	
	loadSound("volumeChange", "sounds/volumeChange.wav")
	
	loadSound("clickPress", "sounds/clickPress.mp3")
	loadSound("clickRelease", "sounds/clickRelease.mp3")
	loadSound("kaching", "sounds/kaching.mp3")
	loadSound("wrong", "sounds/wrong.mp3")
	loadSound("store", "sounds/store.mp3")
	
	loadSound("ominus", "sounds/ominus.mp3")
	loadSound("game_music", "sounds/game_music.mp3")

	loadSprite("cursors", "sprites/cursors.png", {
		sliceX: 4,
		sliceY: 1,
		anims: {
			cursor: 0,
			grab: 1,
			point: 2,
			wait: 3,
		},
	})

	loadSprite("hexagon", "sprites/hexagon.png")
	loadSprite("cursor", "sprites/cursor.png")
	loadSprite("auto_cursor", "sprites/auto_cursor.png")
	loadSprite("disket", "sprites/disket.png")

	loadFont("apl386", "https://kaboomjs.com/examples/fonts/apl386.ttf", { outline: 4, filter: "linear" })

	// scenes
	gamescene()
	menuscene()
}