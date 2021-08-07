import {Level} from "../Level.js";
import {CategoryMutable} from "../Category.js";

export interface CategoryFactory {
  createCategory(name:string,iconPath:string,level:Level):CategoryMutable;
}
