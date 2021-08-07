import {Category} from "../entities/Category";
import {
  InteractorResponseCategories,
  InteractorResponseProgress,
  InteractorResponseQuiz,
  InteractorResponseStudy
} from "./InteractorResponse";

export interface InteractorRequester {

  /**
   * Requests all categories in the database
   */
  requestAllCategories():void;

  /**
   * Requests the study for a category
   * @param cat
   */
  requestStudy(cat:Category):void;

  /**
   * Requests a quiz for a category
   * @param cat
   */
  requestQuiz(cat:Category):void;

  /**
   * Requests progress in a category
   * @param cat
   */
  requestProgress(cat:Category):void;

  /**
   * Requests progress in all categories
   */
  requestProgress()

  setCategoriesResponse(response:InteractorResponseCategories):void;

  setStudyResponse(response:InteractorResponseStudy):void;

  setQuizResponse(response:InteractorResponseQuiz):void;

  setProgressResponse(response:InteractorResponseProgress):void;
}
