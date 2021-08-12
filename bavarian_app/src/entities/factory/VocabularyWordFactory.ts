import {VocabularyWordMutable} from "../VocabularyWord";

export interface VocabularyWordFactory {

  /**
   * Creates a new VocabularyWord object
   * @param id - Id of the object
   * @param dialectWord - Word as a dialect of the object
   * @param germanWord - Word in High German from object
   * @param translationWord - Translation of the object
   */
  createVocabularyWord(
    id:number,
    dialectWord:string,
    germanWord:string,
    translationWord:string,
  ):VocabularyWordMutable;

}
