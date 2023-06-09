import writeFile from './writeFile';
import ItemDto from './../dto/item';
import readFile from './readFile';
import LstItemGalery from './../dto/lst-item-galery';
import LstItemCharacteristics from './../dto/lst-item-characteristics';
import ItemCharacteristicsEnum from './../dto/item-characteristics-enum';

export default async function ItemsCsvToBulkItemsJson(
  path: string,
  options: any = {},
) {
  const folderPath = options.folder ? `${options.folder}` : './';
  const text = await readFile(`${folderPath}${path}`);

  if (text.length === 0) {
    console.log(` ! Файл ${path} пуст!`);
    return;
  }

  let array = text.split(/\r?\n/);
  array = array.filter(e => e.length > 0);

  let headers = array[0].split(',');
  headers = headers.map(e => `${JSON.parse(e)}`.trim());

  const dataArray: ItemDto[] = [];

  array.forEach((element, index) => {
    if (index === 0) {
      return;
    }

    const arr = element.split(',');

    const dp_name = getCsvCell(arr[headers.indexOf('Наименование')]);
    const dp_model = getCsvCell(arr[headers.indexOf('Модель')]);
    const dp_cost = getCsvCell(arr[headers.indexOf('Цена')]);
    const dp_photoUrl = getCsvCell(arr[headers.indexOf('Картинка')]);
    const dp_itemCategoryId = getCsvCell(arr[headers.indexOf('Код категории')]);
    const dp_seoKeywords = getCsvCell(arr[headers.indexOf('Ключевые слова')]);
    const dp_seoDescription = getCsvCell(arr[headers.indexOf('Описание')]);

    const dp_itemCharacteristics: LstItemCharacteristics[] = [];

    const onBox = getCsvCell(arr[headers.indexOf('В коробке (штук)')]);

    if (onBox) {
      dp_itemCharacteristics.push({
        dp_characteristicId: ItemCharacteristicsEnum['В коробке (штук)'],
        dp_value: onBox,
      });
    }

    const boxWeight = getCsvCell(arr[headers.indexOf('Вес коробки (кг)')]);

    if (boxWeight) {
      dp_itemCharacteristics.push({
        dp_characteristicId: ItemCharacteristicsEnum['Вес коробки (кг)'],
        dp_value: boxWeight,
      });
    }

    const boxM3 = getCsvCell(arr[headers.indexOf('Размер коробки (м3)')]);

    if (boxM3) {
      dp_itemCharacteristics.push({
        dp_characteristicId: ItemCharacteristicsEnum['Размер коробки (м3)'],
        dp_value: boxM3,
      });
    }

    const diametrMm = getCsvCell(arr[headers.indexOf('Диаметр (mm)')]);

    if (diametrMm) {
      dp_itemCharacteristics.push({
        dp_characteristicId: ItemCharacteristicsEnum['Диаметр (mm)'],
        dp_value: diametrMm,
      });
    }

    const heightIslivaCm = getCsvCell(arr[headers.indexOf('Высота (mm)')]);

    if (heightIslivaCm) {
      dp_itemCharacteristics.push({
        dp_characteristicId: ItemCharacteristicsEnum['Высота (mm)'],
        dp_value: heightIslivaCm,
      });
    }

    const lengthIslivaCm = getCsvCell(arr[headers.indexOf('Длина (mm)')]);

    if (lengthIslivaCm) {
      dp_itemCharacteristics.push({
        dp_characteristicId: ItemCharacteristicsEnum['Длина (mm)'],
        dp_value: lengthIslivaCm,
      });
    }

    const material = getCsvCell(arr[headers.indexOf('Материал')]);

    if (material) {
      dp_itemCharacteristics.push({
        dp_characteristicId: ItemCharacteristicsEnum['Материал'],
        dp_value: material,
      });
    }

    const color = getCsvCell(arr[headers.indexOf('Цвет')]);

    if (color) {
      dp_itemCharacteristics.push({
        dp_characteristicId: ItemCharacteristicsEnum['Цвет'],
        dp_value: color,
      });
    }

    const upravlenie = getCsvCell(arr[headers.indexOf('Управление')]);

    if (upravlenie) {
      dp_itemCharacteristics.push({
        dp_characteristicId: ItemCharacteristicsEnum['Управление'],
        dp_value: color,
      });
    }

    const onCartonBox = getCsvCell(
      arr[headers.indexOf('В картонной коробке (штук)')],
    );

    if (onCartonBox) {
      dp_itemCharacteristics.push({
        dp_characteristicId:
          ItemCharacteristicsEnum['В картонной коробке (штук)'],
        dp_value: onCartonBox,
      });
    }

    const ip = getCsvCell(arr[headers.indexOf('IP')]);

    if (ip) {
      dp_itemCharacteristics.push({
        dp_characteristicId: ItemCharacteristicsEnum['IP'],
        dp_value: ip,
      });
    }

    const volt = getCsvCell(arr[headers.indexOf('Вольт (В)')]);

    if (volt) {
      dp_itemCharacteristics.push({
        dp_characteristicId: ItemCharacteristicsEnum['Вольт (В)'],
        dp_value: volt,
      });
    }

    const herz = getCsvCell(arr[headers.indexOf('Частота (Гц)')]);

    if (volt) {
      dp_itemCharacteristics.push({
        dp_characteristicId: ItemCharacteristicsEnum['Частота (Гц)'],
        dp_value: herz,
      });
    }

    const galery = getCsvCell(arr[headers.indexOf('Галерея')]).split(' ');
    const dp_itemGalery: LstItemGalery[] = [];

    if (galery) {
      for (let i = 0; i < galery.length; ++i) {
        if (galery[i].length > 0) {
          dp_itemGalery.push({ dp_photoUrl: galery[i] });
        }
      }
    }

    const data: ItemDto = {
      dp_name: dp_name ? dp_name : '',
      dp_model: dp_model ? dp_model : '',
      dp_cost: Number(dp_cost) ? Number(dp_cost) : 0,
      dp_photoUrl: dp_photoUrl ? dp_photoUrl : '',
      dp_itemCategoryId: Number(dp_itemCategoryId)
        ? Number(dp_itemCategoryId)
        : 0,
      dp_seoKeywords: dp_seoKeywords ? dp_seoKeywords : '',
      dp_seoDescription: dp_seoDescription ? dp_seoDescription : '',
      dp_itemCharacteristics: dp_itemCharacteristics,
      dp_itemGalery: dp_itemGalery,
    };

    dataArray.push(data);
  });

  const sortedArray = dataArray.sort((a, b) =>
    a.dp_model.localeCompare(b.dp_model),
  );
  const obj = { bulk: sortedArray };
  const textJson = JSON.stringify(obj, null, 2);

  await writeFile(`./output/${path}.json`, textJson, { log: true });
}

function getCsvCell(cell: string | undefined): string {
  if (!cell) return '';
  return cell.replace(/^"(.*)"$/, '$1');
}
