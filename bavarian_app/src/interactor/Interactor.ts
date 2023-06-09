import {Category} from "../entities/Category";
import {VocabularyWord} from "../entities/VocabularyWord";
import {Quiz} from "../entities/Quiz";
import {Level} from "../entities/Level";
import {Language} from "../entities/Language";
import {Dialect} from "../entities/Dialect";

export interface Interactor {

  /**
   * Requests the start of the database. Calls the response function when the start of the database is completed.
   * @param response
   */
  startInteractor(response:()=>void);

  /**
   * Requests the reset of the database. Has to be called after a change to language or dialect.
   * Calls the response function when the reset of the database is completed.
   * @param response
   */
  resetInteractor(response:()=>void);

  /**
   * Requests all Languages of the Database
   * @param response Called as soon as the request ist finished
   */
  requestAllLanguages(response:((langs:Language[]) => void)):void;

  /**
   * Requests all dialects of the database
   * @param response Called as soon as the request ist finished
   */
  requestAllDialects(response:((dialects:Dialect[]) => void)):void;

  /**
   * Sets the language for all upcoming requests
   * @param language
   */
  setLanguage(language:Language):void;

  /**
   * Sets the dialect_old for all upcoming requests
   * @param dialect
   */
  setDialect(dialect:Dialect):void;

  /**
   * Requests the currently selected language
   * @param response Called as soon as the request ist finished. Hands Over undefined if the language isn't set yet
   */
  requestLanguage(response:((lang:Language) => void)):void;

  /**
   * Requests the currently selected dialect_old
   * @param response Called as soon as the request ist finished. Hands Over undefined if the dialect_old isn't set yet
   */
  requestDialect(response:((dialect:Dialect) => void)):void;

  /**
   * Requests all levels in the database
   * Language and dialect_old must be set before
   * @param response Called as soon as the request of all levels is finished
   */
  requestAllLevels(response:((levels:Level[]) => void)):void;

  /**
   * Requests the study for a category
   * Language and dialect_old must be set before
   * @param cat
   * @param response Called as soon as the request of a spezific study is finished
   */
  requestStudy(cat:Category, response:((study:VocabularyWord[]) => void)):void;

  /**
   * Requests a quiz for a category
   * Language and dialect_old must be set before
   * @param cat
   * @param response Called as soon as the request of a spezific quiz is finished
   */
  requestQuiz(cat:Category, response:((quiz:Quiz)=>void)):void;

  /**
   * Requests progress in a category
   * Language and dialect_old must be set before
   * @param cat
   * @param type Indicates which progress is to be returned
   * @param response Called as soon as the request of the progress of a category is completed
   */
  requestProgressFromCategory(cat:Category,type:ProgressType,response:((progress:number) => void)):void;

  /**
   * Requests progress in all categories
   * Language and dialect_old must be set before
   * @param type Indicates which progress is to be returned
   * @param response Called as soon as the request of the progress of all categories is completed
   */
  requestProgressFromAllCategories(type:ProgressType,response:((progress:Map<Category,number>) => void));

  /**
   * Stores a new progress value for a certain category
   * Language and dialect_old must be set before
   * @param cat - Category for which the progress needs to be saved
   * @param type Indicates which progress is to be saved
   * @param value - New progress to be saved
   */
  saveProgress(cat:Category,type:ProgressType,value:number);

  /**
   * Saves an specific achievement
   * @param id
   * @param status True if the user completed the achievement
   */
  saveAchievement(id: string, status: boolean): void;

  /**
   * Returns if a user completed this achievement
   * @param id
   */
  checkAchievement(id: string): boolean

  /**
   * Deletes all user Data from storage
   */
  clearUserData():void;
}


export enum ProgressType{
  Quiz,
  Study
}
