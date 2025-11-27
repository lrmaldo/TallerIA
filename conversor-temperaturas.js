// Función para convertir temperaturas de Celsius a Fahrenheit y Kelvin
// Entrada: temperatura en Celsius (número)
// Salida: objeto con conversiones a Fahrenheit y Kelvin

function convertirTemperatura(celsius) {
  // Validar que la entrada es un número
  if (typeof celsius !== 'number' || isNaN(celsius)) {
    throw new Error('La entrada debe ser un número válido');
  }

  // Convertir a Fahrenheit: (C × 9/5) + 32
  const fahrenheit = (celsius * 9/5) + 32;

  // Convertir a Kelvin: C + 273.15
  const kelvin = celsius + 273.15;

  // Retornar objeto con ambas conversiones
  return {
    celsius: celsius,
    fahrenheit: fahrenheit,
    kelvin: kelvin
  };
}

// Función auxiliar para mostrar la conversión de forma legible
function mostrarConversion(celsius) {
  const resultado = convertirTemperatura(celsius);
  console.log(`${resultado.celsius}°C = ${resultado.fahrenheit.toFixed(2)}°F = ${resultado.kelvin.toFixed(2)}K`);
  return resultado;
}

// Ejemplos de uso:
// convertirTemperatura(0)    // { celsius: 0, fahrenheit: 32, kelvin: 273.15 }
// convertirTemperatura(25)   // { celsius: 25, fahrenheit: 77, kelvin: 298.15 }
// convertirTemperatura(100)  // { celsius: 100, fahrenheit: 212, kelvin: 373.15 }
// convertirTemperatura(-40)  // { celsius: -40, fahrenheit: -40, kelvin: 233.15 }

// Exportar para uso en otros módulos (si se usa como módulo ES6)
export { convertirTemperatura, mostrarConversion };
