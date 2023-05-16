//importa leer, escribir, archivos directorios
import fs from 'fs'; 
//Importar para manipular rutas de archivos y directorios
import path from 'path';

//file: archivo
//filepath:secuencia de ubicaciones de directorios que llevan a un archivo en el sistema de archivos
export function mdLinks(file, filePath) {
  // método "extname" del módulo path, para obtener la extensión de un archivo.
  //toma una ruta de archivo como argumento "file" y devuelve la extensión del archivo especificado
  const ext = path.extname(file);
  //verifica si el archivo es .md
  if (ext === '.md') {
    //método readfile, toma "argumentos" 1.filepath(ruta de archivo), 2. tipo de codificación
    //3.función de devolución de llamada (callback) se ejecuta cuando se complete la lectura de archivo.
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        //si hay error muestra mensaje de error, si no, se lee el archivo
        console.error(`Error leyendo archivo ${filePath}: ${err}`);
        return;
      }
      //filtro, discrimina
      const regex = /\[([^\]]{0,50})\]\((https?:\/\/[^\)\s#]+)/gm;
      //se declara variable match sin darle avalor a´n
      let match;
      //blucle while
      //asigna la coincidencia de la data a match
      //por cada coincidencia encontrada, muestra información que coincide
      while ((match = regex.exec(data))) {
        //exec devuelve un array o un null
      console.log(`Nombre:${match[1]} \n Link: ${match[2]} \n en Ruta: ${filePath}\n`);
      }
    });
  }
}

//directorypath, se espera que sea una ruta de directorio
export function printFilesInDirectory(directoryPath) {
  // método readdir del módulo fs, aplica el callback
  //withFileTypes: true para saber si son archivos o directorios
  //files:  almacena el resultado de la lectura (array de elementos del directorio)
  fs.readdir(directoryPath, { withFileTypes: true }, (err, files) => {
    // ve si existe o no y si hay error o no
    if (err) {
      console.error(`Error leyendo directorio${directoryPath}: ${err}`);
      //detiene el proceso
      return;
    }
    //array sobre la que se llama el método foreach, itera en cada elemento
    files.forEach((file) => {//codigo que se utilizara para cada elemento{}
      //path.join "concatena (la ruta del directorio) directorypath" con el nombre del archivo
      //file.name, nombre del archivo= ruta completa del archivo dentro del directorio.
      const filePath = path.join(directoryPath, file.name);
      //es directorio
      if (file.isDirectory()) {
       // se lllama a la función de forma RECURSIVA (se llaman a si mismas), pasa filepath como argumento
        printFilesInDirectory(filePath);
      } else {
        mdLinks(file.name, filePath);
      }
    });
  });
}

const userPath = process.argv[2];
printFilesInDirectory(userPath);
//xoch
