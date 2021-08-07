import {Category} from "../entities/Category.js";
import {VocabularyWord} from "../entities/VocabularyWord.js";
import {Quiz} from "../entities/Quiz.js";

export interface InteractorResponseCategories {

  /**
   * Called as soon as the request of all categories is finished
   * @param cats
   */
  respondAllCategories(cats:Category[]):void;

}

export interface InteractorResponseStudy {

  /**
   * Called as soon as the request of a spezific study is finished
   * @param study
   */
  respondStudy(study:VocabularyWord[]):void;

}

export interface InteractorResponseQuiz {

  /**
   * Called as soon as the request of a spezific quiz is finished
   * @param quiz
   */
  respondQuiz(quiz:Quiz):void;

}

export interface InteractorResponseProgress {

  /**
   * Called as soon as the request of the progress of a category is completed
   * @param progress
   */
  respondProgress(progress:number);

  /**
   * Called as soon as the request of the progress of all categories is completed
   * @param progress
   */
  respondProgress(progress:Map<Category,number>)

}
