import fs from 'fs';
import axios from 'axios';
import { mdLinks } from '../Index3.js';
//mockear fs y axios
jest.mock('fs');
jest.mock('axios');
//para iniciar el bloque de pruebas de mdlinks
describe('mdLinks', () => {
    //crea espía (spy) en console.log, con el espia se rastrean y manejan las llamadas a una función
    // mientras se hacen las pruebas (aqui rastreo las llamadas a console.log)
  const consoleLogSpy = jest.spyOn(console, 'log');
//Bloque que se ejecuta después de cada prueba, limpiar espías creados
  afterEach(() => {
    jest.clearAllMocks();
  });
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//si el archivo no es md manda mensaje "archivo invalido"
  test('should log "Archivo inválido" if file extension is not .md', () => {
      //llama a funcion mdlinks con parametro file.txt
    mdLinks('file.txt');
 //resolver almacena cadena de texto= archivo que pasé
    const resolver= "C:\\Users\\Laboratoria\\xoch\\DEV004-md-links\\file.txt"
    "Archivo inválido, prueba con un archivo md"
//comprueba que console.log se llamó con la ruta del archivo 'file.txt'
//la que pasé a mdLinks
    expect(consoleLogSpy).toHaveBeenCalledWith(resolver);
  });
//------------------------------------------PETICIÓN--------------------------------------------------------
//que lea correctamente un archivo y se registren los enlaces encontrados
test('should read file and log links', async () => {
    //mockData almacena cadena de texto simulado de un archivo en formato Markdown 🕹
    const mockData = `
      [Link 1](https://example.com/link1)
      [Link 2](https://example.com/link2)
    `;
 //mockea la función "fs.readFile" simula la lectura de un archivo
        //proporciona el contenido simulado mockData cuando se llama a fs.readFile.
    fs.readFile.mockImplementation((file, encoding, callback) => {
      callback(null, mockData);
    });
// simular una solicitud HTTP y devuelve una promesa resuelta con un objeto simulado, aqui es verdadero
    axios.get.mockResolvedValueOnce({ file: 'file content' });
//llama a mdlinks y que espere
    await mdLinks('file.md');
    //resultado, almacena cadena de textos 
const resultado= "C:\\Users\\Laboratoria\\xoch\\DEV004-md-links\\file.md"
[{"link": "https://example.com/link1", "nombre": "Link 1", "ruta": "C:\\Users\\Laboratoria\\xoch\\DEV004-md-links\\file.md"}, {"link": "https://example.com/link2", "nombre": "Link 2", "ruta": "C:\\Users\\Laboratoria\\xoch\\DEV004-md-links\\file.md"}]
"-----------------------------------------------------------------------------"
//verificar si se llamo una vez
    expect(fs.readFile).toHaveBeenCalled();
    //si se llamo 2 veces, porque puse 2 enlaces
    expect(axios.get).toHaveBeenCalledTimes(2);
    //saber si se llamaron correctamente con los enlaces simulados
    expect(axios.get).toHaveBeenCalledWith('https://example.com/link1');
    expect(axios.get).toHaveBeenCalledWith('https://example.com/link2');
  });
//*********************************************************************************** */
//saber si hay un error y si la lectura del archivo falla
  test('should log error if reading file fails', async () => {
    //lmacena un objeto de error simulado, texto "file read error"
    const mockError = new Error('File read error');
    //simular que falla la lectura
    //a lectura del archivo falla y se pasa el objeto de error mockError al callback de la función fs.readFile
    fs.readFile.mockImplementation((file, encoding, callback) => {
      callback(mockError, null);
    });
//llama a mdlink y se espera
    await mdLinks('file.md');
// verificar si fs.readFile fue llamada al menos una vez 
    expect(fs.readFile).toHaveBeenCalled();
    //verificar si no fue llamada, la lectura del archivo falla y no se deben realizar solicitudes HTTP.
    expect(axios.get).not.toHaveBeenCalled();
    //verifica si console.log fue llamado con la ruta completa del archivo
    //ver si se registra el mensaje de error
    expect(consoleLogSpy).toHaveBeenCalledWith(`C:\\Users\\Laboratoria\\xoch\\DEV004-md-links\\file.md`);
  });
//*************************************************************************************** */
//Verificar si se registra un error, si la solicitud HTTP con axios falla
  test('should log error if axios request fails', async () => {
    //mock data almacena, se usa enlace de ejemplo
    const mockData = `
      [Link 1](https://example.com/link1)
    `;
//mockea para simular la lectura del archivo y da el contenido
    fs.readFile.mockImplementation((file, encoding, callback) => {
      callback(null, mockData);
    });
//simula error en la petición de HTTP
    const mockAxiosError = new Error('Request failed');
    axios.get.mockRejectedValueOnce(mockAxiosError);
const resultado= 'C:\\Users\\Laboratoria\\xoch\\DEV004-md-links\\file.md'
[{"link": "https://example.com/link1", "nombre": "Link 1", "ruta": "C:\\Users\\Laboratoria\\xoch\\DEV004-md-links\\file.md"}]
'-----------------------------------------------------------------------------'
    await mdLinks('file.md');
//VERIFICA SI FUE LLAMADA, AL MENOS UNA VEZ
    expect(fs.readFile).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalled();
 
  });
});
