import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DialectPageRoutingModule } from './dialect-routing.module';

import { DialectPage } from './dialect.page';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DialectPageRoutingModule,
    TranslateModule
  ],
  declarations: [DialectPage]
})
export class DialectPageModule {}
