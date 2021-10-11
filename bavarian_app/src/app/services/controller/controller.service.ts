import { Injectable } from '@angular/core';
import {InteractorRequester} from "../../../interactor/InteractorRequester";
import {Category} from "../../../entities/Category";
import {Level} from "../../../entities/Level";
import {VocabularyWord} from "../../../entities/VocabularyWord";
import {Quiz} from "../../../entities/Quiz";
import {AppInjector} from "../../app.module";
import {CategoryService} from "../category.service";
import {RoutingService} from "../routing.service";
import {Dialect} from "../../../entities/Dialect";
import {ConfigService} from "../config.service";

@Injectable({
  providedIn: 'root'
})
export class ControllerService {
  //Interactor Requester
  private interactorRequester: InteractorRequester;

  /**
   * Set the requester
   * @param interactorRequester The interactor requester implemented all neccessary methods to accept inquiries
   */
  public setInteractorRequester(interactorRequester: InteractorRequester) {
    this.interactorRequester = interactorRequester;
  }

  /**
   * request all categories.
   */
  public requestAllCategories(){
    //the method we hand over should set the Level[] field in category service and redirect the app
    this.interactorRequester.requestAllLevels((lvls:Level[]) => this.respondAllCategories(lvls));
  }

  /**
   * request the study (learning) for the given category.
   * @param cat the category from which we want the VocabularyWords as a request.
   */
  public requestStudy(cat:Category){
    //the method we hand over should set the VocabularyWord[] field in category service and redirect the app
    this.interactorRequester.requestStudy(cat, (vocWords:VocabularyWord[]) => this.respondStudy(vocWords));
  }

  /**
   * request the quiz for a given category
   * @param cat the category from which we want the Quiz as a request
   */
  public requestQuiz(cat:Category){
    //the method we hand over should set the Level[] field in category service and redirect the app
    this.interactorRequester.requestQuiz(cat, (quiz:Quiz) => this.respondQuiz(quiz));
  }

  //todo
  /**
   * request the progress from a given category
   * @param cat the category from which we want the progress
   */
  public requestProgressFromCategory(cat:Category){
    //the method we hand over should set the ... field in category service and redirect the app

  }

  //todo
  /**
   * request the prograss from all categories
   */
  public requestProgressFromAllCategories(){
    //the method we hand over should set the ... field in category service and redirect the app

  }

  /**
   * request all Dialects
   */
  public requestAllDialects(){
    this.interactorRequester.requestAllDialects((dialects => this.respondAllDialects(dialects)));
  }
  /*
  RESPONSE METHODS

  It is not 100% clean to take them in this class, but they just handle the response and redirect the app. If they get
  more complex in the future this mehtods should get there own classes!
   */

  //take the response of the levels which contains the categories, set them to the category service und redirect the app
  private respondAllCategories(lvls: Level[]){
    AppInjector.get(CategoryService).setLevels(lvls);
    AppInjector.get(RoutingService).getRouter().navigate(['categories']);
  }

  //take the response of the quiz, set them to the category service and redirect the app
  private respondQuiz(quiz: Quiz){
    AppInjector.get(CategoryService).setQuiz(quiz);
    AppInjector.get(RoutingService).getRouter().navigate(['quiz']);
  }

  //take the response of the study (learning), set them in category service and redirect the app
  private respondStudy(vocWords: VocabularyWord[]){
    AppInjector.get(CategoryService).setVocabulayWords(vocWords);
    AppInjector.get(RoutingService).getRouter().navigate(['learning']);
  }

  //respond all dialects in the DB
  private respondAllDialects(dialects: Dialect[]){
    AppInjector.get(ConfigService).setDialects(dialects);
  }

  /*

  SETTINGS

  Set the.. settings
   */

  //set the dialect
  public setDialect(d:Dialect):void{
    this.interactorRequester.setDialect(d);
  }
}
