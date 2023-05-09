import ls from './utils/ls';
import xlsx2csv from './utils/xlsx2csv';
import pressAnyKey from './utils/pressAnyKey';
import findDublicates from './utils/findDublicates';
import deleteFolderRecursive from './utils/deleteFolderRecursive';
import ItemsCsvToBulkItemsJson from './utils/ItemsCsvToBulkItemsJson';
import createFolderIfNotExists from './utils/createFolderIfNotExists';

async function main() {
  try {
    deleteFolderRecursive('./output');
    createFolderIfNotExists('./output');
    createFolderIfNotExists('./input');
    createFolderIfNotExists('./input/csv');
    await foreachXlsx();
    await foreachCsv();
    await findDublicates();
    pressAnyKey();
  } catch (err) {
    console.log(' < < < < < < < < Программа сломалась ');
    console.log(err);
    console.log(' > > > > > > > > ');
    pressAnyKey();
  }
}

async function foreachXlsx() {
  const files = ls('./input');
  const xlsxFiles = files.filter(e => e.endsWith('.xlsx'));
  for (let i = 0; i < xlsxFiles.length; ++i) {
    try {
      await xlsx2csv(`./input/${xlsxFiles[i]}`, {
        outputFolder: './input/csv',
      });
    } catch (err) {
      console.log(' < < < < < < < < ');
      console.log(err);
      console.log(' > > > > > > > > ');
    }
  }
}

async function foreachCsv() {
  const files = ls('./input/csv');
  const csvFiles = files.filter(e => e.endsWith('.csv'));

  for (let i = 0; i < csvFiles.length; ++i) {
    await ItemsCsvToBulkItemsJson(csvFiles[i], { folder: './input/csv/' });
  }
}

main();
