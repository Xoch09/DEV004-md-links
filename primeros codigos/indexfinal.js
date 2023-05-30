import { error, log } from 'console';
import fs from 'fs';
import path from 'path';
import axios from 'axios';


import { messageError, messageWelcome } from "./mensaje.js";
console.log(messageError, messageWelcome)
import {readMd}

// función mdlinks
export function mdLinks(file, options) {
  // para  obtener la extensión del archivo (se pasa como parametro "file"), con ext
  const ext = path.extname(file);
  //convertir ruta en absoluta
  const pathResolve = path.resolve(file);
  //imprimir la ruta absoluta
  console.log(pathResolve);

  //identica a md
  if (ext === '.md') {
    //ruta absoluta como argumento
    readMd(pathResolve)
      //devolver el resultado de la promesa como argumento "res"
      .then((res) => {
        //ver el contenido de md
        console.log(res);
        //bucle for, intera
        for (let i = 0; i < res.length; i++) {
          console.log('\x1b[31m%s\x1b[0m', '---------------------------------------------------------------------------');
          console.log('\x1b[34m%s\x1b[0m', 'Nombre:' + res[i].nombre);
          console.log('\x1b[35m%s\x1b[0m', 'Link:' + res[i].link);
          console.log('\x1b[33m%s\x1b[0m', 'Ruta:' + res[i].ruta);
        }
        
        if (options.validate) {
          
          for (let i = 0; i < res.length; i++) {
            // biblioteca Axios para solicitud a HTTP, al enlace (link) en iteración del bucle
            // Axios devuelve promesa a resolver con la respuesta de la solicitud
            axios
              .get(res[i].link)
              //si se resuelve correctamente se tiene respuesta y se imprime en console.log
              .then((response) => {
                console.log(
                  '\x1b[31m%s\x1b[0m',
                  '---------------------------------------------------------------------------'
                );
                console.log('\x1b[34m%s\x1b[0m', 'Nombre:' + res[i].nombre);
                console.log('\x1b[35m%s\x1b[0m', 'Link:' + res[i].link);
                console.log('\x1b[33m%s\x1b[0m', 'Ruta:' + res[i].ruta);
                console.log('Status code: ' + response.status);
                console.log('Status message: ' + response.statusText);
              })
              //si la promesa devuelta es rechazada (error en la solicitud)
              .catch((error) => {
                //// Agrega color rojo al texto
                console.log(
                  '\x1b[31m%s\x1b[0m',
                  '---------------------------------------------------------------------------'
                );
                console.log('\x1b[34m%s\x1b[0m', 'Nombre:' + res[i].nombre);
                console.log('\x1b[35m%s\x1b[0m', 'Link:' + res[i].link);
                console.log('\x1b[33m%s\x1b[0m', 'Ruta:' + res[i].ruta);
                console.log('Error:', error.message);
              });
          }
        }
      })
      //cierra then y captura los errores
      .catch((error) => console.log(error));
    //Si no es md, se muestra mensaje de "archivo invalido"
  } else {
    console.log('Archivo inválido, prueba con un archivo md');
  }
}

//ruta del archivo Markdown que se lee
const readMd = (file) => {
  //devuelve nueva promesa
  return new Promise((resolve, reject) => {
    //readfile para leer el archivo especificado, leer con (formato de codificación utf8)
    fs.readFile(file, 'utf8', (err, data) => {
      //si ocurre error la promesa se rechaza y devuelve mensaje de error
      if (err) {
        reject(`Error leyendo archivo ${file}: ${err}`);
        return;
      }
      // si es exitosa busca con un discriminador/filtro para encontrar coincidencias Expresion regular, máximo 50 caracteres
      const regex = /\[([^\]]{0,50})\]\((https?:\/\/[^\)\s#]+)/gm;
      let match;
      //almacenar enlaces que se encuentran el el array
      const arrayUrl = [];
      //bucle "wile" para iterar, cada que se encuentre coincidencia se guarda en el array
      while ((match = regex.exec(data))) {
        //agregar objetos al array
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
};
mdLinks(userPath, options);
