import {VocabularyWord} from "../../../entities/VocabularyWord";
import {AppInjector} from "../../app.module";
import {CategoryService} from "../category.service";
import {RoutingService} from "../routing.service";

export class StudyResponse{

  respondStudy(vocWords: VocabularyWord[]){
    AppInjector.get(CategoryService).setVocabulayWords(vocWords);
    AppInjector.get(RoutingService).getRouter().navigate(['learning']);
  }
}
