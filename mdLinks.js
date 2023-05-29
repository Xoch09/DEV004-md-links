import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { messageError, messageWelcome } from './mensaje.js';

export function mdLinks(file) {
    return new Promise((resolve, reject) => {
      const ext = path.extname(file);
      const pathResolve = path.resolve(file);
  
      if (ext === '.md') {
        readMd(pathResolve)
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      } else if (fs.lstatSync(file).isDirectory()) {
        readDirectory(file)
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        reject('Archivo o directorio inválido, prueba con un archivo md o un directorio');
      }
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
};

const readDirectory = (directory) => {
  return new Promise((resolve, reject) => {
    fs.readdir(directory, (err, files) => {
      if (err) {
        reject(`Error leyendo directorio ${directory}: ${err}`);
        return;
      }
      const mdFiles = files.filter((file) => path.extname(file) === '.md');
      const promises = mdFiles.map((file) => {
        const filePath = path.join(directory, file);
        return readMd(filePath);
      });
      Promise.all(promises)
        .then((results) => {
        const flattenedResults = results.reduce((acc, val) => acc.concat(val),[]);
          resolve(flattenedResults);
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
};
