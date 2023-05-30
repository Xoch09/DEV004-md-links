//importar fs
import fs from 'fs';
// ruta que manda usuario
const filePath = process.argv[2]; 

fs.readFile(filePath, 'utf-8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  // Imprimir contenido del archivo
  console.log(data); 
});



