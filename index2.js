//hacer de director de orquesta
import { pathExists, isMD } from "./api.js";

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    // Código asincrónico
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
};

mdLinks("README.md");

