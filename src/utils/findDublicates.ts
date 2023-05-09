import ls from './ls';
import readFile from './readFile';
import ItemDto from '../dto/item';
import writeFile from './writeFile';

interface ItemBulk {
  bulk: ItemDto[];
}

export default async function FindDublicates() {
  const files = ls('./output');
  const jsonFiles = files.filter(e => e.endsWith('.json'));

  const array: ItemDto[] = [];

  for (let i = 0; i < jsonFiles.length; ++i) {
    const text = await readFile(`./output/${jsonFiles[i]}`);
    const json: ItemBulk = JSON.parse(text);
    const items = json.bulk;
    array.push(...items);
  }

  console.log(' \n Дубликаты имени: ');
  let countDuplicName = 0;
  for (let i = 0; i < array.length; ++i) {
    const name = array[i].dp_name;
    if (!name) continue;
    for (let j = 0; j < array.length; ++j) {
      if (name === array[j].dp_name && i !== j) {
        console.log(
          ` - ${array[j].dp_name} =====> ${array[j].dp_itemCategoryId} ${array[j].dp_model}`,
        );
        countDuplicName += 1;
      }
    }
  }

  if (countDuplicName === 0) {
    console.log('\t Нет дубликатов');
  }

  console.log(' \n Дубликаты модели: ');
  let countDuplicModels = 0;
  for (let i = 0; i < array.length; ++i) {
    const model = array[i].dp_model;
    if (!model) continue;
    for (let j = 0; j < array.length; ++j) {
      if (model === array[j].dp_model && i !== j) {
        console.log(
          ` - ${array[j].dp_model} =====> ${array[j].dp_itemCategoryId} ${array[j].dp_model}`,
        );
        countDuplicModels += 1;
      }
    }
  }

  if (countDuplicModels === 0) {
    console.log('\t Нет дубликатов');
  }

  console.log(' \n Дубликаты описания: ');
  let countDuplicDescription = 0;
  for (let i = 0; i < array.length; ++i) {
    const description = array[i].dp_seoDescription;
    if (!description) continue;
    for (let j = 0; j < array.length; ++j) {
      if (description === array[j].dp_seoDescription && i !== j) {
        console.log(
          ` - ${array[j].dp_seoDescription} =====> ${array[j].dp_itemCategoryId} ${array[j].dp_model}`,
        );
        countDuplicDescription += 1;
      }
    }
  }

  if (countDuplicDescription === 0) {
    console.log('\t Нет дубликатов');
  }

  let countEmptyName = 0;
  array.forEach(e => {
    if (e.dp_name.length === 0) {
      countEmptyName += 1;
    }
  });

  let countEmptyModel = 0;
  array.forEach(e => {
    if (e.dp_model.length === 0) {
      countEmptyModel += 1;
    }
  });

  let countEmptyDescription = 0;
  array.forEach(e => {
    if (e.dp_seoDescription.length === 0) {
      countEmptyDescription += 1;
    }
  });

  console.log('\n Записи с неуказанной категорией:');
  let countNoCategory = 0;
  array.forEach(e => {
    if (e.dp_itemCategoryId === 0) {
      countNoCategory += 1;
      console.log(` - ${e.dp_model} ${e.dp_name}`);
    }
  });

  if (countNoCategory === 0) {
    console.log('\t У всех записей указаны категории');
  }

  console.log(`
 Количество дубликатов наименования            : ${countDuplicName} шт.
 Количество дубликатов модели                  : ${countDuplicModels} шт.
 Количество дубликатов описания                : ${countDuplicDescription} шт.
                                               :
 Количество записей с неуказаным наименованием : ${countEmptyName} шт.
 Количество записей с неуказаной модели        : ${countEmptyModel} шт.
 Количество записей с неуказаным описанием     : ${countEmptyDescription} шт.
                                               :
 Количество записей с неуказаной категорией    : ${countNoCategory} шт.
                                               :
 Количество всех номенклатур                   : ${array.length} шт.
  `);

  const path = './output/bundle/DP_CTL_Items.json';
  const data = JSON.stringify({ bulk: array }, null, 2);
  await writeFile(path, data, { log: true });
}
