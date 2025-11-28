//Ejercicio: Area y Volumnes
//Objetivo Crear multiples funciones y reutilizables 
// Crea una funcion para calcular el area de un circulo dado su radio 
/**
 * Calcula el área de un círculo a partir de su radio.
 *
 * Explicación:
 * - Usa la fórmula del área del círculo: A = π * r^2.
 * - Math.PI proporciona el valor de π.
 * - Math.pow(radio, 2) eleva el radio al cuadrado.
 *
 * Validaciones sugeridas:
 * - El radio debe ser un número finito mayor o igual que 0.
 * - Si se proporciona un valor negativo, considera lanzar un error o manejarlo según tu caso de uso.
 *
 * @param {number} radio - Radio del círculo. Debe ser un número no negativo.
 * @returns {number} Área del círculo correspondiente al radio dado.
 *
 * @example
 * // Ejemplo de uso:
 * const r = 5;
 * const area = areaCirculo(r); // Resultado: 78.53981633974483
 * console.log(`El área del círculo de radio ${r} es ${area}`);
 */
function areaCirculo(radio) {
    return Math.PI * Math.pow(radio, 2);
}
//Crea una funcion para calcular el area de un rectangulo dado su base y altura
/**
 * Calcula el área de un rectángulo
 * @param {number} base - La base del rectángulo
 * @param {number} altura - La altura del rectángulo
 * @returns {number} El área del rectángulo (base * altura)
 * @example
 * // Calcula el área de un rectángulo con base 5 y altura 3
 * const area = areaRectangulo(5, 3);
 * console.log(area); // 15
 */
function areaRectangulo(base, altura) {
    return base * altura;
}
//crea una funcion para calcular el volumen de un cilindro 
//crea la funcion 'calcularVolumenCilindro' Reutilizando la funcion 'areaCirculo' 
/**
 * Calcula el volumen de un cilindro a partir de su radio y altura.
 *
 * Utiliza la función `areaCirculo(radio)` para obtener el área de la base
 * y luego la multiplica por la altura del cilindro.
 *
 * @function calcularVolumenCilindro
 * @param {number} radio - Radio de la base del cilindro. Debe ser un número positivo.
 * @param {number} altura - Altura del cilindro. Debe ser un número positivo.
 * @returns {number} Volumen del cilindro en unidades cúbicas.
 *
 * @example
 * // Suponiendo que existe la función areaCirculo(r) que calcula π * r^2:
 * // const volumen = calcularVolumenCilindro(3, 10);
 * // console.log(volumen); // Imprime el volumen correspondiente (π * 3^2 * 10)
 */
function calcularVolumenCilindro(radio, altura) {
    const areaBase = areaCirculo(radio);
    return areaBase * altura;
}
// Crea una funcion para calcular una derivada simple de una funcion polinomial de grado n 
function derivadaPolinomial(coeficientes) {
    const grado = coeficientes.length - 1;
    if (grado === 0) {
        return [0]; // La derivada de una constante es 0
    }  
    const derivada = [];
    for (let i = 0; i < grado; i++) {
        derivada.push(coeficientes[i] * (grado - i));
    }
    return derivada;
}
