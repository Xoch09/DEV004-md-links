import fs from 'fs';
//usar el módulo path que viene incluido en la biblioteca estándar de Node.js. Para ello, simplemente debemos usar la función path.extname() y pasarle como argumento la ruta del archivo.
import path from 'path';
//ruta del archivo se obtiene a través del objeto process.argv, que es un array que contiene los argumentos de línea de comandos
const filePath = process.argv[2]; // Ruta del archivo proporcionada por el usuario
// readFile de la librería FS para leer el contenido del archivo.
// tres argumentos: la ruta del archivo, la codificación ('utf-8') para leer el archivo como texto) y una función de callback que se ejecuta cuando se completa la lectura del archivo. 
//El primer elemento del array es el comando que se usó para ejecutar el programa, y los siguientes elementos son los argumentos proporcionados por el usuario.
fs.readFile(filePath, 'utf-8', (err, data) => {
  //Si hay un error al leer el archivo, lo imprimimos en la consola. 
  if (err) {
    console.error(err);
    return;
  }
  //i no hay errores, imprimimos el contenido del archivo en la consola.
  console.log(data); // Imprimir contenido del archivo
//path.extname() para obtener la extensión del archivo y luego la imprimimos en la consola junto con un mensaje informativo. 
  const ext = path.extname(filePath); // Obtener la extensión del archivo
  console.log(`La extensión del archivo es: ${ext}`);
});


//nota:  La función path.extname() devuelve la extensión del archivo, incluyendo el punto inicial, por lo que debemos concatenarla con el mensaje que queremos imprimir.