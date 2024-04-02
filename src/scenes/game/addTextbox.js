import { mouse } from "./gamescene.js"

export let textBoxOpen = false

export function TextBox(title, message, buttonText) {
	
	let opaque = add([
		rect(width() + 50, height() + 50),
		pos(center()),
		anchor("center"),
		opacity(0),
		color(BLACK),
		z(998),
		"textbox"
	])
	
	let textbox = add([
		sprite("TextBox"),
		anchor("center"),
		pos(center()),
		scale(vec2(0.01, 0.02)),
		z(999),
		opacity(0),
		"textbox",
	])
	
	let titleText = textbox.add([
		text(title),
		pos(0, -190),
		anchor("center"),
		opacity(0),
		"textbox"
	])

	let bodyText = textbox.add([
		text(message, {
			width: 311,
			size: 25,
			// align: "topleft"
		}),
		pos(-140, -150),
		opacity(0),
		// anchor("left")
		"textbox"
	])

	let textbutton = textbox.add([
		sprite("TextButton"),
		pos(0, 160),
		area(),
		anchor("center"),
		opacity(0),
		"textbox",
		{
			clicked: false,
		}
	])

	let textbuttontext = textbutton.add([
		text(buttonText, {
			// width: 311,
			size: 30,
		}),
		pos(0, 0),
		anchor("center"),
		opacity(0),
		"textbox",
	])

	textbutton.onHoverUpdate(() => {
		if (textbutton.opacity >= 1) {
			mouse.animToPlay = "point"
		}
	})

	textbutton.onHoverEnd(() => {
		if (textbutton.opacity >= 1) {
			mouse.animToPlay = "cursor"
		}
	})

	textbutton.onClick(() => {
		if (textbutton.opacity >= 1 && !textbutton.clicked) {
			textbutton.clicked = true
			get("textbox", { recursive: true }).forEach(element => {
				tween(element.opacity, 0, 0.5, (p) => element.opacity = p, easings.easeOutExpo )
				wait(1, () => {
					destroy(element)
					textBoxOpen = false
					mouse.animToPlay = "cursor"
				})
			});
		}
	})

	// appearing
	textBoxOpen = true
	tween(0, 0.5, 0.2, (p) => opaque.opacity = p, )
	tween(0, 1, 0.2, (p) => textbox.opacity = p, )
	tween(0.01, 1, 0.25, (p) => textbox.scale.x = p, easings.easeOutBack )
	
	mouse.animToPlay = "cursor"
	wait(0.5, () => {
		tween(0.01, 1, 0.5, (p) => textbox.scale.y = p, easings.easeOutExpo )
		wait(0.1, () => {
			tween(0, 1, 0.5, (p) => titleText.opacity = p, easings.easeOutExpo )
			tween(0, 1, 0.8, (p) => bodyText.opacity = p, easings.easeOutExpo )
			
			wait(0.1, () => {
				tween(0, 1, 0.6, (p) => textbutton.opacity = p, easings.easeOutExpo )
				tween(0, 1, 0.6, (p) => textbuttontext.opacity = p, easings.easeOutExpo )
			})
		})
	})
}

export function newgroundsTextBox() {
	let opaque = add([
		rect(width() + 50, height() + 50),
		pos(center()),
		anchor("center"),
		opacity(0),
		color(BLACK),
		z(998),
		"textbox"
	])
	
	let textbox = add([
		sprite("NewgroundsTextBox"),
		anchor("center"),
		pos(center()),
		scale(0.01),
		z(999),
		opacity(0),
		"textbox",
	])
	
	let titleText = textbox.add([
		text("Newgrounds sign-in"),
		pos(0, -190),
		anchor("center"),
		opacity(0),
		"textbox"
	])

	let bodyText = textbox.add([
		text("Looks like you aren't signed in with newgrounds, would you like to sign in so you can upload your scores and show off your medals?", {
			width: 540,
			size: 25,
			// align: "topleft"
		}),
		pos(-260, -150),
		opacity(0),
		// anchor("left")
		"textbox"
	])

	let nopeButton = textbox.add([
		sprite("NewgroundsTextBoxButton"),
		pos(-125, 160),
		area(),
		anchor("center"),
		opacity(0),
		"textbox",
		{
			clicked: false,
		}
	])

	let nopeTextButton = nopeButton.add([
		text("Nope!", {
			// width: 311,
			size: 30,
		}),
		pos(0, 0),
		anchor("center"),
		opacity(0),
		"textbox",
	])

	nopeButton.onHover(() => {
		if (nopeButton.opacity >= 1) {

		}
	})

	nopeButton.onClick(() => {
		if (nopeButton.opacity >= 1 && !nopeButton.clicked) {
			nopeButton.clicked = true
			get("textbox", { recursive: true }).forEach(element => {
				tween(element.opacity, 0, 0.5, (p) => element.opacity = p, easings.easeOutExpo )
				wait(0.5, () => {
					destroy(element)
				})
			});
		}
	})

	let yesButton = textbox.add([
		sprite("NewgroundsTextBoxButton"),
		pos(120, 160),
		area(),
		anchor("center"),
		opacity(0),
		"textbox",
		{
			clicked: false,
		}
	])

	let yesButtonText = yesButton.add([
		text("Yes!", {
			// width: 311,
			size: 30,
		}),
		pos(0, 0),
		anchor("center"),
		opacity(0),
		"textbox",
	])

	yesButton.onHover(() => {
		if (yesButton.opacity >= 1) {

		}
	})

	yesButton.onClick(() => {
		if (yesButton.opacity >= 1 && !yesButton.clicked) {
			yesButton.clicked = true
			window.open("https://newgrounds.com")
		}
	})

	// appearing
	tween(0, 0.5, 0.2, (p) => opaque.opacity = p, )
	tween(0, 1, 0.2, (p) => textbox.opacity = p, )
	tween(0.01, 1, 0.25, (p) => textbox.scale.x = p, easings.easeOutBack )
	
	wait(0.5, () => {
		tween(0.01, 1, 0.5, (p) => textbox.scale.y = p, easings.easeOutExpo )
		wait(0.1, () => {
			tween(0, 1, 0.5, (p) => titleText.opacity = p, easings.easeOutExpo )
			tween(0, 1, 0.8, (p) => bodyText.opacity = p, easings.easeOutExpo )
			
			wait(0.1, () => {
				tween(0, 1, 0.6, (p) => nopeButton.opacity = p, easings.easeOutExpo )
				tween(0, 1, 0.6, (p) => nopeTextButton.opacity = p, easings.easeOutExpo )

				// yes
				tween(0, 1, 0.6, (p) => yesButton.opacity = p, easings.easeOutExpo )
				tween(0, 1, 0.6, (p) => yesButtonText.opacity = p, easings.easeOutExpo )
			})
		})
	})
}