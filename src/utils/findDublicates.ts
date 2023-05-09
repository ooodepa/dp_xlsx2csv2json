import ls from './ls';
import readFile from './readFile';
import ItemDto from '../dto/item';

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
  console.log(`                       Итого: ${countDuplicName} шт.`);

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
  console.log(`                       Итого: ${countDuplicModels} шт.`);

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
  console.log(`                       Итого: ${countDuplicDescription} шт.`);

  console.log(`\n Количество всех номенклатур: ${array.length} шт.`);
}
