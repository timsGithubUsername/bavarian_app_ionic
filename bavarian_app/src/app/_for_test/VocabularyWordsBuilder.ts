import {VocabularyWord, VocabularyWordMutable} from "../../entities/VocabularyWord";
import {VocabularyWordFactoryImpl} from "../../entities/factory/VocabularyWordFactoryImpl";

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
        "translation word "+i);

      currentVocabularyWord.setAnnotation("test");
      currentVocabularyWord.setPronunciationPath("assets/audio/test_audio.mp3")
      currentVocabularyWord.setPicturePath("assets/img/img_not_found.jpg");

      this.vocabularyWords.push(currentVocabularyWord);
    }
  }
}
