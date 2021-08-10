import {VocabularyWord} from "../../../entities/VocabularyWord";
import {AppInjector} from "../../app.module";
import {RoutingService} from "../routing.service";

//todo
export class ResponseStudyImpl{
  respondStudy(study: VocabularyWord[]): void {
    AppInjector.get(RoutingService).getRouter().navigate(['learning']);
  }
}
