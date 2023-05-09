import LstItemGalery from './lst-item-galery';
import LstItemCharacteristics from './lst-item-characteristics';

export default interface ItemDto {
  dp_name: string;
  dp_model: string;
  dp_cost: number;
  dp_photoUrl: string;
  dp_itemCategoryId?: number;
  dp_seoKeywords: string;
  dp_seoDescription: string;
  dp_itemCharacteristics: LstItemCharacteristics[];
  dp_itemGalery: LstItemGalery[];
}
