import fs from 'fs';
import path from 'path';
import axios from 'axios';

export function mdLinks(file, options) {
  const ext = path.extname(file);
  const pathResolve = path.resolve(file);
  console.log(pathResolve);

  if (ext !== '.md') {
    console.log('Archivo inválido, prueba con un archivo md');
    throw new Error('Archivo inválido, prueba con un archivo md');
  }

  return readMd(pathResolve)
    .then((res) => {
      console.log(res);
      for (let i = 0; i < res.length; i++) {
        console.log('\x1b[31m%s\x1b[0m', '---------------------------------------------------------------------------');
        console.log('\x1b[34m%s\x1b[0m', 'Nombre:' + res[i].nombre);
        console.log('\x1b[35m%s\x1b[0m', 'Link:' + res[i].link);
        console.log('\x1b[33m%s\x1b[0m', 'Ruta:' + res[i].ruta);
      }

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

        return Promise.all(promises)
          .then((results) => {
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
              console.log('Total: ' + totalLinks);
              console.log('Unique: ' + uniqueLinks);

              if (options.validate) {
                const brokenLinks = results.filter((link) => link.ok === 'fail').length;
                console.log('Broken: ' + brokenLinks);
              }
            }
          })
          .catch((error) => {
            console.log('Error:', error);
          });
      } else if (options.stats) {
        const totalLinks = res.length;
        const uniqueLinks = new Set(res.map((link) => link.link)).size;
        console.log('\nEstadísticas:');
        console.log('Total: ' + totalLinks);
        console.log('Unique: ' + uniqueLinks);
      }
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
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
          ruta: file,
        });
      }

      resolve(arrayUrl);
    });
  });
}
