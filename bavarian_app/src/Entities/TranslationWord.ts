import {Language} from "./Language.js";

export interface TranslationWord {

  getWord():string;

  setWord(w:string):void;

  getLanguage():Language;

  setLanguage(l:Language):void;

}
