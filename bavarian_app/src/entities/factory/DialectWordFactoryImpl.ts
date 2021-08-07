import {DialectWordFactory} from "./DialectWordFactory";
import {Dialect} from "../Dialect";
import {DialectWordMutable} from "../DialectWord";

export class DialectWordFactoryImpl implements DialectWordFactory{

  createDialectWord(word: string, dialect: Dialect, pronunciationPath: string): DialectWordMutable {
    return new DialectWordImpl(word,dialect,pronunciationPath);
  }

}

class DialectWordImpl implements DialectWordMutable {

  private dialect:Dialect;
  private pronunciationPath:string;
  private word:string;

  constructor(word:string,dialect:Dialect,pronunciationPath:string) {
    this.setWord(word);
    this.setDialect(dialect);
    this.setPronunciationPath(pronunciationPath);
  }

  /**
   * Returns the dialect of the word
   */
  getDialect(): Dialect {
    return this.dialect;
  }

  /**
   * Returns the path of the sound file with the pronunciation of the word
   */
  getPronunciationPath(): string {
    return this.pronunciationPath;
  }

  /**
   * Returns the word
   */
  getWord(): string {
    return this.word;
  }

  /**
   * Sets the dialect of the word
   * @param d
   */
  setDialect(d: Dialect): void {
    this.dialect = d;
  }

  /**
   * Sets the path of the sound file with the pronunciation of the word
   * @param path
   */
  setPronunciationPath(path: string): void {
    this.pronunciationPath = path;
  }

  /**
   * Sets the word
   * @param w
   */
  setWord(w: string): void {
    this.word = w;
  }

}
