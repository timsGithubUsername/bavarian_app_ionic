import {InteractorRequester} from "../../interactor/InteractorRequester";
import {Category} from "../../entities/Category";
import {Quiz} from "../../entities/Quiz";
import {VocabularyWord} from "../../entities/VocabularyWord";
import {DataHodler} from "./DataHodler";

export class TestInteractor implements InteractorRequester {
  requestAllCategories(response: (cats: Category[]) => void): void {
    let dataHodler = new DataHodler();
    response(dataHodler.getCats());
  }

  requestProgressFromAllCategories(response: (progress: Map<Category, number>) => void) {
  }

  requestProgressFromCategory(cat: Category, response: (progress: number) => void): void {
  }

  requestQuiz(cat: Category, response: (quiz: Quiz) => void): void {
  }

  requestStudy(cat: Category, response: (study: VocabularyWord[]) => void): void {
  }

  saveProgress(cat: Category, value: number) {
  }

}
