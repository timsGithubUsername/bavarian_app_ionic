import {Language} from "../Language.js";
import {TranslationWordMutable} from "../TranslationWord.js";

export interface TranslationWordFactory {

  createTranslationWord(word:string,lang:Language):TranslationWordMutable;

}
