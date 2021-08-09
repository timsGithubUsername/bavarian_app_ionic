import {Level} from "../Level";
import {CategoryMutable} from "../Category";

export interface CategoryFactory {
  createCategory(name:string,iconPath:string,level:Level):CategoryMutable;
}
