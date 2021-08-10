import {Category} from "../entities/Category";
import {VocabularyWord} from "../entities/VocabularyWord";
import {Quiz} from "../entities/Quiz";

export interface InteractorRequester {

  /**
   * Requests all categories in the database
   * @param response Called as soon as the request of a spezific study is finished
   */
  requestAllCategories(response:((cats:Category[]) => void)):void;

  /**
   * Requests the study for a category
   * @param cat
   * @param response Called as soon as the request of a spezific study is finished
   */
  requestStudy(cat:Category, response:((study:VocabularyWord[]) => void)):void;

  /**
   * Requests a quiz for a category
   * @param cat
   * @param response Called as soon as the request of a spezific quiz is finished
   */
  requestQuiz(cat:Category, response:((quiz:Quiz)=>void)):void;

  /**
   * Requests progress in a category
   * @param cat
   * @param type Indicates which progress is to be returned
   * @param response Called as soon as the request of the progress of a category is completed
   */
  requestProgressFromCategory(cat:Category,type:ProgressType,response:((progress:number) => void)):void;

  /**
   * Requests progress in all categories
   * @param type Indicates which progress is to be returned
   * @param response Called as soon as the request of the progress of all categories is completed
   */
  requestProgressFromAllCategories(type:ProgressType,response:((progress:Map<Category,number>) => void));

  /**
   * Stores a new progress value for a certain category
   * @param cat - Category for which the progress needs to be saved
   * @param value - New progress to be saved
   */
  saveProgress(cat:Category,value:number);
}


export enum ProgressType{
  Quiz,
  Study
}
