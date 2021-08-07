import {LanguageFactory} from "./LanguageFactory";
import {LanguageMutable} from "../Language";

export class LanguageFactoryImpl implements LanguageFactory{

  createLanguage(name: string, iconPath: string): LanguageMutable {
    return new LanguageImpl(name,iconPath);
  }

}

class LanguageImpl implements LanguageMutable {

  private iconPath:string;
  private name:string;

  constructor(name:string,iconPath:string) {
    this.setName(name);
    this.setIconPath(iconPath);
  }

  /**
   * Returns the path of the icon of the language
   */
  getIconPath(): string {
    return this.iconPath;
  }

  /**
   * Returns the name of the language
   */
  getName(): string {
    return this.name;
  }

  /**
   * Sets the path of the icon of the language
   * @param path
   */
  setIconPath(path: string): void {
    this.iconPath = path;
  }

  /**
   * Sets the name of the language
   * @param name - name of the language
   */
  setName(name: string): void {
    this.name = name;
  }

}
