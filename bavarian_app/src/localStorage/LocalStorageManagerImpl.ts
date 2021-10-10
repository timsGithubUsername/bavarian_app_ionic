import {LocalStorageManager} from "../interactor/LocalStorageManager";
import {ProgressType} from "../interactor/InteractorRequester";
import {Category} from "../entities/Category";

export class LocalStorageManagerImpl implements LocalStorageManager{

  private strg : Storage;
  private achievementPrefix = "A";
  private languagePrefix = "L";
  private dialectPrefix = "D";
  private progressPrefix = "P";
  private studyPrefix = this.progressPrefix + "S";
  private quizPrefix = this.progressPrefix + "Q";

  constructor() {
    this.strg = localStorage;
  }

  saveLanguage(lang: string): void {
    this.strg.setItem(this.languagePrefix,lang);
  }
  loadLanguage(): string {
    return this.strg.getItem(this.languagePrefix);
  }
  saveDialect(dial: string): void {
    this.strg.setItem(this.dialectPrefix,dial);
  }
  loadDialect(): string {
    return this.strg.getItem(this.dialectPrefix);
  }
  saveAchievement(key: string): void {
    this.strg.setItem(this.achievementPrefix+key,undefined);
  }
  deleteAchievement(key: string): void {
    this.strg.removeItem(this.achievementPrefix+key);
  }
  testAchievement(key: string): boolean {
    return this.strg.getItem(this.achievementPrefix+key) != null;
  }

  private getProgressPrefix(type:ProgressType):string{
    switch (type){
      case ProgressType.Study:
        return this.studyPrefix;
      case ProgressType.Quiz:
        return this.quizPrefix;
    }
  }

  saveProgress(type: ProgressType, cat: Category, value: number): void {
    let prefix = this.getProgressPrefix(type);
    this.strg.setItem(prefix+cat.name,"" + value);
  }
  loadProgress(type: ProgressType, cat: Category): number {
    let prefix = this.getProgressPrefix(type);
    return parseFloat(this.strg.getItem(prefix+cat.name));
  }
  existProgress(type: ProgressType, cat: Category): boolean {
    let prefix = this.getProgressPrefix(type);
    return this.strg.getItem(prefix+cat.name) != null;
  }
  deleteProgress(type: ProgressType, cat: Category): void {
    let prefix = this.getProgressPrefix(type);
    this.strg.removeItem(prefix+cat.name);
  }
}
