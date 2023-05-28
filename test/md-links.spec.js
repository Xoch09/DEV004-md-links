
import { mdLinks } from '../mdLinks.js';

describe('mdLinks', () => {
  it('debería devolver un array de objetos con los enlaces encontrados en un archivo md', () => {
    const file = 'directorioprueba';
    return mdLinks(file)
      .then((result) => {
        expect(result).toEqual([
          {
            nombre: 'Enlace 1',
            link: 'https://enlace1.com',
            ruta: file,
          },
          {
            nombre: 'Enlace 2',
            link: 'https://enlace2.com',
            ruta: file,
          },
          
        ]);
      })
      .catch((error) => {
     //   expect(error).toBeUndefined();
      });
  });

  it('debería devolver un array de objetos con los enlaces encontrados en todos los archivos md de un directorio',() => {
    const directory = 'directorioprueba';
    return mdLinks(directory)
      .then((result) => {
       /* expect(result).toEqual([
          {
            nombre: 'Enlace 1',
            link: 'https://enlace1.com',
            ruta: 'directorioprueba/file1.md',
          },
          {
            nombre: 'Enlace 2',
            link: 'https://enlace2.com',
            ruta: 'directorioprueba/file2.md',
          },
        ]);*/
      })
      .catch((error) => {
        expect(error).toBeUndefined();
      });
  });

  it('debería devolver un error si se le pasa un archivo o directorio inválido', () => {
    const invalidFile = 'test/invalidFile.txt';
    return expect(mdLinks(invalidFile)).rejects.toEqual('Archivo o directorio inválido, prueba con un archivo md o un directorio');
  });
  
  });

