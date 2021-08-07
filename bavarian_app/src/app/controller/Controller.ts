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
  private responseStudyImpl: ResponseStudyImpl;
  private responseCategoriesImpl: ResponseCategoriesImpl;
  private responseProgressImpl: ResponseProgressImpl;
  private responseQuizImpl: ResponseQuizImpl;

  constructor() {
    //declare responser objects
    this.responseStudyImpl = new ResponseStudyImpl();
    this.responseCategoriesImpl = new ResponseCategoriesImpl();
    this.responseProgressImpl = new ResponseProgressImpl();
    this.responseQuizImpl = new ResponseQuizImpl();
  }

  public requestAllCategories(){
    Controller.interactorRequester.requestAllCategories();
  }

  public requestStudy(cat:Category){
    Controller.interactorRequester.requestStudy(cat);
  }

  public requestQuiz(cat:Category){
    Controller.interactorRequester.requestQuiz(cat);
  }

  public requestProgressFromCategory(cat:Category){
      Controller.interactorRequester.requestProgressFromCategory(cat);
  }

  public requestProgressFromAllCategories(){
    Controller.interactorRequester.requestProgressFromAllCategories();
  }
}
