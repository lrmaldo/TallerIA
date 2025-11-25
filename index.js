//suma dos numeros a + b
function suma(a, b) {
    return a + b;
}
function sumaEnteros(a, b) {
    if (!Number.isInteger(a) || !Number.isInteger(b)) {
        throw new Error('Ambos parámetros deben ser números enteros');
    }
    return a + b;
}
function sumaConComentarios(a, b) {
	// 'a' y 'b' son los dos valores que recibimos como entrada.
	// Aquí comprobamos que 'a' sea de tipo 'number'.
	if (typeof a !== 'number') {
		// Si 'a' no es un número, lanzamos un error con un mensaje claro.
		throw new Error('El primer parámetro debe ser un número');
	}
	// Aquí comprobamos que 'b' sea de tipo 'number'.
	if (typeof b !== 'number') {
		// Si 'b' no es un número, lanzamos un error con un mensaje claro.
		throw new Error('El segundo parámetro debe ser un número');
	}
	// Sumamos 'a' y 'b' y guardamos el resultado en una variable llamada 'resultado'.
	var resultado = a + b;
	// Devolvemos el valor de 'resultado' al código que llamó a esta función.
	return resultado;
}

/*
Variables en JavaScript — analogía de cajas de mudanza
1) Definición breve:
Una variable es un contenedor que guarda un valor para usarlo luego.

2) Analogía paso a paso (caja = variable):
- Caja = variable: una caja donde guardas algo.
- Etiqueta = nombre: pones una etiqueta para saber qué hay dentro.
- Contenido = valor: lo que pones dentro (número, texto, lista...).
- Cerrar/abrir = reasignar/leer: abres la caja para ver (leer) o cambias lo que hay dentro (reasignar).
- Caja fija = const: una caja que no puedes volver a cerrar con otro contenido (no puedes reasignar).
- Caja vacía = undefined/null: una caja vacía (undefined) o una caja vacía intencionalmente (null).

3) Sintaxis mínima (ejemplos comentados):
*/
// Ejemplo con let (se puede reasignar)
let edad = 30; // caja con etiqueta 'edad' y valor 30

// Ejemplo con const (no se puede reasignar)
const PI = 3.14159; // caja fija llamada 'PI'

// Ejemplo con var (antiguo, evita usarlo en código moderno)
var nombre = "Ana"; // similar a let pero con comportamiento histórico distinto

/*
4) Ejemplos ejecutables y comentados
*/
// Ejemplo 1: número
let numero = 10; // declaro una variable numérica
console.log("Número:", numero); // muestra: Número: 10

// Ejemplo 2: texto (string)
let saludo = "Hola, mundo"; // declaro una variable de texto
console.log("Saludo:", saludo); // muestra: Saludo: Hola, mundo

// Ejemplo 3: arreglo
let lista = [1, 2, 3]; // declaro una variable que es un arreglo
console.log("Arreglo:", lista); // muestra: Arreglo: [1, 2, 3]

/*
5) Preguntas de comprobación (cortas) — respuestas:
P1: ¿Qué es la "etiqueta" en la analogía? 
R1: El nombre de la variable.

P2: ¿Qué palabra usas para crear una variable que no vas a reasignar?
R2: const

P3: ¿Cómo representas una caja vacía intencionalmente?
R3: null

6) Ejercicio práctico corto:
Crea 3 variables y reasigna una de ellas; muestra su valor.
(Pista rápida: usa let para la que vas a reasignar, const para la fija; usa console.log para mostrar.)

Nota opcional (muy breve): var tiene un comportamiento histórico distinto en alcance/hoisting; para comenzar, usa let y const.
*/