// ejercicio: Arrays y Objetos
// 1. Arrays (listas)
// Crea una lista de tus 3 comidas favoritas.
const comidasFavoritas = ["pizza", "sushi", "tacos"];
// Como agrego un elemento a un array en JS
comidasFavoritas.push("hamburguesa");
// Muestro la lista en consola
console.log("Comidas favoritas:", comidasFavoritas);

// 2. Objetos (Diccionarios/Fichas)
// Crea un objeto que te represente a ti (nombre, edad, si te gusta programar).
let alumno = {
    nombre: "leonardo",
    edad: 32,
    programador: true,
    habilidades: ["JavaScript", "Python", "C++"],
    estatura: 1.75
};
//como accedo a la propiedad nombre del objeto alumno
console.log("Nombre del alumno:", alumno.nombre);
//como accedo a la propiedad habilidad javaScript del objeto alumno
console.log("Primera habilidad del alumno:", alumno.habilidades[0]);

// 3. Array de objetos
//crea una lista de 3 alumnos (objetos) con nombre y calificacion
const listaAlumnos = [
    { nombre: "Ana", calificacion: 85 },
    { nombre: "Luis", calificacion: 92 },
    { nombre: "Carlos", calificacion: 78 }
];

// escribir un bucle que reccorra el array de alumnos e imprima solo los que aprobaron (calificacion >= 80)
for (let i = 0; i < listaAlumnos.length; i++) {
    if (listaAlumnos[i].calificacion >= 80) {
        console.log("Alumno aprobado:", listaAlumnos[i].nombre);
    }
}