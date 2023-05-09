import * as fs from 'fs';

/**
 * Функция проверяет существование файла по пути path.
 * Если файл существует то возвращает true, иначе false.
 * @param {*} path
 * @returns boolean
 */
export default async function isFileExists(path: string) {
  try {
    await fs.promises.access(path);
    return true;
  } catch (error: any) {
    if (error.code === 'ENOENT') return false;
    throw error;
  }
}
