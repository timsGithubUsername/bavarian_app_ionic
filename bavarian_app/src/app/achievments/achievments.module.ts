import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AchievmentsPageRoutingModule } from './achievments-routing.module';

import { AchievmentsPage } from './achievments.page';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AchievmentsPageRoutingModule,
        TranslateModule
    ],
  declarations: [AchievmentsPage]
})
export class AchievmentsPageModule {}
