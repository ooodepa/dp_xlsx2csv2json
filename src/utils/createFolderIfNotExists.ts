import * as fs from 'fs';

export default function createFolderIfNotExists(folderPath: string) {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
    console.log(`Папка ${folderPath} создана.`);
  } else {
    console.log(`Папка ${folderPath} уже существует.`);
  }
}
