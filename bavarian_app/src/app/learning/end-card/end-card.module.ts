import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EndCardPageRoutingModule } from './end-card-routing.module';

import { EndCardPage } from './end-card.page';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        EndCardPageRoutingModule,
        TranslateModule
    ],
  declarations: [EndCardPage]
})
export class EndCardPageModule {}
