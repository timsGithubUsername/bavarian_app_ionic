import {Category} from "../../../entities/Category";

//todo
export class ResponseProgressImpl{
  respondProgress(progress: number);
  respondProgress(progress: Map<Category, number>);
  respondProgress(progress: number | Map<Category, number>) {
  }

}
