import {CategoryFactoryImpl} from "../../entities/factory/CategoryFactoryImpl";
import {Level} from "../../entities/Level";
import {CategoryMutable} from "../../entities/Category";
import {LevelFactoryImpl} from "../../entities/factory/LevelFactoryImpl";

/**
 * Use the factories in entities package to build some objects for system tests
 */
export class LevelBuilder{
  categoryFactory = new CategoryFactoryImpl();
  levelFactory = new LevelFactoryImpl();
  cat: CategoryMutable = this.categoryFactory.createCategory("Test Category!", "assets/img/img_not_found.jpg");
  lvls: Level[] = [];

  constructor() {
    this.buildLevels();
  }

  private buildLevels(){
    let cats: CategoryMutable[] = [];

    cats.push(this.cat);
    this.lvls.push(this.levelFactory.createLevel(1, "assets/img/img_not_found.jpg", cats));

    cats.push(this.cat);
    this.lvls.push(this.levelFactory.createLevel(3, "assets/img/img_not_found.jpg", cats));

    cats.push(this.cat);
    this.lvls.push(this.levelFactory.createLevel(2, "assets/img/img_not_found.jpg", cats));
  }
}
