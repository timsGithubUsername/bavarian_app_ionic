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

    //set responsers
    Controller.interactorRequester.setCategoriesResponse(this.responseCategoriesImpl);
    Controller.interactorRequester.setProgressResponse(this.responseProgressImpl);
    Controller.interactorRequester.setStudyResponse(this.responseStudyImpl);
    Controller.interactorRequester.setQuizResponse(this.responseQuizImpl);
  }

  //Response Objects
  private responseStudyImpl = new ResponseStudyImpl();
  private responseCategoriesImpl = new ResponseCategoriesImpl();
  private responseProgressImpl = new ResponseProgressImpl();
  private responseQuizImpl = new ResponseQuizImpl();

  constructor() {
  }

  public static requestAllCategories(){
    // todo
    // Controller.interactorRequester.requestAllCategories();
  }

  public static requestStudy(cat:Category){
    Controller.interactorRequester.requestStudy(cat);
  }

  public static requestQuiz(cat:Category){
    Controller.interactorRequester.requestQuiz(cat);
  }

  public static requestProgressFromCategory(cat:Category){
      Controller.interactorRequester.requestProgressFromCategory(cat);
  }

  public static requestProgressFromAllCategories(){
    Controller.interactorRequester.requestProgressFromAllCategories();
  }
}
