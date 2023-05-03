const fs = require("fs");

const mdLinks = (path, options) => {
  //se retorna una nueva promesa
  //contiene 2 parámetros "resolve y reject" error y verdadero
  //son funciones callback
  return new Promise((resolve, reject) => { 
//identificar si la ruta existe

if(fs.existsSync(path)){
// chec o convierte a ruta absoluta
//comprobar si es archivo o directorio
// si es un directorio
}else {


// si no existe la ruta se rechaza la promesa
reject("la ruta no existe");
}
  });
};


module.exports = {
  // ...
};
