import { mdLinks } from './mdLinks.js';

const userPath = process.argv[2];
const options = {
  validate: process.argv.includes('--validate'),
  stats: process.argv.includes('--stats'),
};

mdLinks(userPath, options)
  .catch((error) => console.log(error));


