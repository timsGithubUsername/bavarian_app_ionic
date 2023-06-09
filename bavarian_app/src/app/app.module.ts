import {Injector, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {NativeAudio} from "@ionic-native/native-audio/ngx";
import {pik} from "./_for_test/TestInteractor";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/strings/', '.json');
}
export let AppInjector: Injector;

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [NativeAudio, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
/* This was copied from a tutorial once. I dont think we need it, because default lang gets set in app.component.ts.
If i forget to delete it, you find this and the app is running fine ... delete it. :)

@NgModule({
  imports: [
    BrowserModule,
    TranslateModule.forRoot({
      defaultLanguage: 'de'
    })
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
*/

export class AppModule {

  constructor(private injector: Injector) {
    //to get the Injector everywhere to use Services in Controller
    AppInjector = this.injector;
    //42
    console.log(pik);
  }

}
