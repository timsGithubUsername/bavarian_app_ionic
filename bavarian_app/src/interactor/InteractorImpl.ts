import { Category } from "src/entities/Category";
import { Dialect } from "src/entities/Dialect";
import { Language } from "src/entities/Language";
import { Level } from "src/entities/Level";
import { Quiz } from "src/entities/Quiz";
import { VocabularyWord } from "src/entities/VocabularyWord";
import {InteractorRequester, ProgressType} from "./InteractorRequester";
import {DatabaseRequester} from "./DatabaseRequester";
import {ExcelManagerRequest} from "./ExcelManagerRequest";
import {LocalStorageManager} from "./LocalStorageManager";
import {Table} from "./Table";
import {QuizFactory} from "../entities/factory/QuizFactory";
import {QuizWordFactory} from "../entities/factory/QuizWordFactory";
import {valueReferenceToExpression} from "@angular/compiler-cli/src/ngtsc/annotations/src/util";

export class InteractorImpl implements InteractorRequester {


  private database:DatabaseRequester;
  private excel:ExcelManagerRequest;
  private storage:LocalStorageManager;

  private quizFactory:QuizFactory;
  private quizWordFactory:QuizWordFactory;

  private langs:Language[] = [];
  private dialects:Dialect[] = [];
  private levels:Level[] = [];

  public setDatabaseRequester(instance:DatabaseRequester){
    this.database = instance;
  }

  public setExcelManagerRequest(instance:ExcelManagerRequest){
    this.excel = instance;
  }

  public setLocalStorageManager(instance:LocalStorageManager){
    this.storage = instance;
  }

  public setQuizFactory(instance:QuizFactory){
    this.quizFactory = instance;
  }

  public setQuizWordFactory(instance:QuizWordFactory){
    this.quizWordFactory = instance;
  }

  startInteractor(response: () => void) {

    let counter = 0;
    let excel = this.excel;
    let database = this.database;
    let storage = this.storage;


    let start = function (){
      counter++;
      if(counter > 4){
        database.startDatabase(response);
      }
    }

    excel.requestExcelTable("Welcome_to_Bavaria_V_2_35.xlsx",0,(table:Table)=>{
      database.setVocabWordsContent(table,storage.loadLanguage(),storage.loadDialect());
      start();
    })
    excel.requestExcelTable("Categories_V_1_5.xlsx",0,(table:Table)=>{
      database.setCategoriesContent(table)
      start();
    })
    excel.requestExcelTable("Dialects_V_1_17.xlsx",0,(table:Table)=>{
      database.setDialectContent(table)
      start();
    })
    excel.requestExcelTable("Languages_V_1_8.xlsx",0,(table:Table)=>{
      database.setLanguageContent(table)
      start();
    })
    excel.requestExcelTable("Levels_V_1_5.xlsx",0,(table:Table)=>{
      database.setLevelsContent(table)
      start();
    })
  }

  resetInteractor(response: () => void) {
    this.langs = [];
    this.dialects = [];
    this.levels = [];
    this.database.resetDatabase(response);
  }


  requestAllLanguages(response: (langs: Language[]) => void): void {
    let that = this;
    if(this.langs === []){
      this.database.requestAllLanguages((langs:Language[]) => {
        that.langs = langs;
        response(langs);
      });
    }else{
      response(this.langs)
    }
  }
  requestAllDialects(response: (dialects: Dialect[]) => void): void {
    let that = this;
    if(this.dialects === []){
      this.database.requestAllDialects((dialects:Dialect[]) => {
        that.dialects = dialects;
        response(dialects);
      });
    }else{
      response(this.dialects)
    }
  }
  setLanguage(language: Language): void {
    this.storage.saveLanguage(language.name);
  }
  setDialect(dialect: Dialect): void {
    this.storage.saveDialect(dialect.name);
  }
  requestLanguage(response: (lang: Language) => void): void {
    let storage = this.storage;
    this.requestAllLanguages((langs:Language[]) => {
      response(langs.filter((value:Language) => {
        return value.name === storage.loadLanguage();
      })[0]);
    });
  }

  requestDialect(response: (dialect: Dialect) => void): void {
    let storage = this.storage;
    this.requestAllDialects((dialects:Dialect[]) => {
      response(dialects.filter((value:Dialect) => {
        value.name === storage.loadDialect();
      })[0]);
    });
  }

  requestAllLevels(response: (levels: Level[]) => void): void {
    let that = this;
    if(this.levels === []){
      this.database.requestAllLevels(levels => {
        that.levels = levels;
        response(levels);
      });
    }else{
      response(this.levels);
    }
  }

  requestStudy(cat: Category, response: (study: VocabularyWord[]) => void): void {
    this.database.requestVocabularyWords(cat.id,response);
  }
  requestQuiz(cat: Category, response: (quiz: Quiz) => void): void {
    let that = this;
    this.database.requestVocabularyWords(cat.id,(words:VocabularyWord[]) => {
      response(that.quizFactory.createQuiz(words,that.quizWordFactory));
    })
  }
    requestProgressFromCategory(cat: Category, type: ProgressType, response: (progress: number) => void): void {
        response(this.storage.loadProgress(type,cat));
    }
    requestProgressFromAllCategories(type: ProgressType, response: (progress: Map<Category, number>) => void) {
      let storage = this.storage;
        this.database.requestAllLevels((levels:Level[]) => {
          let result:Map<Category,number> = new Map<Category, number>();
          levels.forEach((value:Level) => {
            value.categories.forEach((value:Category) => {
              result.set(value,storage.loadProgress(type,value))
            })
          })
          response(result);
        })
    }
    saveProgress(cat: Category, type: ProgressType, value: number) {
        this.storage.saveProgress(type,cat,value);
    }
}