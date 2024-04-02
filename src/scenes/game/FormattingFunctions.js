// definetely not chatgpt
export function formatScore(way, valor) {
	if (way == "full") {
		// Convertir el número a una cadena y dividirlo en partes enteras y decimales
		let partes = valor.toString().split(".");
		let parteEntera = partes[0];
		let parteDecimal = partes.length > 1 ? "," + partes[1] : "";
		let resultado = "";
	
		// Insertar puntos para separar los miles en la parte entera
		if (parteEntera.length > 3) {
			let miles = parteEntera.slice(-3); // Miles
			let resto = parteEntera.slice(0, -3); // Resto
			parteEntera = resto.replace(/\B(?=(\d{3})+(?!\d))/g, "'") + "." + miles;
		}
	
		// Concatenar la parte entera y la parte decimal
		resultado = parteEntera + parteDecimal;
	
		// Añadir la palabra "millones" si es necesario
		// if (valor >= 1000000) {
		//     resultado += " millones";
		// }
	
		return resultado;
	}

	// shorthand
	else if (way == "short") {
		var newValue = valor;
		if (valor >= 1000) {
			var suffixes = ["", "k", "m", "b","t"];
			var suffixNum = Math.floor( (""+valor).length/3 );
			var shortValue = '';
			for (var precision = 2; precision >= 1; precision--) {
				shortValue = parseFloat( (suffixNum != 0 ? (valor / Math.pow(1000,suffixNum) ) : value).toPrecision(precision));
				var dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g,'');
				if (dotLessShortValue.length <= 2) { break; }
			}
			if (shortValue % 1 != 0)  shortValue = shortValue.toFixed(1);
			newValue = shortValue+suffixes[suffixNum];
		}
		return newValue;
	}	
}

// definetely not chatgpt again
export function formatPrice(num) {
	// less than a thousand
	if (num < 1000) {
		return num;
	} // thousands
	else if (num < 1000000) {
		let price = num / 1000;

		if (price % 1 === 0) {
			return price.toFixed(0) + "K";
		} else {
			return price.toFixed(2) + "K";
		}
	} // millions
	else if (num < 1000000000) {
		let price = num / 1000000;
		if (price % 1 === 0) {
			return price.toFixed(0) + "M";
		} else {
			return price.toFixed(3) + "M";
		}
	} // billions
	else {
		let price = num / 1000000000;
		if (price % 1 === 0) {
			return price.toFixed(0) + "B";
		} else {
			return price.toFixed(4) + "B";
		}
	}
}
