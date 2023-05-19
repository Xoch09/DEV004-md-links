import fs from 'fs';
import path from 'path';
import marked from 'marked';
import axios from 'axios';

// Comprobar si la ruta es válida
export function isPathValid(path) {
  return fs.existsSync(path);
}

// Comprobar si la ruta es absoluta
export function isAbsolutePath(path) {
  return path.startsWith('/');
}

// Convertir la ruta a absoluta
export function convertToAbsolutePath(path) {
  return path.startsWith('/') ? path : path.resolve(process.cwd(), path);
}

// Comprobar si el archivo es un archivo Markdown
export function isMarkdownFile(path) {
  return path.toLowerCase().endsWith('.md');
}

// Leer el contenido del archivo
export function readFileContent(path) {
  return fs.readFileSync(path, 'utf-8');
}

// Obtener los enlaces (links) de un archivo Markdown
export function getLinksFromMarkdownFile(path) {
  const content = readFileContent(path);
  const links = [];
  const renderer = new marked.Renderer();

  renderer.link = (href, title, text) => {
    links.push({ href, title, text, file: path });
  };

  marked(content, { renderer });

  return links;
}

// Comprobar si se ingresó la opción "options"
export function hasOptionsArgument() {
  return process.argv.includes('options');
}

// Imprimir los enlaces
export function printLinks(links) {
  if (links.length === 0) {
    console.log('No se encontraron enlaces.');
  } else {
    for (const link of links) {
      console.log(`href: ${link.href}`);
      console.log(`text: ${link.text}`);
      console.log(`file: ${link.file}`);
      console.log();
    }
  }
}

// Verificar si un enlace es válido
export async function isLinkValid(link) {
  try {
    const response = await axios.head(link.href);
    return response.status >= 200 && response.status < 400;
  } catch (error) {
    return false;
  }
}
