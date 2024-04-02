import { gamescene } from "./scenes/game/gamescene.js";
import { introScene } from "./scenes/introScene.js";
import { menuscene } from "./scenes/menuscene.js";

export function loadAssets() {
	loadRoot("./assets/");

	loadBean();
	loadSprite("osaka", "sprites/osaka.png");
	loadSound("score", "sounds/score.mp3");

	loadSound("volumeChange", "sounds/volumeChange.wav");

	loadSound("clickPress", "sounds/clickPress.mp3");
	loadSound("clickRelease", "sounds/clickRelease.mp3");
	loadSound("kaching", "sounds/kaching.mp3");
	loadSound("wrong", "sounds/wrong.mp3");
	loadSound("open_store", "sounds/store.mp3");
	loadSound("slot", "sounds/slot.wav");
	loadSound("powerup", "sounds/powerUp.wav");
	loadSound("badpower", "sounds/badpower.wav");
	loadSound("gotpowerup", "sounds/powerup.mp3");

	loadSound("saving", "sounds/saving.mp3")
	loadSprite("light", "sprites/light.png")
	
	loadSprite("amyspark", "sprites/amulogo.png", {
		sliceX: 9,
		anims: {
			"run": {
				from: 0,
				to: 8,
				speed: 15,
				loop: true
			}
		}
	})

	loadSound("ominus", "sounds/ominus.mp3");
	loadSound("game_music", "sounds/game_music.mp3");
	loadSound("bigswitch", "sounds/bigswitch.mp3");

	loadSprite("cursors", "sprites/cursors.png", {
		sliceX: 5,
		sliceY: 1,
		anims: {
			cursor: 0,
			point: 1,
			grab: 2,
			wait: 3,
			check: 4,
		},
	});

	loadSprite("powerups", "sprites/powerups.png", {
		sliceX: 4,
		sliceY: 1,
		anims: {
			0: 0,
			1: 1,
			2: 2,
			3: 3,

			bad: 0,
			multiplier: 1,
			percentage: 2,
			yellow: 3,
		}
	})

	loadSprite("storerec", "sprites/storerec.png")

	loadSprite("hexagon", "sprites/hexagon.png");
	loadSprite("cursor", "sprites/cursor.png");
	loadSprite("auto_cursor", "sprites/auto_cursor.png");
	loadSprite("auto_click", "sprites/auto_click.png");
	loadSprite("floppy", "sprites/floppy.png");
	loadSprite("vignette", "sprites/vignette.png");
	loadSprite("thingy", "sprites/thingy.png");

	loadSprite("TextBox", "sprites/TextBox.png")
	loadSprite("TextButton", "sprites/TextButton.png")
	loadSprite("NewgroundsTextBox", "sprites/NewgroundsTextBox.png")
	loadSprite("NewgroundsTextBoxButton", "sprites/NewgroundsTextBoxButton.png")

	loadFont("apl386", "https://kaboomjs.com/examples/fonts/apl386.ttf", {
		outline: 4,
		filter: "linear",
	});

	// loadBitmapFont("apl386_bitmap", "/apl386_1.bmp", 6, 8)

	// scenes
	introScene();
	gamescene();
	menuscene();
}
