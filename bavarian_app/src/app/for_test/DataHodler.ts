import {Level, LevelValue} from "../../entities/Level";
import {Category, CategoryValue} from "../../entities/Category";

export class DataHodler {
  cats: Cat[];

  constructor() {
    this.fillData();
  }

  fillData() {
    let lvl1 = new Lvl('assets/img/img_not_found.jpg', 1);
    let lvl2 = new Lvl('assets/img/img_not_found.jpg', 2);
    let lvl3 = new Lvl('assets/img/img_not_found.jpg', 3);
    let cat1 = new Cat('assets/img/img_not_found.jpg', lvl1, "Testcategorie 1.1")
    let cat2 = new Cat('assets/img/img_not_found.jpg', lvl1, "Testcategorie 1.2")
    let cat3 = new Cat('assets/img/img_not_found.jpg', lvl1, "Testcategorie 1.3")
    let cat4 = new Cat('assets/img/img_not_found.jpg', lvl3, "Testcategorie 3.1")
    let cat5 = new Cat('assets/img/img_not_found.jpg', lvl3, "Testcategorie 3.2")
    let cat6 = new Cat('assets/img/img_not_found.jpg', lvl2, "Testcategorie 2.1")
    this.cats = [cat1, cat2, cat3, cat4, cat5, cat6];
  }

  getCats(){
    return this.cats;
  }
}

export class LV implements LevelValue {
  iconPath;
  id: number;
}

export class CV implements CategoryValue {
  iconPath: string;
  level: LevelValue;
  name: string;
}

export class Lvl implements Level {

  constructor(private imagePath: string, private id: number) {
  }

  getIconPath(): string {
    return this.imagePath;
  }

  getId(): number {
    return this.id;
  }

  getValues(): LevelValue {
    let lvl = new LV;
    lvl.id = this.getId();
    lvl.iconPath = this.getIconPath();

    return lvl;
  }
}

export class Cat implements Category {

  constructor(private imagePath: string, private level: Level, private name: string) {
  }

  getIconPath(): string {
    return this.imagePath;
  }

  getLevel(): Level {
    return this.level;
  }

  getName(): string {
    return this.name;
  }

  getValues(): CategoryValue {
    let cat = new CV;
    cat.name = this.name;
    cat.level = this.level.getValues();
    cat.iconPath = this.imagePath;

    return cat;
  }

}
