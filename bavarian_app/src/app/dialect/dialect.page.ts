import { Component, OnInit } from '@angular/core';
import {Dialect} from "../../entities/Dialect";
import {AppInjector} from "../app.module";
import {ControllerService} from "../services/controller/controller.service";
import {ConfigService} from "../services/config.service";
import {AlertController, ToastController} from "@ionic/angular";
import {TranslateService} from "@ngx-translate/core";
import {RoutingService} from "../services/routing.service";

@Component({
  selector: 'app-dialect',
  templateUrl: './dialect.page.html',
  styleUrls: ['./dialect.page.scss'],
})
export class DialectPage implements OnInit {

  dialects:Dialect[];

  constructor(private config:ConfigService,
              private controller:ControllerService,
              private translate: TranslateService,
              private toast: ToastController,
              private router:RoutingService) {
    this.dialects = this.config.dialects;
  }

  ngOnInit() {
  }

  async setDialect(d:Dialect){
    this.controller.setDialect(d)

    //toast
    const t = await this.toast.create({
      message: this.translate.instant("DIALECT.TOAST") + " " + d.name,
      duration: 2000
    });
    t.present();

    //this.router.getRouter().navigate(['home']);
  }

  isCurrentDialect(d:Dialect){
    return d.name === this.config.getCurrentDialect().name;
  }
}
