import {CategoryFactory} from "./CategoryFactory";
import {Level} from "../Level";
import {CategoryMutable} from "../Category";

export class CategoryFactoryImpl implements CategoryFactory{

  createCategory(name: string, iconPath: string): CategoryMutable {
    return new CategoryImpl(name,iconPath);
  }

}

class CategoryImpl implements CategoryMutable{

  level: Level;

  constructor(public name: string,public iconPath: string){

  }

  setIconPath(path: string): void{
    this.iconPath = path;
  }

  setName(name: string): void {
    this.name = name;
  }

  setLevel(level: Level): void {
    this.level = level;
  }
}
