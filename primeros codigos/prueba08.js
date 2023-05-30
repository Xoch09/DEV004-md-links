import fs from 'fs';
import path from 'path';
import axios from 'axios';

// Función para leer el contenido de un directorio
function readDirectory(directoryPath, options) {
  // Lee el contenido del directorio
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error('Error al leer el directorio:', err);
      return;
    }

    // Recorre cada archivo en el directorio
    files.forEach((file) => {
      // Obtiene la ruta completa del archivo
      const filePath = path.join(directoryPath, file);

      // Verifica si es un archivo o un directorio
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error('Error al obtener información del archivo:', err);
          return;
        }

        // Si es un archivo con extensión .md, procesa los enlaces
        if (stats.isFile() && path.extname(filePath) === '.md') {
          console.log('Archivo:', filePath);
          processMdFile(filePath, options);
        }
        // Si es un directorio, muestra su nombre y lee su contenido de forma recursiva
        else if (stats.isDirectory()) {
          console.log('Directorio:', filePath);
          readDirectory(filePath, options);
        }
      });
    });
  });
}

// Función para procesar un archivo Markdown y encontrar enlaces
function processMdFile(file, options) {
  // Devuelve una nueva promesa
  return new Promise((resolve, reject) => {
    // Lee el archivo especificado con formato de codificación utf8
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        reject(`Error leyendo archivo ${file}: ${err}`);
        return;
      }

      // Busca enlaces usando una expresión regular
      const regex = /\[([^\]]{0,50})\]\((https?:\/\/[^\)\s#]+)/gm;
      let match;
      const arrayUrl = [];

      // Itera sobre las coincidencias encontradas y las guarda en un array
      while ((match = regex.exec(data))) {
        arrayUrl.push({
          nombre: match[1],
          link: match[2],
          ruta: file,
        });
      }

      // Resuelve la promesa con el array de enlaces encontrados
      resolve(arrayUrl);
    });
  })
    .then((res) => {
      // Imprime el contenido del archivo
      console.log(res);

      // Si se habilita la opción --validate, realiza solicitudes HTTP para validar los enlaces
      if (options.validate) {
        const promises = res.map((link) => {
          return axios
            .get(link.link)
            .then((response) => {
              return {
                nombre: link.nombre,
                link: link.link,
                ruta: link.ruta,
                status: response.status,
                ok: response.statusText === 'OK' ? 'ok' : 'fail',
              };
            })
            .catch((error) => {
              return {
                nombre: link.nombre,
                link: link.link,
                ruta: link.ruta,
                error: error.message,
                ok: 'fail',
              };
            });
        });

        // Resuelve todas las promesas en paralelo
        return Promise.all(promises);
      }

      // Si no se habilita la opción --validate, simplemente resuelve el resultado actual
      return res;
    })
    .then((results) => {
      // Imprime los resultados
      for (let i = 0; i < results.length; i++) {
        console.log('\x1b[31m%s\x1b[0m', '---------------------------------------------------------------------------');
        console.log('\x1b[34m%s\x1b[0m', 'Nombre:' + results[i].nombre);
        console.log('\x1b[35m%s\x1b[0m', 'Link:' + results[i].link);
        console.log('\x1b[33m%s\x1b[0m', 'Ruta:' + results[i].ruta);
        console.log('Status code: ' + results[i].status);
        console.log('OK: ' + results[i].ok);
      }
    })
    .catch((error) => {
      console.log('Error:', error);
    });
}

// Ruta del directorio a leer
const directoryPath = process.argv[2];
const options = {
  validate: process.argv.includes('--validate'),
  stats: process.argv.includes('--stats'),
};
readDirectory(directoryPath, options);
