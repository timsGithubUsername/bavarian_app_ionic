import {Level} from "../../../entities/Level";
import {AppInjector} from "../../app.module";
import {CategoryService} from "../category.service";
import {RoutingService} from "../routing.service";

export class LevelResponse{

  respondAllLevels(lvls: Level[]){
    AppInjector.get(CategoryService).setLevels(lvls);
    AppInjector.get(RoutingService).getRouter().navigate(['categories']);
  }

}
