import { Component, OnInit } from '@angular/core';
import {Language} from "../../entities/Language";
import {ConfigService} from "../services/config.service";
import {ControllerService} from "../services/controller/controller.service";
import {Dialect} from "../../entities/Dialect";

@Component({
  selector: 'app-translation',
  templateUrl: './translation.page.html',
  styleUrls: ['./translation.page.scss'],
})
export class TranslationPage implements OnInit {
  translations:Language[];

  constructor(private config:ConfigService,
              private controller:ControllerService) {
    this.translations = config.translations;
  }

  ngOnInit() {
  }

  setLanguage(l:Language):void{
    this.controller.setLanguage(l);
  }

}
