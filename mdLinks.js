import fs from 'fs';
import path from 'path';
import axios from 'axios';

//exportar la función
export function mdLinks(file) {
    // nueva promesa (asíncrona) se resuelve o rechaza la promesa.
    return new Promise((resolve, reject) => {
      //módulo path para obtener la extensión del archivo, devuelve la extensión con el (.)
        const ext = path.extname(file);
        //resuelve duda absoluta     
        const pathResolve = path.resolve(file);
  
        //si es md      
      if (ext === '.md') {
        //llama a readme y pasa la ruta absoluta
        readMd(pathResolve)
        //resuelve , recibe resultado con los enlaces (resolve)
          .then((res) => {
            resolve(res);
          })
          //maneja errores, si pasa error no se resuelve
          .catch((error) => {
            //console.log("error catch: " , error)
            //mdlinks se rechaza
            reject(error);
          });
          //verificar si es un directorio
      } else if (fs.lstatSync(file).isDirectory()) {
        // si es directorio, se llama a readDirectory
        //devuelve una promesa que RESUELVE con el resultado obtenido al leer todos los archivos "md"😎 en el directorio.
        readDirectory(file)
        //Si se resuelve, se manda a la cadena de resultados ✅
          .then((res) => {
            resolve(res);
          })
          // si se rechaza se captura en catch
          .catch((error) => {
            //console.log("error catch: " , error)
            //y se llama a reject ❌
            reject(error);
          });
          //💌 mensaje de error
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
      //discrimina, busca similitudes
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
            //console.log("error catch: " , error)
          reject(error);
        });
    });
  });
};
