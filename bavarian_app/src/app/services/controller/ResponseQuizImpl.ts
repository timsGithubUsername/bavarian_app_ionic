import {Quiz} from "../../../entities/Quiz";
import {AppInjector} from "../../app.module";
import {RoutingService} from "../routing.service";

//todo
export class ResponseQuizImpl{
  respondQuiz(quiz: Quiz): void {
    AppInjector.get(RoutingService).getRouter().navigate(['quiz']);
  }
}
