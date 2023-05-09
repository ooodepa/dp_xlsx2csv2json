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
    const csvData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    const filteredCsvData = csvData
      .filter((row: any) =>
        row.some((cell: any) => cell !== null && cell !== ''),
      )
      .map((row: any) => row.map((cell: any) => (cell !== null ? cell : '')));

    const paths = inputFilePath.split('/');
    const file = paths[paths.length - 1];
    const filename = file.replace('.xlsx', '');

    const outputFolder = options.outputFolder
      ? options.outputFolder
      : './output';

    const path = `${outputFolder}/${filename}__list-${sheetName}.csv`;
    await writeFile(path, arrayToCSVString(filteredCsvData), { log: true });
  }
}

function arrayToCSVString(data: any[][]) {
  return data
    .map(row => row.map(cell => JSON.stringify(cell)).join(','))
    .join('\n');
}
