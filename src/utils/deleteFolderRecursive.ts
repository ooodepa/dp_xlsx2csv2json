import * as fs from 'fs';

export default function deleteFolderRecursive(path: string) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(file => {
      const curPath = `${path}/${file}`;
      if (fs.lstatSync(curPath).isDirectory()) {
        // Рекурсивно удаляем содержимое папки
        deleteFolderRecursive(curPath);
      } else {
        // Удаляем файл
        fs.unlinkSync(curPath);
      }
    });
    // Удаляем пустую папку
    fs.rmdirSync(path);
    console.log(`Папка ${path} успешно удалена.`);
  } else {
    console.log(`Папка ${path} не существует.`);
  }
}
