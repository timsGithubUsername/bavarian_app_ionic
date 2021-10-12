import { Component, OnInit } from '@angular/core';
import {Language} from "../../entities/Language";
import {ConfigService} from "../services/config.service";
import {ControllerService} from "../services/controller/controller.service";
import {Dialect} from "../../entities/Dialect";
import {ToastController} from "@ionic/angular";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-translation',
  templateUrl: './translation.page.html',
  styleUrls: ['./translation.page.scss'],
})
export class TranslationPage implements OnInit {
  languages:Language[];

  constructor(private config:ConfigService,
              private controller:ControllerService,
              private toast:ToastController,
              private translate:TranslateService) {
    this.languages = config.translations;
  }

  ngOnInit() {
  }

  async setLanguage(l:Language){
    this.controller.setLanguage(l);
    this.config.refresh();

    //toast
    const t = await this.toast.create({
      message: this.translate.instant("TRANSLATION.TOAST") + " " + l.name,
      duration: 2000
    });
    t.present();
  }

  isCurrentLanguage(l:Language){
    return l.name === this.config.getCurrentLanguage().name;
  }
  isDeutsch(l:Language){
    return l.name === 'Deutsch';
  }
}
