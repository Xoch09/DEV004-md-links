
import { error, log } from 'console';
import fs from 'fs';
import path from 'path';
import axios from 'axios';

// función mdlinks
export function mdLinks(file, options) {
  // para obtener la extensión del archivo (se pasa como parametro "file"), con ext
  const ext = path.extname(file);
  // convertir ruta en absoluta
  const pathResolve = path.resolve(file);
  // imprimir la ruta absoluta
  console.log(pathResolve);

  // identica a md
  if (ext === '.md') {
    // ruta absoluta como argumento
    readMd(pathResolve)
      // devolver el resultado de la promesa como argumento "res"
      .then((res) => {
        // ver el contenido de md
        console.log(res);
        // bucle for, intera
        for (let i = 0; i < res.length; i++) {
          console.log('\x1b[31m%s\x1b[0m', '---------------------------------------------------------------------------');
          console.log('\x1b[34m%s\x1b[0m', 'Nombre:' + res[i].nombre);
          console.log('\x1b[35m%s\x1b[0m', 'Link:' + res[i].link);
          console.log('\x1b[33m%s\x1b[0m', 'Ruta:' + res[i].ruta);
        }
        
        if (options.validate) {
          // Crear un array de promesas para las solicitudes HTTP
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
          Promise.all(promises)
            .then((results) => {
              // Imprimir los resultados
              for (let i = 0; i < results.length; i++) {
                console.log('\x1b[31m%s\x1b[0m', '---------------------------------------------------------------------------');
                console.log('\x1b[34m%s\x1b[0m', 'Nombre:' + results[i].nombre);
                console.log('\x1b[35m%s\x1b[0m', 'Link:' + results[i].link);
                console.log('\x1b[33m%s\x1b[0m', 'Ruta:' + results[i].ruta);
                console.log('Status code: ' + results[i].status);
                console.log('OK: ' + results[i].ok);
              }

              if (options.stats) {
                const totalLinks = res.length;
                const uniqueLinks = new Set(res.map((link) => link.link)).size;
                console.log('\nEstadísticas:');
                console.log('\x1b[44m%s\x1b[0m','Total: ' + totalLinks);
                console.log('\x1b[45m%s\x1b[0m','Unique: ' + uniqueLinks);

                if (options.validate) {
                  const brokenLinks = results.filter((link) => link.ok === 'fail').length;
                  console.log('\x1b[41m%s\x1b[0m','Broken: ' + brokenLinks);
                }
              }
            })
            .catch((error) => {
              console.log('\x1b[31m%s\x1b[0m','Error:', error);
            });
        } else if (options.stats) {
          const totalLinks = res.length;
          const uniqueLinks = new Set(res.map((link) => link.link)).size;
          console.log('\nEstadísticas:');
          console.log('Total: ' + totalLinks);
          console.log('Unique: ' + uniqueLinks);
        }
      })
      // cierra then y captura los errores
      .catch((error) => console.log(error));
    // Si no es md, se muestra mensaje de "archivo invalido"
  } else {
    console.log('\x1b[31m%s\x1b[0m','Archivo inválido, prueba con un archivo md');
  }
}

// ruta del archivo Markdown que se lee
const readMd = (file) => {
  // devuelve nueva promesa
  return new Promise((resolve, reject) => {
    // readfile para leer el archivo especificado, leer con (formato de codificación utf8)
    fs.readFile(file, 'utf8', (err, data) => {
      // si ocurre error la promesa se rechaza y devuelve mensaje de error
      if (err) {
        reject(`Error leyendo archivo ${file}: ${err}`);
        return;
      }
      // si es exitosa busca con un discriminador/filtro para encontrar coincidencias Expresion regular, máximo 50 caracteres
      const regex = /\[([^\]]{0,50})\]\((https?:\/\/[^\)\s#]+)/gm;
      let match;
      // almacenar enlaces que se encuentran el el array
      const arrayUrl = [];
      // bucle "wile" para iterar, cada que se encuentre coincidencia se guarda en el array
      while ((match = regex.exec(data))) {
        // agregar objetos al array
        arrayUrl.push({
          nombre: match[1],
          link: match[2],
          ruta: file,
        });
      }
      // cuando se resuelven las coincidencias se resuelve la promesa con el array
      resolve(arrayUrl);
    });
  });
}

// propiedad en Node.js que devuelve un array, cada elemento del array es un argumento de línea de comando:1.- (process.argv[0]) es la ruta de Node.js, 2.-(process.argv[1]) es la ruta del script que se está ejecutando, 3.- siguiente elemento, el argunmento pasado
// process.argv[2] "node script.js argumento", (argumento es el [2])
const userPath = process.argv[2];
const options = {
  validate: process.argv.includes('--validate'),
  stats: process.argv.includes('--stats'),
};
mdLinks(userPath, options);

