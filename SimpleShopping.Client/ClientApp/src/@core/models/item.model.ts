import { ICategory } from "./category.model";
import { IItemModel } from "./item-model.model";
import { IMake } from "./make.model";

export interface IItem {
    id?: string;
    name?: string; 
    price?: number; 
    description?: string; 
    categoryId?: string; 
    itemModelId?: string; 
    makeId?: string; 
    sellerId?: string; 
    imageUrl?: string; 
    quantity?: number;
    itemModel?: IItemModel;
    category?: ICategory;
    make?: IMake;
}