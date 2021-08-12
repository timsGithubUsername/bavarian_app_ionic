import {CategoryMutable} from "../Category";

export interface CategoryFactory {
  createCategory(name:string,iconPath:string):CategoryMutable;
}
