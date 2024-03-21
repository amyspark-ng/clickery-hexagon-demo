import { volumeManager } from "../volumebar.js" 

export function menuscene() {
	return scene("menuscene", () => {

		volumeManager()
		
		// let bruh = play("game_music")
		// bruh.play()

		let bg = add([
			rect(width(), height()),
			color(50, 50, 50),
			stay()
		])

		let title = add([
			text("clickeryHexagon"),
			pos(center()),
		])

		wait(1, () => {
			go("gamescene")
		})

		wait(1, () => {
			onKeyPress("space", () => {
				tween(title.pos.y, -50, 0.5, (p) => title.pos.y = p)
				bruh.stop()
	
				wait(0.65, () => {
					go("gamescene")
				})
			})
		})
	})
}