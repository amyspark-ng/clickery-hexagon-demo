// // <reference types="https://esm.sh/kaboom@3000.1.17/global" />
import kaboom from "https://esm.sh/kaboom@3000.1.17";

import { loadAssets } from "./loader.js"
export const k = kaboom({
	width: 1024,
	height: 576,
	font: 'apl386',
});

export let GameState = {
	score: 0,
	maxScore: 0,
	scoreMultiplier: 1,
	cursors: 0,
	hasUnlockedPowerups: false,
	ascendLevel: 1,
	volumeIndex: 9,
}

console.log(GameState)

loadAssets()

go("menuscene")
// go("gamescene")