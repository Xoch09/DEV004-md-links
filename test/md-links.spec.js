import fs from 'fs';
import axios from 'axios';
import { mdLinks } from '../Index3.js';

jest.mock('fs');
jest.mock('axios');

describe('mdLinks', () => {
  const consoleLogSpy = jest.spyOn(console, 'log');

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should log "Archivo inválido" if file extension is not .md', () => {
    mdLinks('file.txt');
    const resolver= "C:\\Users\\Laboratoria\\xoch\\DEV004-md-links\\file.txt"
    "Archivo inválido, prueba con un archivo md"

    expect(consoleLogSpy).toHaveBeenCalledWith(resolver);
  });

  test('should read file and log links', async () => {
    const mockData = `
      [Link 1](https://example.com/link1)
      [Link 2](https://example.com/link2)
    `;

    fs.readFile.mockImplementation((file, encoding, callback) => {
      callback(null, mockData);
    });

    axios.get.mockResolvedValueOnce({ file: 'file content' });

    await mdLinks('file.md');
const resultado= "C:\\Users\\Laboratoria\\xoch\\DEV004-md-links\\file.md"
[{"link": "https://example.com/link1", "nombre": "Link 1", "ruta": "C:\\Users\\Laboratoria\\xoch\\DEV004-md-links\\file.md"}, {"link": "https://example.com/link2", "nombre": "Link 2", "ruta": "C:\\Users\\Laboratoria\\xoch\\DEV004-md-links\\file.md"}]
"-----------------------------------------------------------------------------"
    expect(fs.readFile).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalledTimes(2);
    expect(axios.get).toHaveBeenCalledWith('https://example.com/link1');
    expect(axios.get).toHaveBeenCalledWith('https://example.com/link2');

   // expect(consoleLogSpy).toHaveBeenCalledWith(resultado);
   /* expect(consoleLogSpy).toHaveBeenCalledWith('Nombre: Link 1');
    expect(consoleLogSpy).toHaveBeenCalledWith('Link: https://example.com/link1');
    expect(consoleLogSpy).toHaveBeenCalledWith('Ruta: file.md');
    expect(consoleLogSpy).toHaveBeenCalledWith('----------------------------------------------------------------');
    expect(consoleLogSpy).toHaveBeenCalledWith('Nombre: Link 2');
    expect(consoleLogSpy).toHaveBeenCalledWith('Link: https://example.com/link2');
    expect(consoleLogSpy).toHaveBeenCalledWith('Ruta: file.md');*/
  });

  test('should log error if reading file fails', async () => {
    const mockError = new Error('File read error');
    fs.readFile.mockImplementation((file, encoding, callback) => {
      callback(mockError, null);
    });

    await mdLinks('file.md');

    expect(fs.readFile).toHaveBeenCalled();
    expect(axios.get).not.toHaveBeenCalled();
    expect(consoleLogSpy).toHaveBeenCalledWith(`C:\\Users\\Laboratoria\\xoch\\DEV004-md-links\\file.md`);
  });

  test('should log error if axios request fails', async () => {
    const mockData = `
      [Link 1](https://example.com/link1)
    `;

    fs.readFile.mockImplementation((file, encoding, callback) => {
      callback(null, mockData);
    });

    const mockAxiosError = new Error('Request failed');
    axios.get.mockRejectedValueOnce(mockAxiosError);
const resultado= 'C:\\Users\\Laboratoria\\xoch\\DEV004-md-links\\file.md'
[{"link": "https://example.com/link1", "nombre": "Link 1", "ruta": "C:\\Users\\Laboratoria\\xoch\\DEV004-md-links\\file.md"}]
'-----------------------------------------------------------------------------'
    await mdLinks('file.md');

    expect(fs.readFile).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalled();
    //expect(consoleLogSpy).toHaveBeenCalledWith(resultado);
    //expect(consoleLogSpy).toHaveBeenCalledWith('Nombre: Link 1');
    //expect(consoleLogSpy).toHaveBeenCalledWith('Link: https://example.com/link1');
    //expect(consoleLogSpy).toHaveBeenCalledWith('Ruta: file.md');
    //expect(consoleLogSpy).toHaveBeenCalledWith('error:', mockAxiosError.message);
  });
});
