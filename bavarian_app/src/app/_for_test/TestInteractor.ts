import {InteractorRequester, ProgressType} from "../../interactor/InteractorRequester";
import {Category} from "../../entities/Category";
import {Quiz} from "../../entities/Quiz";
import {VocabularyWord} from "../../entities/VocabularyWord";
import {Dialect} from "../../entities/Dialect";
import {Language} from "../../entities/Language";
import {Level} from "../../entities/Level";
import {LevelBuilder} from "./LevelBuilder";

export class TestInteractor implements InteractorRequester {


  requestQuiz(cat: Category, response: (quiz: Quiz) => void): void {
  }

  requestStudy(cat: Category, response: (study: VocabularyWord[]) => void): void {
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
