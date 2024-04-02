import { volumeManager } from "../volumebar.js";
import { GameState } from "../main.js";

export let transitioner;
let hasIntroed = false;
export function menuscene() {
	return scene("menuscene", () => {
		volumeManager();

		setCursor("none")
		
		transitioner = add([
			sprite("hexagon"),
			// anchor("left"),
			anchor("center"),
			stay(),
			area(),
			// pos(-860, height() / 2),
			pos(center()),
			scale(4),
			opacity(1),
			z(99999),
			color(BLACK),
			"transition",
			{
				enterTransition(goScene) {
					wait(1, () => {
						go(goScene)
					})
					tween(this.opacity, 0, 1, (p) => this.opacity = p, easings.easeOutQuint)
				},
				
				exitTransition() {
					tween(this.opacity, 0, 1, (p) => this.opacity = p, easings.easeInQuint)
				}
			}
		])

		
		// if (hasIntroed) {
			transitioner.exitTransition()
		// }

		// debug.log(get("transition").length)
		// if (!hasIntroed) {
		// 	hasIntroed = true
		// 	let transitionFromIntro = add([
		// 		rect(width() + 10, height() + 10),
		// 		color(BLACK),
		// 		pos(center()),
		// 		anchor("center"),
		// 		opacity(1),
		// 		area(),
		// 		z(999),
		// 		"introObj"
		// 	])

		// 	tween(1, 0, 0.5, (p) => transitionFromIntro.opacity = p, )
		// 	wait(0.25, () => {
		// 		destroy(transitionFromIntro)
		// 	})
		// }

		let bg = add([
			rect(width(), height()),
			color(50, 50, 50),
			stay(),
			z(0),
		]);

		let title = add([
			text("Clickery Hexagon!!!\ndemo ;)", {
				align: "center",
			}),
			pos(center()),
			anchor("center"),
			z(2),
		]);

		loop(2.5, () => {
			tween(title.pos.y, title.pos.y + 10, 1.25, (p) => title.pos.y = p, )
			wait(1.25, () => {
				tween(title.pos.y, title.pos.y - 10, 1, (p) => title.pos.y = p, )
			})
		})

		let hexagon = add([
			sprite("hexagon"),
			pos(title.pos.x, title.pos.y),
			z(1),
			rotate(0),
			anchor("center"),
			{
				update() {
					this.angle += 0.25
				}
			}
		])

		onMousePress("left", () => {
			// has started
			if (GameState.maxScore >= 1) {
				wait(0.1, () => {
					transitioner.enterTransition("gamescene")
				})
			}

			// hasnt started
			else {
				add([
					rect(width() + 10, height() + 10),
					pos(center()),
					anchor("center"),
					z(1000),
					color(BLACK),
				])

				// ;)
				wait(2.5, () => {
					go("gamescene")
				})
			}
		})
	});
}
