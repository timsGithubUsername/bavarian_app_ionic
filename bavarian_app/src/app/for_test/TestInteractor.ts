import {InteractorRequester, ProgressType} from "../../interactor/InteractorRequester";
import {Category} from "../../entities/Category";
import {Quiz} from "../../entities/Quiz";
import {VocabularyWord} from "../../entities/VocabularyWord";
import {CategoryHodler} from "./CategoryHodler";

export class TestInteractor implements InteractorRequester {

  requestAllCategories(response: (cats: Category[]) => void): void {
    let dataHodler = new CategoryHodler();
    response(dataHodler.getCats());
  }

  requestQuiz(cat: Category, response: (quiz: Quiz) => void): void {
    response(null);
  }

  requestStudy(cat: Category, response: (study: VocabularyWord[]) => void): void {
    response(null);
  }

  saveProgress(cat: Category, value: number) {
  }

  requestProgressFromAllCategories(type: ProgressType, response: (progress: Map<Category, number>) => void) {
  }

  requestProgressFromCategory(cat: Category, type: ProgressType, response: (progress: number) => void): void {
  }

}
