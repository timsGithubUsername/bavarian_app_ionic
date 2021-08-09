import {CategoryFactory} from "./CategoryFactory";
import {Level} from "../Level";
import {CategoryMutable} from "../Category";

export class CategoryFactoryImpl implements CategoryFactory{

  createCategory(name: string, iconPath: string, level: Level): CategoryMutable {
    return new CategoryImpl(name,iconPath,level);
  }

}

class CategoryImpl implements CategoryMutable{

  private name:string;
  private iconPath:string;
  private level:Level;

  constructor(name:string,iconPath:string,level:Level) {
    this.setName(name);
    this.setIconPath(iconPath);
    this.setLevel(level);
  }

  /**
   * Returns the path of the category icon
   */
  getIconPath(): string {
    return this.iconPath;
  }

  /**
   * Returns the level of the category
   */
  getLevel(): Level {
    return this.level;
  }

  /**
   * Returns the name of the category
   */
  getName(): string {
    return this.name;
  }

  /**
   * Sets the path of the category icon
   */
  setIconPath(path: string): void {
    this.iconPath = path;
  }

  /**
   * Sets the level of the category
   * @param level
   */
  setLevel(level: Level): void {
    this.level = level;
  }

  /**
   * Sets the name of the category
   * @param name
   */
  setName(name: string): void {
    this.name = name;
  }

  getValues():{
    name: string;
    iconPath: string;
    level: {
      id: number;
      iconPath: string }
  } {
    return {
      iconPath: this.getIconPath(),
      level: this.getLevel().getValues(),
      name: this.getName()
    };
  }

}
