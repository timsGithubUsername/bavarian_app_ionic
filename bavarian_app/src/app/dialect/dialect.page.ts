import { Component, OnInit } from '@angular/core';
import {Dialect} from "../../entities/Dialect";
import {AppInjector} from "../app.module";
import {ControllerService} from "../services/controller/controller.service";
import {ConfigService} from "../services/config.service";

@Component({
  selector: 'app-dialect',
  templateUrl: './dialect.page.html',
  styleUrls: ['./dialect.page.scss'],
})
export class DialectPage implements OnInit {

  dialects:Dialect[];

  constructor(private config:ConfigService,
              private controller:ControllerService) {
    this.dialects = this.config.dialects;
  }

  ngOnInit() {
  }

  setDialect(d:Dialect):void{
    this.controller.setDialect(d);
  }
}
