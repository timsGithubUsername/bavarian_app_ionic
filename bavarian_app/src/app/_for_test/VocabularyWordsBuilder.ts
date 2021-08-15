import {VocabularyWord, VocabularyWordMutable} from "../../entities/VocabularyWord";
import {VocabularyWordFactoryImpl} from "../../entities/factory/VocabularyWordFactoryImpl";

/**
 * Use the factories in entities package to build some objects for system tests
 */
export class VocabularyWordsBuilder {
  vocabularyWords: VocabularyWord[] = [];
  vocabularyWordFactory = new VocabularyWordFactoryImpl();

  constructor() {
    this.buildVocabularyWords();
  }

  private buildVocabularyWords() {
    let currentVocabularyWord: VocabularyWordMutable;

    for(let i = 0; i < 6; i++){
      currentVocabularyWord = this.vocabularyWordFactory.createVocabularyWord(
        i,
        "dialect word "+i,
        "german word "+i,
        "");

      if(Math.floor(Math.random() * 2) === 0) currentVocabularyWord.setAnnotation("test stuff der hier stehen könnte aber bin Fantasielos");

      currentVocabularyWord.setPronunciationPath("assets/audio/test_audio.mp3")
      currentVocabularyWord.setPicturePath("assets/img/test_img.jpg");

      this.vocabularyWords.push(currentVocabularyWord);
    }
  }
}
