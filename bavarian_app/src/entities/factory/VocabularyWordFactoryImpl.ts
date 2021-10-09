import {VocabularyWordMutable} from "../VocabularyWord";
import {VocabularyWordFactory} from "./VocabularyWordFactory";

export class VocabularyWordFactoryImpl implements VocabularyWordFactory {

  createVocabularyWord(dialectWord: string, germanWord: string, translationWord: string): VocabularyWordMutable {
    return new VocabularyWordImpl(germanWord,dialectWord,translationWord);
  }

}

class VocabularyWordImpl implements VocabularyWordMutable {

  dialectWord : string;
  dialectWordLiterally : string;
  german : string;
  translationWord : string;
  picturePath : string;
  annotation : string;
  pronunciationPath: string;


  constructor(
    germanWord:string,
    dialectWord:string,
    translationWord:string){

    this.setGerman(germanWord);
    this.setDialectWord(dialectWord);
    this.setTranslation(translationWord);

  }

  /**
   * Set the word in the dialect of the vocabulary.
   * @param word - The word to be set
   */
  setDialectWordLiterally(word: string): void {
        this.dialectWordLiterally = word;
  }


  /**
   * Set the word in the dialect of the vocabulary.
   * @param word - The word to be set
   */
  setDialectWord(word: string): void {
    this.dialectWord = word;
  }

  /**
   * Puts the vocabulary word into High German
   * @param word - The word to be set
   */
  setGerman(word: string): void {
    this.german = word;
  }

  /**
   * Sets the path of the image
   * @param path - Path of an image
   */
  setPicturePath(path: string): void {
    this.picturePath = path;
  }

  /**
   * Sets the translation of the vocabulary
   * @param word - The word to be set
   */
  setTranslation(word: string): void {
    this.translationWord = word;
  }

  /**
   * Sets the annotation of the vocabulary
   * @param a - The note to be set
   */
  setAnnotation(a: string): void {
    this.annotation = a;
  }

  /**
   * Sets the path of the sound file with the pronunciation of the word
   * @param path
   */
  setPronunciationPath(path: string): void {
    this.pronunciationPath = path;
  }

}
