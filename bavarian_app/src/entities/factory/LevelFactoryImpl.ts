import {LevelFactory} from "./LevelFactory";
import {LevelMutable, LevelValue} from "../Level";

export class LevelFactoryImpl implements LevelFactory{

  createLevel(id: number, iconPath: string): LevelMutable {
    return new LevelImpl(id,iconPath);
  }

}

class LevelImpl implements LevelMutable {

  private id:number;
  private iconPath:string;

  constructor(id:number,iconPath:string) {
    this.setId(id);
    this.setIconPath(iconPath);
  }


  /**
   * Returns the path of the icon of the level
   */
  getIconPath(): string {
    return this.iconPath;
  }

  /**
   * Returns the number of the level
   */
  getId(): number {
    return this.id;
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

  getValues(): LevelValue {
    return {iconPath: this.getIconPath(), id: this.getId()};
  }

}
