
import { mdLinks } from '../mdLinks.js';

describe('mdLinks', () => {
  it('debería devolver un array de objetos con los enlaces encontrados en un archivo md', () => {
    const file = 'directorioprueba/prueba.md';
    return mdLinks(file)
      .then((result) => {
        expect(result).toStrictEqual([
          {
            nombre: 'Markdown',
            link: 'https://es.wikipedia.org/wiki/Markdown',
            ruta: "C:\\Users\\Laboratoria\\xoch\\DEV004-md-links\\directorioprueba\\prueba.md",
          },
          {
            nombre: 'docs oficiales de `npm install` acá',
            link: 'https://docs.npmjs.com/cli/install',
            ruta: "C:\\Users\\Laboratoria\\xoch\\DEV004-md-links\\directorioprueba\\prueba.md",
          },
          
        ]);
      })
      //.catch((error) => {
        //console.log("error de tests: ", error)
     //   expect(error).toBeUndefined();
      //});
  });

  it('debería devolver un array de objetos con los enlaces encontrados en todos los archivos md de un directorio',() => {
    const directory = 'directorioprueba';
    return mdLinks(directory)
      .then((result) => {
       expect(result).toEqual([
          {
            nombre: 'Markdown',
            link: 'https://es.wikipedia.org/wiki/Markdown', 
            ruta: 'directorioprueba\\prueba.md',
          },
          {
            nombre: 'docs oficiales de `npm install` acá',
            link: 'https://docs.npmjs.com/cli/install',
            ruta: 'directorioprueba\\prueba.md',
          },
          {
            nombre: 'Promise - MDN',
            link: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Promise',
            ruta: 'directorioprueba\\prueba2.md',
          },
        ]);
      })
      //.catch((error) => {
        //expect(error).toBeUndefined();
      //});
  });

  it('debería devolver un error si se le pasa un archivo o directorio inválido', () => {
    const invalidFile = 'test/invalidFile.txt';
    return expect(mdLinks(invalidFile)).rejects.toEqual('Archivo o directorio inválido, prueba con un archivo md o un directorio');
  });
  
  });

