import { error, log } from 'console';
import fs from 'fs';
import path from 'path';
import axios from 'axios';

export function mdLinks(file) {
  const ext = path.extname(file);
  const pathResolve = path.resolve(file);
  console.log(pathResolve);
  
  if (ext === '.md') {
    readMd(pathResolve)
      .then((res) => {
        console.log(res);
        for (let i = 0; i < res.length; i++) {
          console.log('-----------------------------------------------------------------------------');
          console.log('Nombre:' + res[i].nombre);
          console.log('Link:' + res[i].link);
          console.log('Ruta:' + res[i].ruta);
        }
        // Hacer petición http (fetch)
        for (let i = 0; i < res.length; i++) {
          axios.get(res[i].link)
            .then((response) => {
              console.log('-------------------------------------------------------------------------');
              console.log('Nombre:' + res[i].nombre);
              console.log('Link:' + res[i].link);
              console.log('Ruta:' + res[i].ruta);
              console.log('Status code: ' + response.status);
              console.log('Status message: ' + response.statusText);
            })
            .catch((error) => {
              console.log('---------------------------------------------------------------------------');
              console.log('Nombre:' + res[i].nombre);
              console.log('Link:' + res[i].link);
              console.log('Ruta:' + res[i].ruta);
              console.log('Error:', error.message);
            });
        }
      })
      .catch((error) => console.log(error));
  } else {
    console.log('Archivo inválido, prueba con un archivo md');
  }
}

const readMd = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        reject(`Error leyendo archivo ${file}: ${err}`);
        return;
      }
      
      const regex = /\[([^\]]{0,50})\]\((https?:\/\/[^\)\s#]+)/gm;
      let match;
      const arrayUrl = [];

      while ((match = regex.exec(data))) {
        arrayUrl.push({
          nombre: match[1],
          link: match[2],
          ruta: file
        });
      }
      
      resolve(arrayUrl);
    });
  });
}

const userPath = process.argv[2];
mdLinks(userPath);
