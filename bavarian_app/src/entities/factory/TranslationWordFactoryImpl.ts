import {TranslationWordFactory} from "./TranslationWordFactory.js";
import {Language} from "../Language.js";
import {TranslationWordMutable} from "../TranslationWord.js";

export class TranslationWordFactoryImpl implements TranslationWordFactory {

  createTranslationWord(word: string, lang: Language):TranslationWordMutable {

    return  new TranslationWordImpl(word,lang);

  }

}


class TranslationWordImpl implements TranslationWordMutable {

  private word:string;
  private language:Language;

  constructor(word:string,language:Language) {
    this.setWord(word);
    this.setLanguage(language);
  }

  /**
   * Returns the translation
   */
  getWord(): string {
    return this.word;
  }

  /**
   * Returns the language of the translation
   */
  getLanguage(): Language {
    return this.language;
  }

  /**
   * Sets the translation
   * @param w - Translation as string
   */
  setWord(w: string): void {
    this.word = w;
  }

  /**
   * Sets the Language of the translation
   * @param l Language of the translation
   */
  setLanguage(l: Language): void {
    this.language = l;
  }

}
