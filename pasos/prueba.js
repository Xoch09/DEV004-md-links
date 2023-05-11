import assert from 'assert';
import fs from 'fs';
import { printLinksInMarkdownFile } from './tuArchivo.js';

describe('printLinksInMarkdownFile', () => {
  it('debería imprimir los links encontrados en un archivo Markdown', (done) => {
    const testFilePath = 'ruta/al/archivo.md';
    const testFileContent = `
      Ejemplo de archivo Markdown

      [Link 1](http://www.example.com)
      [Link 2](#seccion1)
      [Link 3](archivo2.md)
    `;

    fs.writeFileSync(testFilePath, testFileContent);

    const consoleOutput = [];
    const originalConsoleLog = console.log;
    console.log = (message) => {
      consoleOutput.push(message);
    };

    printLinksInMarkdownFile('archivo.md', testFilePath);

    assert.deepStrictEqual(consoleOutput, [
      'Nombre: Link 1',
      'Link: http://www.example.com',
      `en Ruta: ${testFilePath}`,
      '',
      'Nombre: Link 3',
      `Link: ${testFilePath.replace('/archivo.md', '/archivo2.md')}`,
      `en Ruta: ${testFilePath}`,
      ''
    ]);

    console.log = originalConsoleLog;

    fs.unlinkSync(testFilePath);

    done();
  });
});