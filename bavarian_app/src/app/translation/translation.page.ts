import { Component, OnInit } from '@angular/core';
import {Language} from "../../entities/Language";
import {ConfigService} from "../services/config.service";
import {ControllerService} from "../services/controller/controller.service";
import {Dialect} from "../../entities/Dialect";
import {ToastController} from "@ionic/angular";
import {TranslateService} from "@ngx-translate/core";
import {RoutingService} from "../services/routing.service";

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
              private translate:TranslateService,
              private router:RoutingService) {
    this.languages = config.translations;
  }

  ngOnInit() {
  }

  async setLanguage(l:Language){
    this.controller.setLanguage(l);

    //toast
    const t = await this.toast.create({
      message: this.translate.instant("TRANSLATION.TOAST") + " " + l.name,
      duration: 2000
    });
    t.present();

    //this.router.getRouter().navigate(['home']);
  }

  isCurrentLanguage(l:Language){
    return l.name === this.config.getCurrentLanguage().name;
  }
  isDeutsch(l:Language){
    return l.name === 'Deutsch';
  }
}
