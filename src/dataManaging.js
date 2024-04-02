export function savingData(dataToSave) {
	// actual game saving
	setData("hexagon_save", dataToSave);

	let floppy = add([
		sprite("floppy"),
		pos(width() + 50, height() - 120),
		rotate(0),
		opacity(1),
		anchor("center"),
	]);

	// entra
	tween(floppy.pos.x, width() - 50, 1, (p) => floppy.pos.x = p, easings.easeOutElastic);
	tween(0, 1, 2.5, (p) => floppy.opacity = p, easings.easeOutElastic);

	wait(1, () => {
		play("saving")
		// despues de entrar antes de salir
		tween(floppy.pos.y, floppy.pos.y + 8, 0.24, (p) => floppy.pos.y = p, easings.easeOutExpo);
		// tween(floppy.angle, -1.5, 0.24, (p) => floppy.angle = p, easings.easeOutExpo);

		wait(0.8, () => {
			tween(floppy.pos.y, floppy.pos.y - 15, 1, (p) => floppy.pos.y = p, easings.easeOutElastic);
			// tween(floppy.angle, 1.1, 0.24, (p) => floppy.angle = p, easings.easeOutExpo);

			tween(
				1,
				0,
				0.35,
				(p) => floppy.opacity = p,
				easings.easeOutExpo,
			);

			wait(0.35, () => {
				destroy(floppy);
			});
		});
	});
}
