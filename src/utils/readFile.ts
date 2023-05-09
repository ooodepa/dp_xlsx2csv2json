import * as fs from 'fs';

/**
 * Функция, читает файл по пути filepath и возвращает содержимое
 * @param {string} filepath
 * @returns string
 */
export default async function readFile(filepath: string) {
  try {
    const data = await fs.promises.readFile(filepath, 'utf-8');
    return data;
  } catch (err) {
    console.error(err);
    return '';
  }
}
