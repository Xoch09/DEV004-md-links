//hacer de director de orquesta
import { pathExists, isMD } from "./api.js"; //importa las funciones pathExists e isMD desde el archivo api.js


//3.- si no es absoluta, vuelvela absoluta
const mdLinks = (path, options) => {
    //nueva promesa asincrónica dentro de la función mdLinks
  return new Promise((resolve, reject) => {
    //función llamada mdLinks, acepta dos parámetros: path y options.
    // Código asincrónico, devuelve promesa
    // a. Verificar si existe
    // b. Preguntar si es MD

    if (pathExists(path)) {
      console.log("Si existe");

      // 4.- La ruta es MD
      if (isMD(path)) {
        console.log("Si es MD");
      }

      resolve();
    } else {
      reject("No existe");
    }
  });



};//final

mdLinks("README.md", { validate: true});
console.log(process.argv)
