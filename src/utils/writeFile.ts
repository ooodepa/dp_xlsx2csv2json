import * as fs from 'fs';

/**
 * Функция записывает в файл по пути filename содержимое строки data
 * @param {string} filename
 * @param {string} data
 */
export default async function writeFile(
  filename: string,
  data: string,
  options: any = {},
) {
  try {
    await fs.promises.writeFile(filename, data);

    if (options.log) {
      console.log(` + OK. File saved (${filename})`);
    }

    return true;
  } catch (error: any) {
    console.error(
      ` - Данные не записались в файл ${filename}: ${error.message}`,
    );
  }
}
