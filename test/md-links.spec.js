import fs from 'fs';
import path from 'path';
import { mdLinks } from './mdLinks';

// Mock de la función fs.readFile para simular su comportamiento
jest.mock('fs', () => ({
  readFile: (filePath, encoding, callback) => {
    if (filePath === 'existing.md') {
      const fileContent = `
        [Link 1](https://example.com)
        [Link 2](https://example.org)
      `;
      callback(null, fileContent);
    } else {
      const error = new Error('File not found');
      callback(error, null);
    }
  },
}));

describe('mdLinks', () => {
  it('should log the found links when given a valid .md file', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const filePath = 'existing.md';
    mdLinks('file.md', filePath);
    expect(consoleSpy).toHaveBeenCalledWith(`Nombre:Link 1 \n Link: https://example.com \n en Ruta: ${filePath}\n`);
    expect(consoleSpy).toHaveBeenCalledWith(`Nombre:Link 2 \n Link: https://example.org \n en Ruta: ${filePath}\n`);
  });

  it('should log an error message when given a non-existent file', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error');
    const filePath = 'nonexistent.md';
    mdLinks('file.md', filePath);
    expect(consoleErrorSpy).toHaveBeenCalledWith(`Error leyendo archivo ${filePath}: Error: File not found`);
  });
});


   

