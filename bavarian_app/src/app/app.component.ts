import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(public translate: TranslateService) {
    //add translate Service
    //register languages
    translate.addLangs(['de']);
    //set default language
    translate.setDefaultLang('de');

    //try to use system language
    const browserLang = translate.getBrowserLang();
    //matcher for example with ['de','cz','ru']: /de|cz|ru/
    translate.use(browserLang.match(/de/) ? browserLang : 'de');
  }
}
