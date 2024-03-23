import { store, variables } from "./gamescene.js";

export let opaque;
export let storeUI;
export let children;

export function storeFunction() {
	opaque = add([
		rect(width(), height()),
		opacity(0),
		color(BLACK),
	]);

	storeUI = add([
		rect(width() / 2 - width() / 8, height()),
		pos(width(), 0),
		color(34, 50, 97),
		// anchor("center")
	]);

	storeUI.add([
		pos(10, 50),
		text("Score markiplier: " + variables.scoreMultiplier + "x\n$50"),
		scale(0.9),
		anchor("left"),
		area(),
		{
			price: 50,
			working() {
				if (score >= this.price) {
					score -= this.price;
					scoreText.text = score;
					variable.scoreMultiplier++;
					multiplierText.text = variable.scoreMultiplier + "x";
					this.price += Math.floor(this.price / 10);
					this.text = "Score markiplier: " + variable.scoreMultiplier
						+ "x\n$" + this.price;
				} else {
					debug.log("You can't buy that!!");
				}
			},
		},
	]);

	storeUI.add([
		pos(10, 125),
		text("Auto chance: " + variables.autoChance * 100 + "%\n$100"),
		scale(0.9),
		anchor("left"),
		area(),
		{
			price: 100,
			working() {
				if (score >= this.price) {
					score -= this.price;
					scoreText.text = score;
					variables.autoChance += 0.05;
					this.price += 150;
					this.text = "Auto chance: " + variables.autoChance * 100
						+ "%\n$" + this.price;
				} else {
					debug.log("You can't buy that!!");
				}
			},
		},
	]);

	storeUI.add([
		pos(10, 200),
		text("Auto frequency: " + variables.timeBetweenAutos + "s\n$100"),
		scale(0.9),
		anchor("left"),
		area(),
		{
			price: 100,
			working() {
				if (score >= this.price) {
					score -= this.price;
					scoreText.text = score;
					variables.timeBetweenAutos -= 0.5;
					this.price += 150;
					this.text = "Auto frequency: " + variables.timeBetweenAutos
						+ "s\n$" + this.price;
				} else {
					debug.log("You can't buy that!!");
				}
			},
		},
	]);

	children = storeUI.get("*", { recursive: true });

	// storeUI.add([
	// 	rect(children[0].width, children[0].height),
	// 	pos(children[0].pos),
	// 	anchor("center"),
	// 	opacity(0.5)
	// ])

	children.forEach(element => {
		element.onHover(() => {
			element.color = BLUE;
		});

		element.onHoverEnd(() => {
			element.color = WHITE;
		});

		element.onClick(() => {
			element.working();
		});
	});

	onKeyPress("space", () => {
		store.manage();
	});

	store.onClick(() => {
		store.manage();
	});
}
