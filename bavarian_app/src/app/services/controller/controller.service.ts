import {Injectable} from '@angular/core';
import {Interactor, ProgressType} from "../../../interactor/Interactor";
import {Category} from "../../../entities/Category";
import {Level} from "../../../entities/Level";
import {VocabularyWord} from "../../../entities/VocabularyWord";
import {Quiz} from "../../../entities/Quiz";
import {AppInjector} from "../../app.module";
import {CategoryService} from "../category.service";
import {RoutingService} from "../routing.service";
import {Dialect} from "../../../entities/Dialect";
import {ConfigService} from "../config.service";
import {Language} from "../../../entities/Language";
import {ProgressService} from "../progress.service";
//some changes to push merge repair

@Injectable({
  providedIn: 'root'
})
export class ControllerService {
  //Interactor Requester
  private interactorRequester: Interactor;

  /**
   * Set the requester
   * @param interactorRequester The interactor requester implemented all neccessary methods to accept inquiries
   */
  public setInteractorRequester(interactorRequester: Interactor) {
    this.interactorRequester = interactorRequester;
  }

  /**
   * request all categories.
   */
  public requestAllCategories() {
    //the method we hand over should set the Level[] field in category service and redirect the app
    this.interactorRequester.requestAllLevels((lvls: Level[]) => this.respondAllCategories(lvls));
  }

  /**
   * request the study (learning) for the given category.
   * @param cat the category from which we want the VocabularyWords as a request.
   */
  public requestStudyAndRedirect(cat: Category) {
    //the method we hand over should set the VocabularyWord[] field in category service and redirect the app
    AppInjector.get(CategoryService).setCategory(cat);
    this.interactorRequester.requestStudy(cat, (vocWords: VocabularyWord[]) => this.respondStudyAndRedirect(vocWords));
  }

  /**
   * request the study progress (learning) for the given category.
   * @param cat the category from which we want the VocabularyWords as a request.
   */
  public requestStudyProgress() {
    //the method we hand over should set the VocabularyWord[] field in category service and redirect the app
    this.interactorRequester.requestProgressFromAllCategories(ProgressType.Study, (sp: Map<Category, number>) => this.respondStudyProgress(sp));
  }

  /**
   * request the quiz for a given category
   * @param cat the category from which we want the Quiz as a request
   */
  public requestQuizAndRedirect(cat: Category) {
    //the method we hand over should set the Level[] field in category service and redirect the app
    AppInjector.get(CategoryService).setCategory(cat);
    this.interactorRequester.requestQuiz(cat, (quiz: Quiz) => this.respondQuizAndRedirect(quiz));
  }

  /**
   * request the study progress (learning) for the given category.
   * @param cat the category from which we want the VocabularyWords as a request.
   */
  public requestQuizProgress() {
    //the method we hand over should set the VocabularyWord[] field in category service and redirect the app
    this.interactorRequester.requestProgressFromAllCategories(ProgressType.Quiz, (qp: Map<Category, number>) => this.respondQuizProgress(qp));
  }

  /**
   * request all Dialects
   */
  public requestAllDialects() {
    this.interactorRequester.requestAllDialects(dialects => this.respondAllDialects(dialects));
  }

  /**
   * request all configs - this is pretty ugly, but i dont wanted to write all methods again just for this usecase...
   */
  public requestAllConfig() {
    this.interactorRequester.requestAllLanguages(langs => {
      AppInjector.get(ConfigService).setTranslations(langs);
      this.interactorRequester.requestAllDialects(dialects => {
        AppInjector.get(ConfigService).setDialects(dialects);
        this.interactorRequester.requestDialect(dialect => {
          AppInjector.get(ConfigService).setCurrentDialect(dialect);
          this.interactorRequester.requestLanguage(lang => {
            AppInjector.get(ConfigService).setCurrentLanguage(lang);
            AppInjector.get(ConfigService).initConfig();
          });
        });
      });
    });
  }

  /**
   * request the current Dialect
   */
  public requestDialect() {
    this.interactorRequester.requestDialect(dialect => this.respondDialect(dialect));
  }

  /**
   * request the current Language
   */
  public requestLanguage() {
    this.interactorRequester.requestLanguage(lang => this.respondLanguage(lang));
  }

  /*
  RESPONSE METHODS

  It is not 100% clean to take them in this class, but they just handle the response and redirect the app. If they get
  more complex in the future this mehtods should get there own classes!
   */

  //take the response of the levels which contains the categories, set them to the category service und redirect the app
  private respondAllCategories(lvls: Level[]) {
    AppInjector.get(CategoryService).setLevels(lvls);
    AppInjector.get(RoutingService).getRouter().navigate(['categories']);
  }

  //take the response of the quiz, set them to the category service and redirect the app
  private respondQuizAndRedirect(quiz: Quiz) {
    AppInjector.get(CategoryService).setQuiz(quiz);
    AppInjector.get(RoutingService).getRouter().navigate(['quiz']);
  }

  //take the response of the quiz, set them to the category service and redirect the app
  private respondQuizProgress(qp: Map<Category, number>) {
    AppInjector.get(ProgressService).setQuizProgress(qp);
  }

  //take the response of the study (learning), set them in category service and redirect the app
  private respondStudyAndRedirect(vocWords: VocabularyWord[]) {
    AppInjector.get(CategoryService).setVocabulayWords(vocWords);
    AppInjector.get(RoutingService).getRouter().navigate(['learning']);
  }

  //take the response of the quiz, set them to the category service and redirect the app
  private respondStudyProgress(sp: Map<Category, number>) {
    AppInjector.get(ProgressService).setStudyProgress(sp);
  }

  //respond all dialects in the DB
  private respondAllDialects(dialects: Dialect[]) {
    AppInjector.get(ConfigService).setDialects(dialects);
  }

  //respond all languages in the DB
  private respondAllLanguages(languages: Language[]) {
    AppInjector.get(ConfigService).setTranslations(languages);
  }

  //respond the current dialect
  private respondDialect(dialect: Dialect) {
    AppInjector.get(ConfigService).setCurrentDialect(dialect);
  }

  //respond the current language
  private respondLanguage(lang: Language) {
    AppInjector.get(ConfigService).setCurrentLanguage(lang);
  }

  /*

  SETTINGS

  Set the.. settings
   */

  //set the dialect
  public setDialect(d: Dialect) {
    this.interactorRequester.setDialect(d);
    this.interactorRequester.resetInteractor(() => AppInjector.get(ConfigService).refresh());
  }

  //set the language
  public setLanguage(l: Language): void {
    this.interactorRequester.setLanguage(l);
    this.interactorRequester.resetInteractor(() => AppInjector.get(ConfigService).refresh());
  }

  //set Archivement
  public setArchivement(a: string) {
    this.interactorRequester.saveAchievement(a, true);
  }

  //get Archivement
  public getArchivement(a: string): boolean {
    return this.interactorRequester.checkAchievement(a);
  }

  //save learning Progress
  public setProgressLearning(cat: Category) {
    this.interactorRequester.saveProgress(cat, ProgressType.Study, 1);
    //this.interactorRequester.resetInteractor(()=>{ return;});
    AppInjector.get(ProgressService).updateProgress();
  }

  //save qiuz progress
  public setProgressQuiz(cat: Category, progress: number) {
    this.interactorRequester.saveProgress(cat, ProgressType.Quiz, progress);
    //this.interactorRequester.resetInteractor(()=>{ return;});
    AppInjector.get(ProgressService).updateProgress();
  }

  //reset the app
  resetInteractor():void{
    this.interactorRequester.clearUserData();
    AppInjector.get(ProgressService).resetProgress();
  }
}
