import { Injectable } from '@angular/core';
import {InteractorRequester} from "../../../interactor/InteractorRequester";
import {ResponseStudyImpl} from "./ResponseStudyImpl";
import {ResponseCategories} from "./ResponseCategories";
import {ResponseProgressImpl} from "./ResponseProgressImpl";
import {ResponseQuizImpl} from "./ResponseQuizImpl";
import {Category} from "../../../entities/Category";

@Injectable({
  providedIn: 'root'
})
export class ControllerService {
  //Interactor Requester
  private interactorRequester: InteractorRequester;

  //set Interactor Requster
  public setInteractorRequester(interactorRequester: InteractorRequester) {
    this.interactorRequester = interactorRequester;
  }

  //Response Objects
  private responseStudy = new ResponseStudyImpl();
  private responseCategories = new ResponseCategories();
  private responseProgress = new ResponseProgressImpl();
  private responseQuiz = new ResponseQuizImpl();

  constructor() {
  }

  public requestAllCategories(){
    this.interactorRequester.requestAllCategories((cats:Category[]) => this.responseCategories.respondAllCategories(cats));
  }

  public requestStudy(cat:Category){

  }

  public requestQuiz(cat:Category){

  }

  public requestProgressFromCategory(cat:Category){

  }

  public requestProgressFromAllCategories(){

  }
}
