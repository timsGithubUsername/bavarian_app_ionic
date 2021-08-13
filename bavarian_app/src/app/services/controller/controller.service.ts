import { Injectable } from '@angular/core';
import {InteractorRequester} from "../../../interactor/InteractorRequester";
import {Category} from "../../../entities/Category";
import {Level} from "../../../entities/Level";
import {LevelResponse} from "./LevelResponse";
import {VocabularyWord} from "../../../entities/VocabularyWord";
import {StudyResponse} from "./StudyResponse";
import {QuizResponse} from "./QuizResponse";
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
  private levelResponse = new LevelResponse();
  private studyResponse = new StudyResponse();
  private quizResponse = new QuizResponse();

  constructor() {
  }

  public requestAllCategories(){
    this.interactorRequester.requestAllLevels((lvls:Level[]) => this.levelResponse.respondAllLevels(lvls));
  }

  public requestStudy(cat:Category){
    this.interactorRequester.requestStudy(cat, (vocWords:VocabularyWord[]) => this.studyResponse.respondStudy(vocWords));
  }

  public requestQuiz(cat:Category){
    this.interactorRequester.requestQuiz(cat, (quiz:Quiz) => this.quizResponse.respondQuiz(quiz));
  }

  //todo
  public requestProgressFromCategory(cat:Category){

  }

  //todo
  public requestProgressFromAllCategories(){

  }
}
