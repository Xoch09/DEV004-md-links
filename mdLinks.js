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
  
//Función de flecha, con parámetro fila (ruta de archivo que se va a leer)
const readMd = (file) => {
    //Hacer promesa
  return new Promise((resolve, reject) => {
    // función "readFile" del módulo fs⬅ para leer file. 💥'utf8'💥 para que los datos se coloquen como texto.
    //devolución llamada 💦(callback)💦 se ejecuta hasta que se lee el archivo
        //Resultado se pasa como parametro data🟢, el error se pasa como parámetro err🔴
    fs.readFile(file, 'utf8', (err, data) => {
      //si hay algún error
        if (err) {
        reject(`Error leyendo archivo ${file}: ${err}`);
        return;
      }
      //discrimina, busca similitudes *expresión regular*
      const regex = /\[([^\]]{0,50})\]\((https?:\/\/[^\)\s#]+)/gm;
      //resultados coincidencias encontradas por la expresión regular.
      let match;
      //array vacio para almacenar los que se encuentren
      const arrayUrl = [];
      //bucle while💨 busca las coincidencias del regex y las agrega al array
      while ((match = regex.exec(data))) {
        //agrega al final
        arrayUrl.push({
          nombre: match[1],
          link: match[2],
          ruta: file,
        });
      }
      // si la búsqueda se resuelve se comparte el array con los links✅
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
      //se filtran solo los md, nuevo 👁‍🗨array mdFiles
      const mdFiles = files.filter((file) => path.extname(file) === '.md');
      // array creado, llamado promises que contiene promesas resultantes de aplicar la función
      const promises = mdFiles.map((file) => {
        //para que obtenga archivos completos 
        const filePath = path.join(directory, file);
        return readMd(filePath);
      });
      //esperar que se resuelvan las promesas
      Promise.all(promises)
      //se ejecuta cuando se resuelven
        .then((results) => {
            //cada resultado en results es una array, se usa 💢reduce y concat💢 
            //para crear un solo array con todos los objetos (archivos encntrados)
        const flattenedResults = results.reduce((acc, val) => acc.concat(val),[]);
          resolve(flattenedResults);
        })
        //se activa si se rechaza
        .catch((error) => {
            //console.log("error catch: " , error)
          reject(error);
        });
    });
  });
};
