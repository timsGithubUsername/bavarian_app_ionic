import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReferencesPageRoutingModule } from './references-routing.module';

import { ReferencesPage } from './references.page';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ReferencesPageRoutingModule,
        TranslateModule
    ],
  declarations: [ReferencesPage]
})
export class ReferencesPageModule {}
