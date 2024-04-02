import kaboom from "kaboom";

import { loadAssets } from "./loader.js";
import { volumeManager } from "./volumebar.js";

export const k = kaboom({
	width: 1024,
	height: 576,
	font: "apl386",
});

export let hexagonColors = [
	rgb(255, 255, 255),
	rgb(234, 85, 120),
	rgb(235, 168, 106),
	rgb(255, 242, 126),
	rgb(129, 232, 120),
	rgb(103, 203, 237),
	rgb(181, 119, 243),
	rgb(255, 155, 197),
]

export let GameState = {
	score: 0,
	maxScore: 0,
	scoreMultiplier: 1,
	cursors: 0,
	kursors: 0,
	hasUnlockedPowerups: false,
	ascendLevel: 1,
	volumeIndex: 9,
};

export let gottenData = getData("hexagon_save");

if (gottenData) {
	GameState.score = gottenData._score;
	GameState.maxScore = gottenData._maxScore;
	GameState.scoreMultiplier = gottenData._scoreMultiplier;
	GameState.cursors = gottenData._cursors;
	GameState.kursors = gottenData._kursors;
	GameState.hasUnlockedPowerups = gottenData._hasUnlockedPowerUps,
	GameState.volumeIndex = gottenData._volumeIndex;

	console.log(gottenData);
}

console.log(gottenData)

loadAssets();

// go("menuscene");
go("introScene");
// go("gamescene")

// bg - 0
// thingies - 1
// ui/Text/store/buttons - 2
// hexagon - 3
// storeBlack - 4
// storeThings - 5
// storeOptions - 6+
// vignette - 7
// cursor = 999999999