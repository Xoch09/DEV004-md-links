import fs from 'fs';
import path from 'path';

export function printLinksInMarkdownFile(file, filePath) {
    const ext = path.extname(file);