import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AppInjector} from "./app.module";
import {ControllerService} from "./services/controller/controller.service";
import {TestInteractor} from "./_for_test/TestInteractor";

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
    AppInjector.get(ControllerService).setInteractorRequester(new TestInteractor());
  }
}
