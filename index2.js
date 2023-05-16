//hacer de director de orquesta
import { pathExists, isMD } from "./api.js"; //importa las funciones pathExists e isMD desde el archivo api.js

const mdLinks = (path, options) => {
    //nueva promesa que envuelve la lógica asincrónica dentro de la función mdLinks
  return new Promise((resolve, reject) => {
    //función llamada mdLinks, acepta dos parámetros: path y options.
    // Código asincrónico, devuelve promesa
    // 1. Verificar si existe
    // 2. Preguntar si es MD

    if (pathExists(path)) {
      console.log("Si existe");
      // Preguntar si es MD
      if (isMD(path)) {
        console.log("Si es MD");
      }
      resolve();
    } else {
      reject("No existe");
    }
  });



};//final

mdLinks("README.md");

