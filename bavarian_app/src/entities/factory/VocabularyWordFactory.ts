import {VocabularyWordMutable} from "../VocabularyWord";
import {DialectWord} from "../DialectWord";
import {TranslationWord} from "../TranslationWord";
import {Category} from "../Category";

export interface VocabularyWordFactory {

  /**
   * Creates a new VocabularyWord object
   * @param id - Id of the object
   * @param dialectWord - Word as a dialect of the object
   * @param germanWord - Word in High German from object
   * @param translationWord - Translation of the object
   * @param category - Category of the object
   */
  createVocabularyWord(
    id:number,
    dialectWord:DialectWord,
    germanWord:string,
    translationWord:TranslationWord,
    category:Category
  ):VocabularyWordMutable;

}
