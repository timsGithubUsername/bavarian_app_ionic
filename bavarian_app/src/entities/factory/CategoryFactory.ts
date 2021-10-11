import {CategoryMutable} from "../Category";

export interface CategoryFactory {
  createCategory(id:number, name:string,iconPath:string):CategoryMutable;
}
