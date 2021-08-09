import {Language} from "../Language";
import {TranslationWordMutable} from "../TranslationWord";

export interface TranslationWordFactory {

  createTranslationWord(word:string,lang:Language):TranslationWordMutable;

}
