import { Command } from 'commander';

import { getFiles } from './lib/convertToWebp.mjs';

const program = new Command();

program.option('-p, --path <path>', 'Pasta das imagens a serem convertidas');

program.parse(process.argv);

const { path } = program.opts();

getFiles(path);