import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AppInjector} from "./app.module";
import {ControllerService} from "./services/controller/controller.service";
import {TestInteractor} from "./_for_test/TestInteractor";
import {InteractorImpl} from "../interactor/InteractorImpl";
import {DatabaseRequesterImpl} from "../db/DatabaseRequesterImpl";
import {DialectFactoryImpl} from "../entities/factory/DialectFactoryImpl";
import {LanguageFactoryImpl} from "../entities/factory/LanguageFactoryImpl";
import {LevelFactory} from "../entities/factory/LevelFactory";
import {LevelFactoryImpl} from "../entities/factory/LevelFactoryImpl";
import {CategoryFactoryImpl} from "../entities/factory/CategoryFactoryImpl";
import {VocabularyWordFactoryImpl} from "../entities/factory/VocabularyWordFactoryImpl";
import {QuizFactoryImpl} from "../entities/factory/QuizFactoryImpl";
import {QuizWordFactoryImpl} from "../entities/factory/QuizWordFactoryImpl";
import {ExcelManagerImpl} from "../excel/ExcelManager";
import {TableFactory, TableFactoryImpl} from "../interactor/Table";
import {LocalStorageManagerImpl} from "../localStorage/LocalStorageManagerImpl";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(public translate: TranslateService) {
    this.setupLanguage();
    AppComponent.buildProgramTree();
  }

  private setupLanguage(){
    //add translate Service
    //register languages
    this.translate.addLangs(['de']);
    //set default language
    this.translate.setDefaultLang('de');

    //try to use system language
    const browserLang = this.translate.getBrowserLang();
    //matcher for example with ['de','cz','ru']: /de|cz|ru/
    this.translate.use(browserLang.match(/de/) ? browserLang : 'de');
  }

  private static buildProgramTree(){
    let interactor:InteractorImpl = new InteractorImpl();
    let databaseRequester:DatabaseRequesterImpl = new DatabaseRequesterImpl();
    let dialectFactory:DialectFactoryImpl = new DialectFactoryImpl();
    let languageFactory:LanguageFactoryImpl = new LanguageFactoryImpl();
    let levelFactory:LevelFactoryImpl = new LevelFactoryImpl();
    let categoryFactory:CategoryFactoryImpl = new CategoryFactoryImpl();
    let vocabFactory:VocabularyWordFactoryImpl = new VocabularyWordFactoryImpl();
    let quizFactory:QuizFactoryImpl = new QuizFactoryImpl();
    let quizWordFactory:QuizWordFactoryImpl = new QuizWordFactoryImpl();
    let excelManager:ExcelManagerImpl = new ExcelManagerImpl();
    let tableFactory:TableFactoryImpl = new TableFactoryImpl();
    let localStorageManager:LocalStorageManagerImpl = new LocalStorageManagerImpl();


    databaseRequester.setFactorys(
      dialectFactory,
      languageFactory,
      levelFactory,
      categoryFactory,
      vocabFactory
      );
    excelManager.setTableFactory(tableFactory);
    interactor.setLocalStorageManager(localStorageManager);
    interactor.setExcelManagerRequest(excelManager);
    interactor.setQuizFactory(quizFactory);
    interactor.setQuizWordFactory(quizWordFactory);
    interactor.setDatabaseRequester(databaseRequester);
    interactor.startInteractor(()=>{});
    AppInjector.get(ControllerService).setInteractorRequester(interactor);

    //set all configurations
    //todo kommentare wieder entkommentieren. Patrick muss nur den Bug fixen
    //AppInjector.get(ControllerService).requestAllDialects();
  }
}
