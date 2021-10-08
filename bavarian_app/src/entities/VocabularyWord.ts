export interface VocabularyWord {

  /**
   * Returns the vocabulary in dialect.
   */
  readonly dialectWord:string;

  /**
   * Returns the vocabulary in dialect.
   */
  readonly dialectWordLiterally:string;

  /**
   * Returns the vocabulary in High German
   */
  readonly german:string;


  /**
   * Returns the translation of the vocabulary
   */
  readonly translationWord:string;


  /**
   * Returns the path of the image
   */
  readonly picturePath:string;

  /**
   * Returns the path of the sound file with the pronunciation of the word
   */
  readonly pronunciationPath:string;


  /**
   * Returns the annotation of the vocabulary
   */
  readonly annotation:string

}

export interface VocabularyWordMutable extends VocabularyWord{


  /**
   * Set the word in the dialect of the vocabulary.
   * @param word - The word to be set
   */
  setDialectWord(word:string):void;

  /**
   * Set the word in the dialect of the vocabulary.
   * @param word - The word to be set
   */
  setDialectWordLiterally(word:string):void;

  /**
   * Puts the vocabulary word into High German
   * @param word - The word to be set
   */
  setGerman(word:string):void;

  /**
   * Sets the translation of the vocabulary
   * @param word - The word to be set
   */
  setTranslation(word:string):void;

  /**
   * Sets the path of the image
   * @param path - Path of an image
   */
  setPicturePath(path:string):void;

  /**
   * Sets the path of the sound file with the pronunciation of the word
   * @param path
   */
  setPronunciationPath(path:string):void;

  /**
   * Sets the annotation of the vocabulary
   * @param a - The note to be set
   */
  setAnnotation(a:string):void;

}
