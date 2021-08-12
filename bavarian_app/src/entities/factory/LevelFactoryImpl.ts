import {LevelFactory} from "./LevelFactory";
import {LevelMutable} from "../Level";
import {CategoryMutable} from "../Category";

export class LevelFactoryImpl implements LevelFactory{

  createLevel(id: number, iconPath: string, categories:CategoryMutable[]): LevelMutable {
    return new LevelImpl(id,iconPath,categories);
  }

}

class LevelImpl implements LevelMutable {

  id:number;
  iconPath:string;
  categories:CategoryMutable[];

  constructor(id:number,iconPath:string,categories:CategoryMutable[]) {
    this.setId(id);
    this.setIconPath(iconPath);
    this.setCategories(categories);
  }


  /**
   * Sets the path of the icon of the level
   * @param path
   */
  setIconPath(path: string): void {
    this.iconPath = path;
  }


  /**
   * Sets the number of the level
   * @param id
   */
  setId(id: number): void {
    this.id = id;
  }

  /**
   * Add a new Category to the Level
   * @param category
   */
  addCategory(category: CategoryMutable): void {
    category.setLevel(this);
    this.categories.push(category)
  }

  /**
   * Sets all Categories which correspond to this level
   * @param categories
   */
  setCategories(categories: CategoryMutable[]): void {
    this.categories = [];

    categories.forEach(cat => this.addCategory(cat))
  }

}
