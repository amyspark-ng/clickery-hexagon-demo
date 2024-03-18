export function savingData(dataToSave) {
	// actual game saving
	setData("hexagon_save", dataToSave)
	
	let disket = add([
		sprite("disket"),
		pos(width() + 50, 50),
		scale(1.25),
		rotate(0),
		opacity(1),
		anchor("center"),
	])

	tween(disket.pos.x, width() - 50, 1, (p) => disket.pos.x = p, easings.easeOutElastic)
	
	wait(1, () => {
		tween(disket.pos.y, 70, 0.25, (p) => disket.pos.y = p, easings.easeInSine)
		wait(0.24, () => {
			tween(disket.pos.y, 42, 0.35, (p) => disket.pos.y = p, easings.easeOutExpo)
			tween(disket.angle, -5, 0.35, (p) => disket.angle = p, easings.easeOutExpo)
			tween(disket.opacity, 0, 0.35, (p) => disket.opacity = p, easings.easeOutExpo)
			
			let blackbar = add([
				rect(width() + 100, height() / 4),
				pos(center()),
				color(BLACK),
				opacity(0.0),
				anchor("center"),
				area(),
			])

			let gameSaved = add([
				text("Game Saved"),
				pos(center()),
				color(WHITE),
				anchor("center"),
				scale(1.5),
				opacity(0)
			])

			tween(blackbar.opacity, 0.5, 0.25, (p) => blackbar.opacity = p, easings.easeOutExpo)
			tween(gameSaved.opacity, 1, 0.25, (p) => gameSaved.opacity = p, easings.easeOutExpo)
			
			wait(1, () => {
				tween(blackbar.opacity, 0, 1, (p) => blackbar.opacity = p, easings.easeOutExpo)
				tween(gameSaved.opacity, 0, 1, (p) => gameSaved.opacity = p, easings.easeOutExpo)
			
				wait(1, () => {
					destroy(disket)
					destroy(blackbar)
					destroy(gameSaved)
				})
			})
		})
	})
}
