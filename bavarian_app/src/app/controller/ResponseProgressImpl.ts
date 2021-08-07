import {InteractorResponseProgress} from "../../interactor/InteractorResponse";
import {Category} from "../../entities/Category";

export class ResponseProgressImpl implements InteractorResponseProgress{
  respondProgress(progress: number);
  respondProgress(progress: Map<Category, number>);
  respondProgress(progress: number | Map<Category, number>) {
  }

}
