import {LanguageMutable} from "../Language";

export interface LanguageFactory {

  createLanguage(name:string,iconPath:string):LanguageMutable;

}
