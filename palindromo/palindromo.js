//EJERCICIO:DETECTOR DE PALINDROMOS
//Objetivo: crea una logica compleja encapsulada en una funcion.
//Unn palindromo es una palabra o frase que se lee igual hacia adelante y hacia atras
//Ejemplos de palindromos: "anilina", "reconocer", "oso", "ojo" 
//crea una funcion llamada esPalidromo que reciba un texto y retorne true si es palindromo y false si no lo es 
function esPalindromo(texto) {
    // Eliminar espacios y convertir a minusculas para una comparacion justa
    const textoLimpio = texto.replace(/\s+/g, '').toLowerCase();
    // Obtener la version invertida del texto limpio
    const textoInvertido = textoLimpio.split('').reverse().join('');
    // Comparar el texto limpio con su version invertida
    return textoLimpio === textoInvertido;
}