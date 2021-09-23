import shell from 'shelljs';

import { readdirSync, statSync } from 'fs';
import { basename, extname, resolve, dirname } from 'path';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const webploader = resolve(__dirname,'webploader','bin','cwebp');

function getFiles (dir, files_){
  var files = readdirSync(dir).filter(file => !file.endsWith('.webp')).filter( file => !file.startsWith('.'));

  for (var i in files){
      var name = dir + '/' + files[i];
      if (statSync(name).isDirectory()){
          getFiles(name, files_);
      } else {
        const fileNameWithoutExtension = basename(name, extname(name));
        shell.exec(`${webploader} -q 80 ${name} -o ${dir}/${fileNameWithoutExtension}.webp`);
      }
  }
}

export { getFiles };