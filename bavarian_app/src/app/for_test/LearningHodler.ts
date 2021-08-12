import {VocabularyWord, VocabularyWordValue} from "../../entities/VocabularyWord";
import {Category, CategoryValue} from "../../entities/Category";
import {DialectWord, DialectWordValue} from "../../entities/DialectWord";
import {TranslationWord, TranslationWordValue} from "../../entities/TranslationWord";
import {Dialect, DialectValue, Gender} from "../../entities/Dialect";
import {Language, LanguageValue} from "../../entities/Language";

export class LearningHodler {
  words: VocabularyWord[];

  constructor() {
    this.fillData();
  }

  private fillData() {
    this.words.push(new Word("first word", "blub1", 1, "assets/img/img_not_found.jpg"))
    this.words.push(new Word("first word", "blub2", 2, "assets/img/img_not_found.jpg"))
    this.words.push(new Word("first word", "blub3", 3, "assets/img/img_not_found.jpg"))
    this.words.push(new Word("first word", "blub4", 4, "assets/img/img_not_found.jpg"))
    this.words.push(new Word("first word", "blub5", 5, "assets/img/img_not_found.jpg"))
    this.words.push(new Word("first word", "blub6", 6, "assets/img/img_not_found.jpg"))
    this.words.push(new Word("first word", "blub7", 7, "assets/img/img_not_found.jpg"))
  }

  public getWords(){
    return this.words;
  }
}

export class Word implements VocabularyWord{

  constructor(private annotation: string,
              private german: string,
              private id: number,
              private picturePath: string) {
  }


  getAnnotation(): string {
    return this.annotation;
  }

  getCategory(): Category {
    return undefined;
  }

  getDialectWord(): DialectWord {
    return new DWord("https://www.youtube.com/watch?v=yxHDIrvPLIo", "TestDialectWord");
  }

  getGerman(): string {
    return this.german;
  }

  getId(): number {
    return this.id;
  }

  getPicturePath(): string {
    return this.picturePath;
  }

  getTranslation(): TranslationWord {
    return new TWord("TestTranslationWord");
  }

  getValues(): VocabularyWordValue {
    let that = this;

    return new class implements VocabularyWordValue {
      annotation = that.getAnnotation();
      category = undefined;
      dialectWord = that.getDialectWord().getValues();
      german = that.getGerman();
      id = that.getId();
      picturePath = that.getPicturePath();
      translationWord = that.getTranslation().getValues();
    };
  }

}
export class DWord implements DialectWord{

  constructor(private proPath: string, private word: string) {
  }

  getDialect(): Dialect {
    return ;
  }

  getPronunciationPath(): string {
    return this.proPath;
  }

  getValues(): DialectWordValue {
    let that = this;

    return new class implements DialectWordValue {
      dialect = that.getDialect().getValues();
      pronunciationPath = that.getPronunciationPath();
      word = that.getWord();
    };
  }

  getWord(): string {
    return this.word;
  }

}
export class Dia implements Dialect{
  getColor(): number {
    return 0;
  }

  getGender(): Gender {
    return undefined;
  }

  getInfo(): string {
    return "";
  }

  getName(): string {
    return "";
  }

  getValues(): DialectValue {
    return new class implements DialectValue {
      color = 0;
      gender = Gender.FEMALE;
      info = "";
      name = "..";
    };
  }

}
export class TWord implements TranslationWord{

  constructor(private word: string) {
  }

  getLanguage(): Language {
    return new Lan("Dumpfbackisch", "assets/img/img_not_found.jpg");
  }

  getValues(): TranslationWordValue {
    let that = this;

    return new class implements TranslationWordValue {
      language = that.getLanguage().getValues();
      word = that.getWord();
    };
  }

  getWord(): string {
    return this.word;
  }

}
export class Lan implements Language{

  constructor(private name: string, private iconPath: string) {
  }
  getIconPath(): string {
    return this.iconPath;
  }

  getName(): string {
    return this.name;
  }

  getValues(): LanguageValue {
    let that = this;

    return new class implements LanguageValue {
      iconPath = that.getIconPath();
      word = that.getName();
    };
  }

}
