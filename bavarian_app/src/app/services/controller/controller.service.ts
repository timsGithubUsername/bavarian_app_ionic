import { Injectable } from '@angular/core';
import {InteractorRequester} from "../../../interactor/InteractorRequester";
import {Category} from "../../../entities/Category";
import {Level} from "../../../entities/Level";
import {LevelResponse} from "./LevelResponse";

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

  constructor() {
  }

  public requestAllCategories(){
    this.interactorRequester.requestAllLevels((lvls:Level[]) => this.levelResponse.respondAllLevels(lvls));
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
