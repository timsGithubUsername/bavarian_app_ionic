import {AppInjector} from "../../app.module";
import {CategoryService} from "../category.service";
import {RoutingService} from "../routing.service";
import {Quiz} from "../../../entities/Quiz";

export class QuizResponse {

  respondQuiz(quiz: Quiz){
    AppInjector.get(CategoryService).setQuiz(quiz);
    AppInjector.get(RoutingService).getRouter().navigate(['quiz']);
  }

}
