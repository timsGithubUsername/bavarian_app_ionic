import {VocabularyWordMutable} from "../VocabularyWord";
import {Category} from "../Category";
import {DialectWord} from "../DialectWord";
import {TranslationWord} from "../TranslationWord";
import {VocabularyWordFactory} from "./VocabularyWordFactory";
import {Gender} from "../Dialect";

export class VocabularyWordFactoryImpl implements VocabularyWordFactory {

  createVocabularyWord(id: number, dialectWord: DialectWord, germanWord: string, translationWord: TranslationWord, category: Category): VocabularyWordMutable {
    return new VocabularyWordImpl(id,category,germanWord,dialectWord,translationWord);
  }

}

class VocabularyWordImpl implements VocabularyWordMutable {

  private id:number;

  private category : Category;
  private dialectWord : DialectWord;
  private germanWord : string;
  private translationWord : TranslationWord;
  private picturePath : string;
  private annotation : string;

  constructor(
    id:number,
    category:Category,
    germanWord:string,
    dialectWord:DialectWord,
    translationWord:TranslationWord){

    this.id = id;
    this.setCategory(category);
    this.setGerman(germanWord);
    this.setDialectWord(dialectWord);
    this.setTranslation(translationWord);

  }

  /**
   * Returns the category of the vocabulary.
   */
  getCategory(): Category {
    return this.category;
  }

  /**
   * Returns the vocabulary in dialect.
   */
  getDialectWord(): DialectWord {
    return this.dialectWord;
  }

  /**
   * Returns the vocabulary in High German
   */
  getGerman(): string {
    return this.germanWord;
  }

  /**
   * Returns the ID of the vocabulary.
   */
  getId(): number {
    return this.id;
  }

  /**
   * Returns the path of the image
   */
  getPicturePath(): string {
    return this.picturePath;
  }

  /**
   * Returns the translation of the vocabulary
   */
  getTranslation(): TranslationWord {
    return this.translationWord;
  }

  /**
   * Returns the annotation of the vocabulary
   */
  getAnnotation(): string {
    return this.annotation;
  }

  /**
   * Sets the category of the vocabulary
   * @param cat - New category
   */
  setCategory(cat: Category): void {
    this.category = cat;
  }

  /**
   * Set the word in the dialect of the vocabulary.
   * @param word - The word to be set
   */
  setDialectWord(word: DialectWord): void {
    this.dialectWord = word;
  }

  /**
   * Puts the vocabulary word into High German
   * @param word - The word to be set
   */
  setGerman(word: string): void {
    this.germanWord = word;
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
  setTranslation(word: TranslationWord): void {
    this.translationWord = word;
  }

  /**
   * Sets the annotation of the vocabulary
   * @param a - The note to be set
   */
  setAnnotation(a: string): void {
    this.annotation = a;
  }

  getValues(): {
    id: number;
    dialectWord: {
      word: string;
      dialect: {
        name: string;
        color: number;
        gender: Gender;
        info: string };
      pronunciationPath: string };
    german: string;
    translationWord: {
      word: string;
      language: {
        word: string;
        iconPath: string }
    };
    picturePath: string;
    category: {
      name: string;
      iconPath: string;
      level: {
        id: number;
        iconPath: string }
    };
    annotation: string
  } {
    return {
      annotation: this.getAnnotation(),
      category: this.getCategory().getValues(),
      dialectWord: this.getDialectWord().getValues(),
      german: this.getGerman(),
      id: this.getId(),
      picturePath: this.getPicturePath(),
      translationWord: this.getTranslation().getValues()
    };
  }

}
