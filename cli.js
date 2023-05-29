import { mdLinks } from './mdLinks.js';
import axios from 'axios';

//userphat guarda el tercer argumento del comando por el process.argv 2 (arreglo de argumentos)
const userPath = process.argv[2];
//se agrgan las opciones validate y stats
const options = {
  // si incluye validate es true, si no es false
  validate: process.argv.includes('--validate'),
  stats: process.argv.includes('--stats'),
};

//para obtener los archivos de userphat
mdLinks(userPath)
//metodo then devuelve la promesa cuando este lista, para manejar RES cuando se resuelva
  .then((res) => {
    //iterar todos los elementos de RES, con el BUCLE for
    for (let i = 0; i < res.length; i++) {
      console.log('\x1b[31m%s\x1b[0m', '---------------------------------------------------------------------------');
      console.log('\x1b[34m%s\x1b[0m', 'Nombre:' + res[i].nombre);
      console.log('\x1b[35m%s\x1b[0m', 'Link:' + res[i].link);
      console.log('\x1b[33m%s\x1b[0m', 'Ruta:' + res[i].ruta);
    }
//si hay opcion validate, 
    if (options.validate) {
      //array de promesas, para hacer peticion a HTTP
      const promises = res.map((link) => {
       //devuelve de la libreria, solicitar HTTP *******muestra se estan rotos o no
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
//aqui esperamos que las promesas se resuelvan
      Promise.all(promises)
        .then((results) => {
          //iterar resultados y mostrar
          for (let i = 0; i < results.length; i++) {
            //rojo y like emoji
            console.log('\x1b[31m%s\x1b[0m', '---------------------------------------------------------------------------');
            console.log('\x1b[34m%s\x1b[0m', 'Nombre:' + results[i].nombre);
            console.log('\x1b[35m%s\x1b[0m', 'Link:' + results[i].link);
            console.log('\x1b[33m%s\x1b[0m', 'Ruta:' + results[i].ruta);
            console.log('Status code: ' + results[i].status);
            console.log('OK: ' + results[i].ok);
          }
// si tiene la opcion stats: calcula y muestra estadisticos 1.número total de enlaces
// 2. número de enlaces únicos, 3. número de enlaces rotos
          if (options.stats) {
            //const numero total de enlaces encontrados, del arreglo res
            const totalLinks = res.length;
            //asigna número de enlaces únicos encontrados en archivo o directorio
            //metodo MAP en array RES, obetner valores de los links, y CREAR Nuevo array
            const uniqueLinks = new Set(res.map((link) => link.link)).size;
            //***********crear objeto SET, se pasa como argumento enlaces xonseguidos, SET no acepta repetidos */
            //propiedad size, del objeto SET, para saber el número de elementos únicos
            //negrita y verde y corazón
            console.log("\x1b[1m\x1b[32m%s\x1b[0m","*****'\u2764\ufe0f' *****'\u2764\ufe0f' *****'\u2764\ufe0f' *****'\u2764\ufe0f' *****'\u2764\ufe0f' *****'\u2764\ufe0f' *****'\u2764\ufe0f' *****'\u2764\ufe0f' *****'\u2764\ufe0f' *****'\u2764\ufe0f' *****'\u2764\ufe0f' *****'\u2764\ufe0f' *****'\u2764\ufe0f' *****'\u2764\ufe0f' *****'\u2764\ufe0f' *****'\u2764\ufe0f' ***");
            console.log('\x1b[1m\x1b[31m%s\x1b[0m','\nEstadísticas:');
            console.log('\x1b[44m%s\x1b[0m', 'Total: ' + totalLinks);
            console.log('\x1b[45m%s\x1b[0m', 'Unique: ' + uniqueLinks);
//const donde se guarda resultados de metodo filter a result
//filter itera a result y crea nuevo array
//link.ik=== verifica si el valor de la propiedad ok del objeto link es igual a 'fail'.
            const brokenLinks = results.filter((link) => link.ok === 'fail').length; //broken numero de links rotos
            console.log('\x1b[41m%s\x1b[0m', 'Broken: ' + brokenLinks);
          }
        })
        //capturar y mejorar los errore
        .catch((error) => {
          console.log('\x1b[31m%s\x1b[0m', 'Error:', error);
        });
        //si tiene opcion stats
    } else if (options.stats) {
      //número total de enlaces
      const totalLinks = res.length;
      //numero de enlaces unicos SET no acepta repetidos, crea un  nuevo arryay, sice dice cuantos unicos hay
      const uniqueLinks = new Set(res.map((link) => link.link)).size;
      console.log("\x1b[1m\x1b[32m%s\x1b[0m","*****'\u2764\ufe0f' *****'\u2764\ufe0f' *****'\u2764\ufe0f' *****'\u2764\ufe0f' *****'\u2764\ufe0f' *****'\u2764\ufe0f' *****'\u2764\ufe0f' *****'\u2764\ufe0f' *****'\u2764\ufe0f' *****'\u2764\ufe0f' *****'\u2764\ufe0f' *****'\u2764\ufe0f' *****'\u2764\ufe0f' *****'\u2764\ufe0f' *****'\u2764\ufe0f' *****'\u2764\ufe0f' ***");
      console.log('\x1b[1m\x1b[31m%s\x1b[0m','\nEstadísticas:');
      console.log('\x1b[44m%s\x1b[0m','Total: ' + totalLinks);
      console.log('\x1b[45m%s\x1b[0m','Unique: ' + uniqueLinks);
    }
  })
  .catch((error) => {
    console.log('\x1b[31m%s\x1b[0m', 'Error:', error);
  });
