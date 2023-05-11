import fs from 'fs';
import path from 'path';

const filePath = process.argv[2]; // Ruta del archivo proporcionada por el usuario

fs.readFile(filePath, 'utf-8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  
  console.log(data); // Imprimir contenido del archivo

  const ext = path.extname(filePath); // Obtener la extensión del archivo
  console.log(`La extensión del archivo es: ${ext}`);
});
