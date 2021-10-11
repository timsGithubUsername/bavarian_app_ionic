import {VocabularyWordMutable} from "../VocabularyWord";

export interface VocabularyWordFactory {

  /**
   * Creates a new VocabularyWord object
   * @param id - Id of the object
   * @param dialectWord - Word as a dialect_old of the object
   * @param germanWord - Word in High German from object
   * @param translationWord - Translation of the object
   */
  createVocabularyWord(
    dialectWord:string,
    germanWord:string,
    translationWord:string,
  ):VocabularyWordMutable;

}
