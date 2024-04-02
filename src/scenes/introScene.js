export function introScene() {
	return scene("introScene", () => {
		setBackground(BLACK)

		let hasClicked = false

		let amyspark = add([
			sprite("amyspark"),
			pos(center()),
			anchor("center"),
			area(),
			scale(1),
			z(2),
			opacity(0),
		])

		tween(0, 1, 0.5, (p) => amyspark.opacity = p, )
		
		onMousePress(() => {
			if (!hasClicked) {
				hasClicked = true
				tween(1, 0, 0.45, (p) => amyspark.opacity = p, )
				wait(0.45, () => {
					go("menuscene")
				})
			}
		})
		
		wait(2.5, () => {
			if (!hasClicked) {
				tween(1, 0, 0.5, (p) => amyspark.opacity = p, )
			
				wait(0.5, () => {
					go("menuscene")
				})
			}
		})

		camScale(2)

		amyspark.play("run")

	})
}