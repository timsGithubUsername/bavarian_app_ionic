import {InteractorRequester} from "../../interactor/InteractorRequester";
import {ResponseStudyImpl} from "./ResponseStudyImpl";
import {ResponseQuizImpl} from "./ResponseQuizImpl";
import {ResponseProgressImpl} from "./ResponseProgressImpl";
import {ResponseCategoriesImpl} from "./ResponseCategoriesImpl";
import {Category} from "../../entities/Category";

export class Controller {
  //Interactor Requester
  private static interactorRequester: InteractorRequester;

  //set Interactor Requster
  public setInteractorRequestor(interactorRequester: InteractorRequester) {
    Controller.interactorRequester = interactorRequester;
  }

  //Response Objects
  private static responseStudyImpl = new ResponseStudyImpl();
  private static responseCategoriesImpl = new ResponseCategoriesImpl();
  private static responseProgressImpl = new ResponseProgressImpl();
  private static responseQuizImpl = new ResponseQuizImpl();

  constructor() {
  }

  public static requestAllCategories(){
    Controller.interactorRequester.requestAllCategories((cats:Category[]) => Controller.responseCategoriesImpl.respondAllCategories(cats));
  }

  public static requestStudy(cat:Category){

  }

  public static requestQuiz(cat:Category){

  }

  public static requestProgressFromCategory(cat:Category){

  }

  public static requestProgressFromAllCategories(){

  }
}
