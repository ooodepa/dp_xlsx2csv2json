import * as XLSX from 'xlsx';

import writeFile from './writeFile';

export default async function xlsx2csv(
  inputFilePath: string,
  options: any = {},
) {
  const workbook = XLSX.readFile(inputFilePath);
  for (let i = 0; i < workbook.SheetNames.length; ++i) {
    const sheetName = workbook.SheetNames[i];

    const worksheet = workbook.Sheets[sheetName];
    const csvData = XLSX.utils.sheet_to_csv(worksheet);

    const clearedCsvArray: string[] = [];
    const csvArray = csvData.split(/\r?\n/);
    csvArray.forEach(e => {
      if (e.replace(/,/g, '').length !== 0) {
        clearedCsvArray.push(e);
      }
    });
    const csvText = clearedCsvArray.join('\n');

    const paths = inputFilePath.split('/');
    const file = paths[paths.length - 1];
    const filename = file.replace('.xlsx', '');

    const outputFolder = options.outputFolder
      ? `${options.outputFolder}`
      : './output';

    const path = `${outputFolder}/${filename}__list-${sheetName}.csv`;
    await writeFile(path, csvText, { log: true });
  }
}
