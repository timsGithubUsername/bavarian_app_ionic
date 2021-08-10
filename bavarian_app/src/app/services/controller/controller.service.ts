import { Injectable } from '@angular/core';
import {InteractorRequester} from "../../../interactor/InteractorRequester";
import {ResponseStudyImpl} from "./ResponseStudyImpl";
import {ResponseCategories} from "./ResponseCategories";
import {ResponseProgressImpl} from "./ResponseProgressImpl";
import {ResponseQuizImpl} from "./ResponseQuizImpl";
import {Category} from "../../../entities/Category";
import {VocabularyWord} from "../../../entities/VocabularyWord";
import {Quiz} from "../../../entities/Quiz";

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
    this.interactorRequester.requestStudy(cat,(words:VocabularyWord[]) => this.responseStudy.respondStudy(words));
  }

  public requestQuiz(cat:Category){
    this.interactorRequester.requestQuiz(cat, (quiz:Quiz) => this.responseQuiz.respondQuiz(quiz));
  }

  public requestProgressFromCategory(cat:Category){

  }

  public requestProgressFromAllCategories(){

  }
}
