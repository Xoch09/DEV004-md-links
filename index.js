import fs from 'fs';
import path from 'path';

export function mdLinks(file, filePath) {
  const ext = path.extname(file);
  if (ext === '.md') {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error leyendo archivo ${filePath}: ${err}`);
        return;
      }
      //filtro, discrimina
      const regex = /\[([^\]]{0,50})\]\((https?:\/\/[^\)\s#]+)/gm;
      let match;
      while ((match = regex.exec(data))) {
      console.log(`Nombre:${match[1]} \n Link: ${match[2]} \n en Ruta: ${filePath}\n`);
      }
    });
  }
}


export function printFilesInDirectory(directoryPath) {
  fs.readdir(directoryPath, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error(`Error leyendo directorio${directoryPath}: ${err}`);
      return;
    }
    files.forEach((file) => {
      const filePath = path.join(directoryPath, file.name);
      if (file.isDirectory()) {
        printFilesInDirectory(filePath);
      } else {
        mdLinks(file.name, filePath);
      }
    });
  });
}

const userPath = process.argv[2];
printFilesInDirectory(userPath);

