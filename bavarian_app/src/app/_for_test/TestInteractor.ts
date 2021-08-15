import {InteractorRequester, ProgressType} from "../../interactor/InteractorRequester";
import {Category} from "../../entities/Category";
import {Quiz} from "../../entities/Quiz";
import {VocabularyWord} from "../../entities/VocabularyWord";
import {Dialect} from "../../entities/Dialect";
import {Language} from "../../entities/Language";
import {Level} from "../../entities/Level";
import {LevelBuilder} from "./LevelBuilder";
import {VocabularyWordsBuilder} from "./VocabularyWordsBuilder";
import {QuizBuilder} from "./QuizBuilder";

/**
 * TestInteractor implements the InteractorRequester to prove functions of the app in system tests without the database mechanics.
 * If we build the app TestInteractor can be easily exchanged in app.component.ts, method buildProgrammTree()
 */
export class TestInteractor implements InteractorRequester {
  /*
  I dont comment here, there is not realy much to explain.

  The methods basically all do what they are called. In this package are individual classes implemented which in turn
  use the factories in the entities package to call the passed response method with "real" objects.

  What is needed is implemented, what is not needed is not implemented.
   */

  requestQuiz(cat: Category, response: (quiz: Quiz) => void): void {
    let qb = new QuizBuilder();
    response(qb.quiz);
  }

  requestStudy(cat: Category, response: (study: VocabularyWord[]) => void): void {
    let vwb = new VocabularyWordsBuilder();
    response(vwb.vocabularyWords);
  }

  saveProgress(cat: Category, value: number) {
  }

  requestAllDialects(response: (dialects: Dialect[]) => void): void {
  }

  requestAllLanguages(response: (langs: Language[]) => void): void {
  }

  requestAllLevels(response: (levels: Level[]) => void): void {
    let lb = new LevelBuilder();
    response(lb.lvls);
  }

  requestDialect(response: (dialect: Dialect) => void): void {
  }

  requestLanguage(response: (lang: Language) => void): void {
  }

  requestProgressFromAllCategories(type: ProgressType, response: (progress: Map<Category, number>) => void) {
  }

  requestProgressFromCategory(cat: Category, type: ProgressType, response: (progress: number) => void): void {
  }

  setDialect(dialect: Dialect): void {
  }

  setLanguage(language: Language): void {
  }

}
